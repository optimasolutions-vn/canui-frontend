import React from 'react';
import UrlPath from '../../libs/UrlPath';
import {useHistory} from 'react-router';
import { Link } from 'react-router-dom';
import PostDataFooter from '../../helpers/PostDataFooter';

import TopSection from './TopSection';
import MiddleSection from './MiddleSection';
import BottomSection from './BottomSection';
import SubscribeArticle from './SubscribeArticle';

import { useSelector } from 'react-redux';
function runScript(){
	window.$('.popup-with-zoom-anim').magnificPopup({
		type: 'inline',
		fixedContentPos: true,
		fixedBgPos: true,
		overflowY: 'auto',
		closeBtnInside: true,
		preloader: false,
		midClick: true,
		removalDelay: 300,
		mainClass: 'my-mfp-zoom-in'
	});
}
export default function Footer (props){
	React.useEffect(() => {
		runScript();
	}, []);
	const history = useHistory();
	const _isLogin = useSelector((state) => state.user?.email);
	const _isLoginCms = useSelector((state) => state.login);
	
	const renderContent = () => {

		return (
			<div id="footer">
				<div className='hide-on-mobile'>
					<TopSection
						data={PostDataFooter}
						{...props}
						/>
					<MiddleSection
						data={PostDataFooter}
						{...props}
						/>
					<BottomSection
						data={PostDataFooter}
						/>
				</div>
				<div className='hide-on-desktop'>
					<div className="footer-mobile-fixed">
						<ul className="list01">
							<li><Link to={`${UrlPath.AboutUs}`}><span className="mini-text">Giới thiệu dịch vụ</span></Link></li>
							<li><Link to={`${UrlPath.Faq}`}><span>FAQ</span></Link></li>
							<li><Link to={`${UrlPath.Support}`}><span className="mini-text">Trung tâm dịch vụ khách hàng</span></Link></li>
						</ul>
						<ul className="list02">
							<li>
								<Link to={`${UrlPath.Home}`}>
									<i className="icon-material-outline-home"></i>
									<span>Home</span>
								</Link>
							</li>
							<li>
								<Link to={`${UrlPath.Services}`}>
									<i className="icon-material-outline-dashboard"></i>
									<span>Categories</span>
								</Link>
							</li>
							<li>
								<Link to={`${UrlPath.Home}`}>
									<i className="icon-feather-mail"></i>
									<span>Messages</span>
								</Link>
							</li>
							{_isLogin && (
								<li>
									<Link to={`${UrlPath.Profile}`}>
										<i className="icon-material-outline-person-pin"></i>
										<span>My Page</span>
									</Link>
								</li>
							)}
							{!_isLogin && (
								<li>
									<a href="#sign-in-dialog" className="popup-with-zoom-anim log-in-button">
										<i className="icon-material-outline-person-pin"></i>
										<span>My Page</span>
									</a>
								</li>
							)}
						</ul>
					</div>
				</div>
			</div>
		);
	};

	const renderCmsFooter = () => {
		console.log(props);
		console.log(_isLoginCms);
		return (
			<div>footer</div>
		);
	};

	return(
		<>
		
		</>
	);
};
