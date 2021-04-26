import React from 'react';
import { connect } from 'react-redux';
import UrlPath from '../../../libs/UrlPath';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  checkIsLoginSession,
  logout
} from '../../../helpers';
import './styles.scss';
const listPage = {
	"DashBoard" : [
		{
			label: `Services`,
			value: `${UrlPath.CmsPath.CmsServices}`,
		},
		{
			label: `Members`,
			value: `${UrlPath.CmsPath.CmsMembers}`,
		},
		{
			label: `Jobs`,
			value: `${UrlPath.CmsPath.CmsJobs}`,
		},
		{
			label: `Reviews and Ratings`,
			value: `${UrlPath.CmsPath.CmsReviewsAndRatings}`,
		},
	],
	"Notifications" : [
		{
			label: `Templates`,
			value: `${UrlPath.CmsPath.CmsTemplatesNotification}`,
		},
		{
			label: `Admin Sent`,
			value: `${UrlPath.CmsPath.CmsNotificationSent}`,
		},
		{
			label: `Admin Received`,
			value: `${UrlPath.CmsPath.CmsNotificationReceived}`,
		},
		{
			label: `New Notification To User`,
			value: `${UrlPath.CmsPath.CmsNewNotificationToUser}`,
		},
	],
	"Static Pages" : [
		{
			label: `Home`,
			value: `${UrlPath.CmsPath.CmsStaticHome}`,
		},
		{
			label: `About Us`,
			value: `${UrlPath.CmsPath.CmsStaticAboutUs}`,
		},
		{
			label: `Privacy Policy`,
			value: `${UrlPath.CmsPath.CmsStaticPrivacy}`,
		},
		{
			label: `Terms of Use`,
			value: `${UrlPath.CmsPath.CmsStaticTerm}`,
		},
		{
			label: `FAQ`,
			value: `${UrlPath.CmsPath.CmsStaticFaq}`,
		},
		{
			label: `Announcenment`,
			value: `${UrlPath.CmsPath.CmsAnnouncenment}`,
		},
		{
			label: `How To Use`,
			value: `${UrlPath.CmsPath.CmsHowToUse}`,
		},
		{
			label: `Contact`,
			value: `${UrlPath.CmsPath.CmsContact}`,
		}
	],
	"Other" : [
		{
			label: `Site Settings`,
			value: `${UrlPath.CmsPath.CmsSiteSettings}`,
		},
		{
			label: `Chat Test`,
			value: `${UrlPath.CmsPath.CmsChatTest}`,
		},
		{
			label: `LogOut`,
			actions: 'logout'
		},
	]
};

function LeftSideBar (props){
	const [isAuthenticated, setIsAuthenticated] = React.useState(checkIsLoginSession());
	const { t, i18n } = useTranslation();
	const _data = useSelector((state) => state.siteData);
	const isLoginSuccess = useSelector(state => state.login.isLoginSuccess);
	const [currentPage, setCurrentPage] = React.useState(false);

	const renderClassNameActived = (pathName) => {
		return pathName && currentPage && currentPage?.indexOf(pathName) > -1 ? 'active' : '';
	};

	React.useEffect(() => {
		let history = props.history;
		setCurrentPage(history?.location?.pathname);
		const unlisten = history.listen((e) => {
			setCurrentPage(history.location?.pathname);
			let _isLogged = checkIsLoginSession();

	    	if(!_isLogged){
	    		setIsAuthenticated(false);
	    	}else{
	    		setIsAuthenticated(true);
	    	}
	    	window.scrollTo(0, 0);
	    });
		return () => {
	      	unlisten();
	    }
	}, []);

	const renderListPages = (field) => {
		return (
			<>
				{Object.keys(listPage).map((k) => {
					return(
						<ul data-submenu-title={`${k}`}>
							{listPage[k].map((x) => {
								if(x.actions){
									return(
										<li className={renderClassNameActived(x.value)}>
											<a onClick={(e) => {e.preventDefault(); logout(); }} href="#">{x.label}</a>
										</li>
									);
								}else{
									return (
										<li className={renderClassNameActived(x.value)}>
											<Link to={`${x.value}`}>{x.label}</Link>
										</li>
									);
								}
							})}
						</ul>
					)
				})}
			</>
		)
	};

	return (
		<>
		{(isLoginSuccess || isAuthenticated) && (
		<div className="dashboard-sidebar">
			<div className="dashboard-sidebar-inner" data-simplebar>
				<div className="dashboard-nav-container">
					<div className="dashboard-nav">
						<div className="dashboard-nav-inner">
							{renderListPages()}
						</div>
					</div>
				</div>
			</div>
		</div>
		)}
		</>
	);
};

export default withRouter(LeftSideBar);

