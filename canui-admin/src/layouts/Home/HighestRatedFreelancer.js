import React from 'react';
import { connect } from 'react-redux';
import UrlPath from '../../libs/UrlPath';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {LazyImage} from "../../components/effects/LazyImage";
import NoImage from "../../assets/images/no-image-job.png";
import PostDataHighestRatedFreelancer from '../../helpers/PostDataHighestRatedFreelancer';
import Slider from "react-slick";

function HighestRatedFreelancer (props){

	const { t, i18n } = useTranslation();
	const renderClassStar = (y, x) => {
		x = Number(x);
		y = Number(1 + y);
		//console.log(x,y);
		return y > x ? `star star-percentage-${(10*(x - Math.floor(x))).toFixed(0)}` : 'star';
	};
	const renderCard = () => {
		if(PostDataHighestRatedFreelancer.heighestRated && PostDataHighestRatedFreelancer.heighestRated.length > 0){
			return PostDataHighestRatedFreelancer.heighestRated.map(x => {
				return (
					<React.Fragment key={x.id}>
						<div className="freelancer">
							<div className="freelancer-overview">
								<div className="freelancer-overview-inner">
									<span className="bookmark-icon"></span>
									<div className="freelancer-avatar">
										{x.verified && (<div className="verified-badge"></div>)}
										<Link to={`${UrlPath.Person}/${x.slug}`}>
											<LazyImage
						                        key={x.id + Math.random()}
						                        src={x.avatar || NoImage}
						                        alt={x.name}
						                    />
										</Link>
									</div>
									<div className="freelancer-name">
										<h4>
											<Link to={`${UrlPath.Person}/${x.slug}`}>
												{x.name}
											</Link>
										</h4>
										<span>{x.skill}</span>
									</div>
									<div className="freelancer-rating">
										<div className="star-rating" data-rating={x.rated}>
											{x.rated && Number(x.rated) > 0 && [...Array(Math.ceil(x.rated)).keys()].map(y => {
												return (
													<span className={renderClassStar(y, x.rated)}></span>
												);
											})}
										</div>
									</div>
								</div>
							</div>
							
							
							<div className="freelancer-details">
								<div className="freelancer-details-list">
									<ul>
										<li>Location <strong><i className="icon-material-outline-location-on"></i> {x.location}</strong></li>
										<li>Rate <strong>{x.price}</strong></li>
										<li>{t('Job Success')} <strong>{x.job_success}</strong></li>
									</ul>
								</div>
								<Link to={`${UrlPath.Person}/${x.slug}`} className="button button-sliding-icon ripple-effect">
									{t('View Profile')} <i className="icon-material-outline-arrow-right-alt"></i>
								</Link>
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
				<div className="row">
					<div className="col-xl-12">
						<div className="section-headline margin-top-0 margin-bottom-25">
							<h3>{t('Highest Rated Freelancers')}</h3>
							<Link to={`${UrlPath.Person}`} className="headline-link">{t('Browse All Freelancers')}</Link>
						</div>
					</div>
					<div className="col-xl-12">
						<Slider className="freelancers-container freelancers-grid-layout" {...settingsSlider}>
						{renderCard()}
						</Slider>
					</div>
				</div>
			</div>
		</div>
	);
};

export default HighestRatedFreelancer;

