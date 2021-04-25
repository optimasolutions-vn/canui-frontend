import React from 'react';
import {Link} from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import SubscribeArticle from './SubscribeArticle';
import { useSelector } from 'react-redux';
import UrlPath from '../../libs/UrlPath';
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

export default function MiddleSection (props){

	React.useEffect(() => {
		runScript();
	}, []);

	const _isLogin = useSelector((state) => state.profile?.email);
	const { t, i18n } = useTranslation();
	const exportClassName = (_l) => {
		let _md = 12/_l;
		return `col-xl-${_md} col-lg-${_md} col-md-${_md}`;
	};
	const handleClickOnLogin = (e) => {
		e.preventDefault();
	}
	const handleClickOnMyAccount = (e) => {
		e.preventDefault();
	}
	const renderAccountCol = () => {
		//console.log(_isLogin);
		return (
			<div key={`footer-middleAccount`} className="col-xl-2 col-lg-2 col-md-3">
				<div className="footer-links">
					<h3>{t('Account')}</h3>
					<ul>
						{_isLogin && <li key="account1"><Link to={`${UrlPath.Profile}`} className="popup-with-zoom-anim log-in-button"><span>{t('My Account')}</span></Link></li>}
						{!_isLogin && <li key="account2"><a href="#sign-in-dialog" onClick={e => handleClickOnLogin(e)} className="popup-with-zoom-anim log-in-button"><span>{t('Login')}</span></a></li>}
					</ul>
				</div>
			</div>
		);
	};
	const renderMainMenu = () => {
		if(!props.data || !props.data.menuFooter || props.data.menuFooter.length === 0){
			return null ;
		}
		return props.data.menuFooter.map(x => {
			return (
				<div key={`footer-middle${x.label}`} className="col-xl-2 col-lg-2 col-md-3">
					<div className="footer-links">
						<h3>{t(x.label)}</h3>
						<ul>
							{x.child.map(y => {
								return (
									<li key={y.value}><Link to={y.value}><span>{t(y.label)}</span></Link></li>
								);
							})}
						</ul>
					</div>
				</div>
			);
		});
	};

	return (
		<div className="footer-middle-section">
			<div className="container">
				<div className="row">
					{renderMainMenu()}
					{renderAccountCol()}
					<SubscribeArticle
						data={props.data.subscribe} 
						/>
				</div>
				
			</div>
		</div>
	);
};
