import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import PostDataHeader from '../../helpers/PostDataHeader';
import MainNavigation from './MainNavigation';
import {
	checkAuthenticated
} from '../../helpers';
import { useTranslation } from "react-i18next";
import RightSide from './RightSide';
import RightSideNoLogin from './RightSideNoLogin';
import { withRouter } from 'react-router-dom';
import UrlPath from '../../libs/UrlPath';
import { slide as Menu } from 'react-burger-menu';
const $ = window.$;
function runScript(){
	/*--------------------------------------------------*/
	/*  Transparent Header Spacer Adjustment
	/*--------------------------------------------------*/
	$(window).on('load resize', function() {
		var transparentHeaderHeight = $('.transparent-header').outerHeight();
		$('.transparent-header-spacer').css({
			height: transparentHeaderHeight,
		});
	});


	/*----------------------------------------------------*/
	/*  Back to Top
	/*----------------------------------------------------*/

	// Button
	function backToTop() {
		$('body').append('<div id="backtotop"><a href="#"></a></div>');
	}
	backToTop();

	// Showing Button
	var pxShow = 600; // height on which the button will show
	var scrollSpeed = 500; // how slow / fast you want the button to scroll to top.

	$(window).scroll(function(){
	 if($(window).scrollTop() >= pxShow){
		$("#backtotop").addClass('visible');
	 } else {
		$("#backtotop").removeClass('visible');
	 }
	});

	$('#backtotop a').on('click', function(){
	 $('html, body').animate({scrollTop:0}, scrollSpeed);
	 return false;
	});



}
function Header(props){
	const [isAuthenticated, setIsAuthenticated] = useState(checkAuthenticated());
	const [currentPage, setCurrentPage] = React.useState(false);
	const [openMMenu, setOpenMMenu] = React.useState(false);


	React.useEffect(() => {
		runScript();
		let history = props.history;
		setCurrentPage(history.location.pathname);
		const unlisten = history.listen((e) => {
	    	setCurrentPage(history.location.pathname);
	    	if(!checkAuthenticated()){
	    		setIsAuthenticated(false);
	    	}
	    	window.scrollTo(0, 0);
	    });
		return () => {
	      	unlisten();
	    }
	}, []);
	
  	const { t } = useTranslation();
	
	const rewriteClassName = (_x) => {
		return _x === currentPage ? 'current' : '';
	};
	const renderMainMenu = () => {
		if(!PostDataHeader || !PostDataHeader.menuHeader){
			return null ;
		}
		return PostDataHeader.menuHeader.map(x => {
			return (
				<li onClick={hanldeCloseMMenu} key={x.value + Math.random()}><Link to={x.value} className={rewriteClassName(x.value)} ><span>{t(x.label)}</span></Link></li>
			);
		});
	};
	const hanldeCloseMMenu = (e) => {
		setOpenMMenu(false);
	};
	const handleOpenMMenu = (e) => {
		e.preventDefault();
		console.log('test open');
		setOpenMMenu(true);
	};
	
	const renderRightSide = () => {
		if (isAuthenticated) {
			return <RightSide history={props.history} setIsAuthenticated={setIsAuthenticated} t={t} config={props.config} />
		} else {
			return <RightSideNoLogin history={props.history} setIsAuthenticated={setIsAuthenticated} t={t} config={props.config} />
		}
	};
	const renderContent = () => {
		return(
			<div id="main-header">
				<div id="menu-mobile" className="hide-on-desktop">
					<Menu isOpen={openMMenu} onClose={hanldeCloseMMenu}>
						<ul id="responsive-mobile">
							<li className="title">{t('Menu')}</li>
							{renderMainMenu()}
						</ul>
					</Menu>
				</div>

				<header id="header-container" className="fullwidth">
					<div id="header">
						<div className="container">
							<div className="left-side">
								<div id="logo">
									<Link to={'/home'}><img src="/images/logo-canui.png" alt="" /></Link>
								</div>
								<nav id="navigation">
									<ul id="responsive">
										{renderMainMenu()}
									</ul>
								</nav>
								<div className="clearfix"></div>
							</div>
							<div className="right-side">
							{ renderRightSide() }
							<span className="mmenu-trigger" onClick={handleOpenMMenu}>
								<button className="hamburger hamburger--collapse" type="button">
									<span className="hamburger-box">
										<span className="hamburger-inner"/>
									</span>
								</button>
							</span>
							</div>
						</div>
					</div>
				</header>
				<div className="clearfix"></div>
			</div>
		);
	};
	const renderCmsHeader = () => {
		console.log(props);
		return (
			<div>header</div>
		)
	};
	return (
		<>
			
		</>
	)
};
export default withRouter(Header);

