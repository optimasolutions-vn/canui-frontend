import React from 'react';
import langConst from '../../libs/lang';
import { Link } from 'react-router-dom';
import UrlPath from '../../libs/UrlPath';
import internalLibsAboutUs from '../../libs/internalLibsAboutUs';
import externalLibs from '../../libs/externalLibs';
import BreadCrumbs from '../../components/BreadCrumbs';
import PostDataAboutUs from '../../helpers/PostDataAboutUs';
import GgMap from './GgMap';

export default class AboutUs extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: {}
		};
	};

	componentDidMount(){
		//this.importScript();
	};

	componentDidUpdate(prevProps, prevState){

	};

	importScript = () => {
		setTimeout(() => {
			this.importExternalScript();
			internalLibsAboutUs.map(x => {
				let _x = document.createElement("script");
				_x.src = `${process.env.PUBLIC_URL}/${x}`;
				_x.async = false;
				document.body.appendChild(_x);
			});
			this.runJqueryCustome();
	    }, 500);
	}
	importExternalScript = () => {
		let _x = document.createElement("script");
			_x.src = `${externalLibs.ggmap}`;
			_x.async = false;
			document.body.appendChild(_x);
	};

	runJqueryCustome = () => {
		
	};

	createMarkup = (_content) => {
		return {__html: _content};
	}

	styles01 = () => {
		return {
			backgroundImage: `url(/images/single-company.jpg)`,
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
								<h3 className="margin-bottom-25">About Company</h3>
								<div className='single-page-content-aboutus' dangerouslySetInnerHTML={this.createMarkup(PostDataAboutUs.aboutus.content)} />
							</div>
						</div>
						<div className="col-xl-4 col-lg-4">
							<div className="sidebar-container">
								<div className="sidebar-widget">
									<h3>{PostDataAboutUs.aboutus.map.title}</h3>
									<div id="single-job-map-container">
										<GgMap lat={PostDataAboutUs.aboutus.map.lat} lng={PostDataAboutUs.aboutus.map.lng} />
									</div>
								</div>
								{PostDataAboutUs.aboutus.socialsProfile && PostDataAboutUs.aboutus.socialsProfile.length > 0 && (
									<div className="sidebar-widget">
										<h3>Social Profiles</h3>
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