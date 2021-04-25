import React from 'react';
import langConst from '../../libs/lang';
import { Link } from 'react-router-dom';
import UrlPath from '../../libs/UrlPath';
import internalLibsAboutUs from '../../libs/internalLibsAboutUs';
import externalLibs from '../../libs/externalLibs';
import BreadCrumbs from '../../components/BreadCrumbs';
import PostDataAboutUs from '../../helpers/PostDataAboutUs';
import otherServices from '../../services/otherServices';
import { EditorState, convertToRaw, convertFromRaw, convertFromRawToDraftState} from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import Validation from '../../helpers/Validation';
import i18n from 'i18next';
import {Alert} from '../Scripts/ManualScript';
export default class Support extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			banner_url: `/images/single-company.jpg`,
			data: {},
			isLoading: false,
		};
		this.RefForm = React.createRef(null);
		this.loading = false;
	};
	componentDidMount(){

	};
	componentDidUpdate(prevProps, prevState){

	};
	styles01 = () => {
		return {
			backgroundImage: `url("${this.state.banner_url}")`,
			backgroundPosition: 'center center',
			backgroundSize: `cover`,
			backgroundRepeat: `no-repeat`,
		};
	};
	handleChangeField = (e) => {
		e.preventDefault();
		let _type = e.target.name;
		let _val = e.target.value;
		this.setState({
			errors: [],
			data: {
				...this.state.data,
				[`${_type}`] : _val,
			}
		})
	}
	validationField = () => {
		let _er = [];
		let _state = this.state.data;
		if(!_state.name || !Validation.test(_state.name, 'required')){
			_er.push('Name is required!');
		}
		if(!_state.content || !Validation.test(_state.content, 'required')){
			_er.push('Content is required!');
		}
		if(!_state.phone || !Validation.test(_state.phone, 'number')){
			_er.push('Phone is invalide!');
		}
		if(!_state.email || !Validation.test(_state.email, 'email')){
			_er.push('Email is invalide!');
		}
		if(!_state.title || !Validation.test(_state.title, 'required')){
			_er.push('Title is invalide!');
		}
		this.setState({
			errors: _er
		})
		return _er.length === 0 ? true : false;
	}
	handleSubmit = async (e) => {
		if(this.isLoading){
			return;
		}
		this.isLoading = true;
		let {t} = this.props;
		e.preventDefault();
		if(!!this.validationField()){
			let _obj = {
				name: this.state.data.name,
				phone: this.state.data.phone,
				title: this.state.data.title,
				email: this.state.data.email,
				content: this.state.data.content,
			};
			let _res = await otherServices.sendFormContact(_obj);
			if(_res.status){
				this.setState({
					data:{}
				})
				Alert({
					title: `${t('Your request is sent!')}`,
					status: 'success',
					time: 5000,
				})
			}else{
				Alert({
					title: `${t('Something wrong, please try again !!')}`,
					time: 4000
				})
			}
			
		}else{
			Alert({
				title: `${t('Something wrong, please try again !!')}`,
				time: 4000
			})
		}
		this.isLoading = false;
	}

	render(){
		let {t} = this.props;
		return(
			<React.Fragment>
				<div className="single-page-header">
					<div className="container">
						<div className="row">
							<div className="col-md-12">
								<div className="single-page-header-inner">
									<div className="left-side">
										
										<div className="header-details">
											<h3>{t('Support')}</h3>
											
										</div>
									</div>
									<div className="right-side">
									<BreadCrumbs 
										dataList={[
											{label: t('Support')}
										]}
										/>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="background-image-container" style={this.styles01()}></div>
				</div>

				<div className="container">
					<div className="row">
						<div className="col-xl-8 col-lg-8 offset-xl-2 offset-lg-2">
							<section id="contact" className="margin-bottom-60">
								<h3 className="headline margin-top-15 margin-bottom-35">{t("Any questions? Feel free to contact us!")}</h3>

								<form method="post" name="contactform" id="contactform" autocomplete="on" ref={this.RefForm}>
									
									<div className="input-with-icon-left">
										<input className="with-border" name="name" type="text" value={this.state?.data?.name || ''} onChange={this.handleChangeField} id="name" placeholder={t("Your Name")} required="required" />
										<i className="icon-material-outline-account-circle"></i>
									</div>
									<div className="input-with-icon-left">
										<input className="with-border" name="phone" type="tel" value={this.state?.data?.phone || ''} onChange={this.handleChangeField} id="tel" placeholder={t("Phone Number")} attern="^[0-9]$" required="required" />
										<i className="icon-feather-smartphone"></i>
									</div>
									<div className="input-with-icon-left">
										<input className="with-border" name="email" type="email" value={this.state?.data?.email || ''} onChange={this.handleChangeField} id="email" placeholder={t("Email Address")} pattern="^[A-Za-z0-9](([_\.\-]?[a-zA-Z0-9]+)*)@([A-Za-z0-9]+)(([\.\-]?[a-zA-Z0-9]+)*)\.([A-Za-z]{2,})$" required="required" />
										<i className="icon-material-outline-email"></i>
									</div>
									<div className="input-with-icon-left">
										<input className="with-border" name="title" type="text" value={this.state?.data?.title || ''} onChange={this.handleChangeField} id="title" placeholder={t("Title")} required="required" />
										<i className="icon-material-outline-assignment"></i>
									</div>

									<div>
										<textarea className="with-border" name="content" cols="40" rows="5" value={this.state?.data?.content || ''} onChange={this.handleChangeField} id="comments" placeholder={t("Message")} spellcheck="true" required="required"></textarea>
									</div>
									{this.state?.errors?.length > 0 && (
									<div className='notification error '>
										{this.state.errors.map((x, index) => {
											return(
												<p key={index}>{t(`${x}`)}</p>
											);
										})}
									</div>
									)}
									<div className="text-right">
										<input type="submit" onClick={this.handleSubmit} className="submit button margin-top-15" id="submit" value={t("Submit Message")} />
									</div>
								</form>
							</section>

						</div>
					</div>
				</div>
			</React.Fragment>
		);
	}
};