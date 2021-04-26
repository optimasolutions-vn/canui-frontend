import React from 'react';
import { connect } from 'react-redux';
import UrlPath from '../../libs/UrlPath';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {LazyImage} from "../../components/effects/LazyImage";
import NoImage from "../../assets/images/no-image-job.png";
import {compareTime} from '../../helpers/convert';

function PersonLine (props){
	React.useEffect(() => {
		//console.log(props);
	}, []);
	const { t, i18n } = useTranslation();
	const renderClassStar = (y, x) => {
		x = Number(x);
		y = Number(1 + y);
		//console.log(x,y);
		return y > x ? `star star-percentage-${(10*(x - Math.floor(x))).toFixed(0)}` : 'star';
	};
	return (
		<div key={props.dataOption.id + Math.random()} className="freelancer">
			<div className="freelancer-overview">
				<div className="freelancer-overview-inner">
					<span className="bookmark-icon"></span>
					<div className="freelancer-avatar">
						{props.dataOption.verified && (
							<div className="verified-badge"></div>
						)}
						<Link to={`${UrlPath.Person}/${props.dataOption.slug}`}>
							<LazyImage
		                        key={props.dataOption.id + Math.random()}
		                        src={props.dataOption.avatar || NoImage}
		                        alt={props.dataOption.name}
		                    />
						</Link>
					</div>
					<div className="freelancer-name hide-on-mobile">
						<h4>
							<Link to={`${UrlPath.Person}/${props.dataOption.slug}`}>
								{props.dataOption.name} 
							</Link>
						</h4>
						<div className="freelancer-rating">
							<div className="star-rating" data-rating={props.dataOption.rated}>
							{props.dataOption.rated && Number(props.dataOption.rated) > 0 && [...Array(Math.ceil(props.dataOption.rated)).keys()].map(y => {
								return (
									<span className={renderClassStar(y, props.dataOption.rated)}></span>
								);
							})}
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="freelancer-details">
				<div className="freelancer-name hide-on-desktop">
					<Link to={`${UrlPath.Person}/${props.dataOption.slug}`}>
						<h4>{props.dataOption.name} </h4>
						<div className="freelancer-rating">
							<div className="star-rating" data-rating={props.dataOption.rated}>
							{props.dataOption.rated && Number(props.dataOption.rated) > 0 && [...Array(Math.ceil(props.dataOption.rated)).keys()].map(y => {
								return (
									<span className={renderClassStar(y, props.dataOption.rated)}></span>
								);
							})}
							</div>
						</div>
					</Link>
				</div>
				<div className="freelancer-details-list special-mobile">
					<ul>
						<li>Location <strong><i className="icon-material-outline-location-on hide-on-mobile"></i> London</strong></li>
						<li>Rate <strong>{props.dataOption.price}</strong></li>
						<li>Job Success <strong>{props.dataOption.job_success}</strong></li>
					</ul>
				</div>
				<Link to={`${UrlPath.Person}/${props.dataOption.slug}`} className="button button-sliding-icon ripple-effect hide-on-mobile">View Profile <i className="icon-material-outline-arrow-right-alt"></i></Link>
			</div>
		</div>
	);
};

export default PersonLine;

