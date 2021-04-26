import React from 'react';
import { connect } from 'react-redux';
import UrlPath from '../../libs/UrlPath';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {LazyImage} from "../../components/effects/LazyImage";
import NoImageUser from "../../assets/images/no-image-user.png";
import PostDataHighestRatedFreelancer from '../../helpers/PostDataHighestRatedFreelancer';
import Slider from "react-slick";
import {Alert} from '../Scripts/ManualScript';
import otherServices from '../../services/otherServices';
import {checkAuthenticated} from '../../helpers';
import {convertNumberToHaveCommas} from '../../helpers/DataAccess';

function HighestRatedFreelancer (props){

	const { t, i18n } = useTranslation();
	const [dataCaniList, setDataCaniList] = React.useState(false);
	const renderClassStar = (y, x) => {
		x = Number(x);
		y = Number(1 + y);
		//console.log(x,y);
		return y > x ? `star star-percentage-${(10*(x - Math.floor(x))).toFixed(0)}` : 'star';
	};

	React.useEffect(() => {
		getCaniList();
	}, [])

	const getCaniList = async () => {
		let _newObj = {
			page: 0,
			size: 5,
			sort: 'id,desc',
		};
		let _res = await otherServices.getListCanIByFilter(_newObj);
		if(_res?.status && _res?.data?.content?.length > 0){
			setDataCaniList(_res.data);
		}
	}
	const renderAvatar = (x) => {
		let _av = '';
		if(x?.files?.cani_avatar?.length > 0){
			_av = x.files.cani_avatar[x.files.cani_avatar.length - 1].url;
		}else if(x?.files?.avatar?.length > 0){
			_av = x.files.avatar[x.files.avatar.length - 1].url;
		}else if(x?.files?.canu_avatar?.length > 0){
			_av = x.files.canu_avatar[x.files.canu_avatar.length - 1].url;
		}
		return _av;
	}
	const handleAlertFail = (e) => {
		e.preventDefault();
		Alert({
			title:  `${t('Please Login !!!')}`
		})
	}
	const renderCard = () => {
		if(!dataCaniList){
			return null;
		}
		if(dataCaniList.content && dataCaniList.content.length > 0){
			return dataCaniList.content.map(x => {
				x.rating = 5;
				return (
					<React.Fragment key={x.id}>
						<div className="freelancer">
							<div className="freelancer-overview">
								<div className="freelancer-overview-inner">
									{1 === 0 ? <span className="bookmark-icon"></span> : null}
									<div className="freelancer-avatar">
										{x.verified && (<div className="verified-badge"></div>)}
										{checkAuthenticated() && (
										<Link to={`${UrlPath.UserDetail}/${x.id}`}>
											<LazyImage
						                        key={x.id + Math.random()}
						                        src={renderAvatar(x) || NoImageUser}
						                        alt={x.name}
						                    />
										</Link>
										)}
										{!checkAuthenticated() && (
										<a href="#" onClick={handleAlertFail}>
											<LazyImage
						                        key={x.id + Math.random()}
						                        src={renderAvatar(x) || NoImageUser}
						                        alt={x.name}
						                    />
										</a>
										)}
									</div>
									<div className="freelancer-name">
										<h4>
										{checkAuthenticated() && (
											<Link to={`${UrlPath.UserDetail}/${x.id}`}>
												{x.name}
											</Link>
										)}
										{!checkAuthenticated() && (
											<a href="#" onClick={handleAlertFail}>
												{x.name}
											</a>
										)}
										</h4>
										<span>{x.title}</span>
									</div>
									{x.rating && (
									<div className="freelancer-rating">
										<div className="star-rating" data-rating={x.rating}>
											{x.rating && Number(x.rating) > 0 && [...Array(Math.ceil(x.rating)).keys()].map(y => {
												return (
													<span className={renderClassStar(y, x.rating)}></span>
												);
											})}
										</div>
									</div>
									)}
								</div>
							</div>


							<div className="freelancer-details homepage">
								<div className="freelancer-details-list">
									<ul>
										<li>{t('Location')} <strong><i className="icon-material-outline-location-on"></i> {x.areaService}</strong></li>
										<li>{t('Job Success')} <strong>{x?.jobSuccess?.replace(/%/, '') || 0}%</strong></li>
									</ul>
								</div>
								{checkAuthenticated() && (
								<Link to={`${UrlPath.UserDetail}/${x.id}`} className="button button-sliding-icon ripple-effect">
									{t('View Profile')} <i className="icon-material-outline-arrow-right-alt"></i>
								</Link>
								)}
								{!checkAuthenticated() && (
								<a href="#" onClick={handleAlertFail} className="button button-sliding-icon ripple-effect">
									{t('View Profile')} <i className="icon-material-outline-arrow-right-alt"></i>
								</a>
								)}
							</div>
						</div>
					</React.Fragment>
				);
			});
		}
	};

	const settingsSlider = {
		infinite: false,
		slidesToShow: 3,
		slidesToScroll: 1,
		dots: false,
		arrows: true,
		adaptiveHeight: false,
		responsive: [
		    {
		      breakpoint: 993,
		      settings: {
		        slidesToShow: 2,
		        slidesToScroll: 2,
		        dots: true,
		    	arrows: false
		      }
		    },
		    {
		      breakpoint: 769,
		      settings: {
		        slidesToShow: 1,
		        slidesToScroll: 1,
		        dots: true,
		   		arrows: false
		      }
		    }
	  ]

    };

	return (
		<div className="section gray padding-top-65 padding-bottom-70 ">
			<div className="container">
			{dataCaniList && (
				<div className="row">
					<div className="col-xl-12">
						<div className="section-headline margin-top-0 margin-bottom-25">
							<h3>{t('Highest Rated Freelancers')}</h3>
							<Link to={`${UrlPath.Search}`} className="headline-link">{t('Browse All Freelancers')}</Link>
						</div>
					</div>
					<div className="col-xl-12">
						<Slider className="freelancers-container freelancers-grid-layout" {...settingsSlider}>
						{renderCard()}
						</Slider>
					</div>
				</div>
			)}
			</div>
		</div>
	);
};

export default HighestRatedFreelancer;

