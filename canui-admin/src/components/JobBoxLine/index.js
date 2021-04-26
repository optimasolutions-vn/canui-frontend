import React from 'react';
import { connect } from 'react-redux';
import UrlPath from '../../libs/UrlPath';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {LazyImage} from "../../components/effects/LazyImage";
import NoImage from "../../assets/images/no-image-job.png";
import {compareTime} from '../../helpers/convert';

function JobBoxLine (props){
	React.useEffect(() => {
		//console.log(props);
	}, []);
	const { t, i18n } = useTranslation();
	const convertDateTime = (_dateTimeString) => {
		return compareTime(_dateTimeString);
	};

	return (
		<React.Fragment key={props.dataOption.id + Math.random()}>
			<Link to={`${UrlPath.Job}/${props.dataOption.slug}`} className="job-listing with-apply-button">	
				<div className="job-listing-details">
					<div className="job-listing-company-logo">
						<LazyImage
	                        key={props.dataOption.id + Math.random()}
	                        src={props.dataOption.image || NoImage}
	                        alt={props.dataOption.title}
	                    />
					</div>
					<div className="job-listing-description">
						<h3 className="job-listing-title">{t(props.dataOption.title)}</h3>
						<div className="job-listing-footer">
							<ul>
								{props.dataOption.service && props.dataOption.service.title && (
									<li><i className="icon-material-outline-business"></i> {t(props.dataOption.service.title)} <div className="verified-badge" title="Verified Employer" data-tippy-placement="top"></div></li>
									)}
								{props.dataOption.city && props.dataOption.city.label && (
									<li><i className="icon-material-outline-location-on"></i> {t(props.dataOption.city.label)}</li>
									)}
								{props.dataOption.job_type && props.dataOption.job_type.label && (
									<li><i className="icon-material-outline-business-center"></i> {t(props.dataOption.job_type.label)}</li>
									)}
								{props.dataOption.created_at && (
									<li><i className="icon-material-outline-access-time"></i> {convertDateTime(props.dataOption.created_at)}</li>
									)}
							</ul>
						</div>
					</div>
					{props.dataOption.applyBtn && (
						<span className="list-apply-button ripple-effect">Apply Now</span>
					)}
					{props.dataOption.bookmark && (
						<span class="bookmark-icon"></span>
					)}
				</div>
			</Link>	
		</React.Fragment>
	);
};

export default JobBoxLine;

