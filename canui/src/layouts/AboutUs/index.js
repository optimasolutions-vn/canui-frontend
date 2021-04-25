import React from 'react';
import langConst from '../../libs/lang';
import { Link } from 'react-router-dom';
import UrlPath from '../../libs/UrlPath';
import internalLibsAboutUs from '../../libs/internalLibsAboutUs';
import externalLibs from '../../libs/externalLibs';
import BreadCrumbs from '../../components/BreadCrumbs';
import PostDataAboutUs from '../../helpers/PostDataAboutUs';
import { getOptionPageAboutUs } from '../../services/optionsPagesServices';
import { EditorState, convertToRaw, convertFromRaw, convertFromRawToDraftState} from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import i18n from 'i18next';
function createMarkup(content){
	return{__html: content};
}
export default class AboutUs extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			banner_url: `/images/single-company.jpg`,
			data: {},
			isLoading: true,
		};
	};

	componentDidMount(){
		this.getContentPage();
	};

	componentDidUpdate(prevProps, prevState){

	};

	getContentPage = async () => {
		let _res = await getOptionPageAboutUs();
		if(_res?.data?.length > 0){
			this.setState({
				data: _res.data[0].value,
				banner_url: _res.data[0]?.value?.banner_url,
				location_iframe: _res.data[0]?.value?.location_iframe,
				isLoading: false,
			})
		}
	}

	createMarkup = (_content) => {
		return {__html: _content};
	}

	renderContentHTML = () => {
		if(i18n?.language && this.state.data[`${i18n?.language}`]){
			return draftToHtml(this.state.data[`${i18n?.language}`]?.content);
		}
		return null;
	}

	renderAboutText = () => {
		if(i18n?.language && this.state.data[`${i18n?.language}`]){
			return this.state.data[`${i18n?.language}`]?.about_company_title;
		}
		return null;
	}
	renderLocationText = () => {
		if(i18n?.language && this.state.data[`${i18n?.language}`]){
			return this.state.data[`${i18n?.language}`]?.location_title;
		}
		return null;
	}
	renderSocialText = () => {
		if(i18n?.language && this.state.data[`${i18n?.language}`]){
			return this.state.data[`${i18n?.language}`]?.social_profiles_title;
		}
		return null;
	}

	styles01 = () => {
		return {
			backgroundImage: `url("${this.state.banner_url}")`,
			backgroundPosition: 'center center',
			backgroundSize: `cover`,
			backgroundRepeat: `no-repeat`,
		};
	};

	render(){
		return(
			<React.Fragment>
				<div className="single-page-header">
					<div className="container">
						<div className="row">
							<div className="col-md-12">
								<div className="single-page-header-inner">
									<div className="left-side">
										
										<div className="header-details">
											<h3>{PostDataAboutUs.aboutus.nameCompany} {PostDataAboutUs.aboutus.description && (
												<span>{PostDataAboutUs.aboutus.description}</span>
											)}</h3>
											
										</div>
									</div>
									<div className="right-side">
									<BreadCrumbs 
										dataList={[
											{label: PostDataAboutUs.aboutus.pageName}
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
						<div className="col-xl-8 col-lg-8 content-right-offset">
							<div className="single-page-section">
								<h3 className="margin-bottom-25">{this.renderAboutText()}</h3>
								<div className='single-page-content-aboutus' dangerouslySetInnerHTML={this.createMarkup(this.renderContentHTML())} />
							</div>
						</div>
						<div className="col-xl-4 col-lg-4">
							<div className="sidebar-container">
								<div className="sidebar-widget">
									<h3>{this.renderLocationText()}</h3>
									{this.state.location_iframe && <div id="single-job-map-container" dangerouslySetInnerHTML={createMarkup(this.state.location_iframe)} />}
								</div>
								{PostDataAboutUs.aboutus.socialsProfile && PostDataAboutUs.aboutus.socialsProfile.length > 0 && (
									<div className="sidebar-widget">
										<h3>{this.renderSocialText()}</h3>
										<div className="freelancer-socials margin-top-25">
											<ul>
											{PostDataAboutUs.aboutus.socialsProfile.map(x => {
													return (
														<li key={x.name}>
															<a href={x.urlPage} title={x.name} data-tippy-placement="top" target='_blank'>
															{x.iconClass && (
																<i className={x.iconClass}></i>
															)}
															{x.iconImage && (
																<img src={x.iconImage} alt={x.name} />
															)}
															</a>
														</li>
													)
												})}
											</ul>
										</div>
									</div>
								)}
								
								{PostDataAboutUs.aboutus.socialsShare && PostDataAboutUs.aboutus.socialsShare.length > 0 && (
									<div className="sidebar-widget">
										<div className="share-buttons margin-top-25">
											<div className="share-buttons-trigger"><i className="icon-feather-share-2"></i></div>
											<div className="share-buttons-content">
												<span>Interesting? <strong>Share It!</strong></span>
												<ul className="share-buttons-icons">
												{PostDataAboutUs.aboutus.socialsShare.map(x => {
													return(
														<li>
															<Link to={x.urlShare} data-button-color={`#3b5998`} title={`Share on ${x.name}`} data-tippy-placement={`top`}>
																<i className={x.iconClass}></i>
															</Link>
														</li>
													);
												})}
												</ul>
											</div>
										</div>
									</div>
								)}
								

							</div>
						</div>

					</div>
				</div>
			</React.Fragment>
		);
	}
};