import React from 'react';
import { connect } from 'react-redux';
import UrlPath from '../../libs/UrlPath';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {LazyImage} from "../../components/effects/LazyImage";
import NoImage from "../../assets/images/no-image-job.png";
import {compareTime, convertDateTimeToLocaleString} from '../../helpers/convert';
const mapStatus = {
	PROCESSING: 'IN PROCESS',
	COMPLETED: 'COMPLETED',
	PENDING: 'MATCHING',
	CANCEL: 'CANCEL'
}
function JobBoxLine (props){
	const { t, i18n } = useTranslation();
	const convertDateTime = (_dateTimeString) => {
		return convertDateTimeToLocaleString(_dateTimeString);
	};

	const renderLabel = (_status) => {
		if(_status && mapStatus[_status]){
			return(
				<label className={`job-label-status-${_status.toLowerCase()}`}>{mapStatus[_status]}</label>
			);
		}
		return null;
	}

	return (
		<React.Fragment key={props.dataOption.id + Math.random()}>
			<Link to={`${UrlPath.JobDetail}/${props.dataOption.id}`} className="job-listing with-apply-button">	
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
								{props.dataOption?.service?.length > 0 && (
									<li><i className="icon-material-outline-business"></i> {t(props.dataOption.service[0].title)} <div className="verified-badge" title="Verified Employer" data-tippy-placement="top"></div></li>
									)}
								{props.dataOption?.city && (
									<li><i className="icon-material-outline-location-on"></i> {t(props.dataOption.city)}</li>
									)}
								{props.dataOption?.job_type && (
									<li><i className="icon-material-outline-business-center"></i> {t(props.dataOption.job_type)}</li>
									)}
								{props.dataOption.createdAt && (
									<li><i className="icon-material-outline-access-time"></i> {convertDateTime(props.dataOption.createdAt)}</li>
									)}
							</ul>
						</div>
					</div>
					{props.dataOption?.status && renderLabel(props.dataOption?.status)}
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

