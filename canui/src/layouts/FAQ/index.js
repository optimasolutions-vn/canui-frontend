import React from 'react';
import langConst from '../../libs/lang';
import { Link } from 'react-router-dom';
import UrlPath from '../../libs/UrlPath';
import BreadCrumbs from '../../components/BreadCrumbs';
import PostDataAboutUs from '../../helpers/PostDataAboutUs';
import { getOptionPageFaq } from '../../services/optionsPagesServices';
import {Accordion} from '../Scripts/ManualScript';
import i18n from 'i18next';
export default class Faq extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: {}
		};
	};
	componentDidMount(){
		
		this.getContentPage();
	};
	componentDidUpdate(prevProps, prevState){
		Accordion();
	};
	getContentPage = async () => {
		let _res = await getOptionPageFaq();
		console.log(_res);
		if(_res?.data?.length > 0){
			console.log(_res)
			this.setState({
				data: _res.data[0].value,
				banner_url: _res.data[0]?.value?.banner_url,
				isLoading: false,
			}, () => {
				console.log(this.state.banner_url);
			})
		}
	}

	renderFaqText = () => {
		if(i18n?.language && this.state.data[`${i18n?.language}`]){
			return this.state.data[`${i18n?.language}`]?.about_company_title;
		}
		return null;
	}

	renderContent = () => {
		let _c = this.state?.data[`${i18n?.language}`] || [];
		console.log(_c);
		return(
			<>
			<div className="accordion js-accordion">
			{_c?.length > 0 && _c.map(x => {
				return(
					<>
					<div className="accordion__item js-accordion-item">
						<div className="accordion-header js-accordion-header">{x?.quest}</div> 
						<div className="accordion-body js-accordion-body">
							<div className="accordion-body__contents">
								{x?.asw}
							</div>
						</div>
					</div>
					</>
				);
			})}
			</div>
			</>
		);
		return null;
	}

	styles02 = () => {
		return {
			backgroundImage: `url("${this.state.banner_url}")`,
			backgroundPosition: 'center center',
			backgroundSize: `cover`,
			backgroundRepeat: `no-repeat`,
		};
	};
	render(){
		let { t } = this.props;
		return(
			<React.Fragment>
				<div className="single-page-header">
					<div className="container">
						<div className="row">
							<div className="col-md-12">
								<div className="single-page-header-inner">
									<div className="left-side">
										<div className="header-details">
											<h3>{t('FAQ')}</h3>
										</div>
									</div>
									<div className="right-side">
									<BreadCrumbs 
										dataList={[
											{label: t('Faq')}
										]}
										/>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="background-image-container" style={this.state?.banner_url && this.styles02()}></div>
				</div>

				<div className="container">
					<div className="row">
						<div className="col-12 content-right-offset">
							<div className="single-page-section">
								<div className='single-page-content-aboutus'>
								{this.state.data && this.renderContent()}
								</div>
							</div>
						</div>
					</div>
				</div>
			</React.Fragment>
		)
	}
};