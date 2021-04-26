import React from 'react';
import langConst from '../../../libs/lang';
import Loader from '../../../components/effects/Loader';
import OtherServices from '../../../services/OtherServices';
import {Link} from 'react-router-dom';
import UrlPath from '../../../libs/UrlPath';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import '../CmsStaticPrivacy/style.scss';
import {ScriptTabs} from '../Scripts/ScriptTabs';
import { Alert} from '../Scripts/Popup';
import {Languages, MaxSizeUpload} from '../../../helpers/DataAccess';
import { EditorState, convertToRaw, convertFromRaw, convertFromRawToDraftState} from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import {convertDateTimeToLocaleString} from '../../../helpers/convert';
const maxSize = MaxSizeUpload;
const _list = Languages;
const _titlePage = 'Contact Detail';
function createMarkup(content){
	return{__html: content};
}
class CmsContactDetail extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.myRef = React.createRef();
	};
	componentDidMount(){
		ScriptTabs();
		this.setupParams();
	};
	componentDidUpdate(prevProps, prevState){
		ScriptTabs();
	};
	onContentStateChange = (contentState) => {
		let _val = contentState;
		this.setState({
			content : _val
		});
	};
	
	setupParams = () => {
		console.log(this.props);
		if(this.props?.match?.params?.id){
			this.setState({
				id: this.props?.match?.params?.id
			}, () => {
				this.getOption();
			});
			
		}
	};
	calcState = (value) => {
		let _val;
		try{
			_val = JSON.parse(value);
		}catch(err){
			_val = value;
		}
		return value ? EditorState.createWithContent(convertFromRaw(_val)) : EditorState.createEmpty();
	};
	getOption = async () => {
		let _res = await OtherServices.getDetailContact(this.state.id);
		if(_res?.status && _res?.data){
			this.setState({
				data: _res.data
			});
		}else{
			Alert({
				title: _res?.message || 'Fail on load data !!!',
				time: 4000
			})
		}
		
	};

	prepareDataBeforeCallApi = () => {
		if(!this.state.description || !this.state.content){
			return false;
		}
		return {
			id: this.state?.id,
			title: this.state?.title || '',
			content: this.state?.content ? JSON.stringify(convertToRaw(this.state?.content.getCurrentContent())) : '',
			description: this.state?.description || '',
			locale: this.state?.locale,
		};
	};

	callAPiUpdate = async () => {
		if(this.isLoading){
			return false;
		}
		this.isLoading = true;
		
		let _data = this.prepareDataBeforeCallApi() || false;
		this.isLoading = false;
		if(_data){
			let _res = await OtherServices.UpdateContact(_data);
			if(_res.status){
				Alert({
					title: 'Post is updated',
					status: 'success',
					time: 3000,
				})
			}
		}else{
			Alert({
				title: 'Please input content', 
				time: 3000
			});
			this.isLoading = false;
		}
	};

	onChangeTitle = (e) => {
		e.preventDefault();
		let _val = e.target.value;
		this.setState({
			title: _val
		});
	}

	onChangeDes = (e) => {
		e.preventDefault();
		let _val = e.target.value;
		this.setState({
			description: _val
		});
	}

	handleSubmitForm = (e) => {
		e.preventDefault();
		this.callAPiUpdate();
	}
	
	renderError = () => {
		return this.state.errorMes.map(x => {
			return(
				<p>{x}</p>
			)
		});
	}
	renderContentTabs = () => {
		const { t } = this.props;
		let _i = 0;
		let _state = this.state;
		return( 
			<div className="row member-table">
				<div className="col-12">
					<table>
						<tbody>
							<tr>
								<th>
									<div>Id</div>
								</th>
								<td>
									<div className="submit-field">
										<div>{_state?.data?.id}</div>
									</div>
								</td>
							</tr>
							<tr>
								<th>
									<div>Status</div>
								</th>
								<td>
									<div className="submit-field">
										<div>
											{_state?.data?.status}
											<select title="Status" className="selectpicker status-name default" data-selected-text-format="count" data-size="7" onChange={this.handleChangeStatus}>
												{this.renderCityByNation()}
											</select>
										</div>
									</div>
								</td>
							</tr>
							<tr>
								<th>
									<div>Created At</div>
								</th>
								<td>
									<div className="submit-field">
										<div>{convertDateTimeToLocaleString(_state?.data?.createdAt)}</div>
									</div>
								</td>
							</tr>
							<tr>
								<th>
									<div>Name</div>
								</th>
								<td>
									<div className="submit-field">
										<div>{_state?.data?.name}</div>
									</div>
								</td>
							</tr>
							<tr>
								<th>
									<div>Phone</div>
								</th>
								<td>
									<div className="submit-field">
										<div>{_state?.data?.phone}</div>
									</div>
								</td>
							</tr>
							<tr>
								<th>
									<div>Email</div>
								</th>
								<td>
									<div className="submit-field">
										<div>{_state?.data?.email}</div>
									</div>
								</td>
							</tr>
							<tr>
								<th>
									<div>Title</div>
								</th>
								<td>
									<div className="submit-field">
										<div>{_state?.data?.title}</div>
									</div>
								</td>
							</tr>
							<tr>
								<th>
									<div>Content</div>
								</th>
								<td>
									<div className="submit-field">
										<div>{_state?.data?.content}</div>
									</div>
								</td>
							</tr>

						</tbody>
					</table>
				</div>
			</div>
		)
	}

	render(){
		const { t } = this.props;
		return(
			<React.Fragment>
				{this.isLoading && <Loader />}
				<div className='service-detail-admin'>
					<div className="row">
						<div className="col-12">
							<div className='title-page-header'>
								<h3>{_titlePage}</h3>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-12">
							<form ref={this.myRef} method="post" id="service-detail-form" onSubmit={this.handleSubmitForm}>
								{this.state.data?.id && this.renderContentTabs()}
							</form>
						</div>
						{this.state.errorMes?.length > 0 && (
							<div className="col-12">
								<div className="notification error">{this.renderError()}</div>
							</div>
						)}
						{this.state.UpdateSuccess && (
							<div className="col-12">
								<div className="notification success">{t('Update Success')}</div>
							</div>
						)}
						<div className="col-3">
							{this.state.isLoading && <button disabled className="button full-width button-sliding-icon ripple-effect margin-top-10" type="submit">{t('Updating')}<i className="icon-material-outline-arrow-right-alt"></i></button>}
							{!this.state.isLoading &&
								<button className="button full-width button-sliding-icon ripple-effect margin-top-10" type="submit" onClick={this.handleSubmitForm}>{t('Update')}<i className="icon-material-outline-arrow-right-alt"></i></button>
							}
						</div>
					</div>
				</div>
			</React.Fragment>
		);
	}
};
export default CmsContactDetail;
