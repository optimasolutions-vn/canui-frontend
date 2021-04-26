import React from 'react';
import { connect } from 'react-redux';
import UrlPath from '../../libs/UrlPath';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import PostDataFeaturedJobsHome from '../../helpers/PostDataFeaturedJobsHome';
import {LazyImage} from "../effects/LazyImage";
import NoImage from "../../assets/images/no-image-job.png";
import {compareTime} from '../../helpers/convert';

function FeaturedJobs (props){

	const { t, i18n } = useTranslation();
	const convertDateTime = (_dateTimeString) => {
		return compareTime(_dateTimeString);
	};
	const renderCard = () => {
		if(PostDataFeaturedJobsHome.featuredJobs && PostDataFeaturedJobsHome.featuredJobs.length > 0){
			return PostDataFeaturedJobsHome.featuredJobs.map(x => {
				return (
					<React.Fragment key={x.id + Math.random()}>
						<Link to={`${UrlPath.Job}/${x.slug}`} className="job-listing with-apply-button">	
							<div className="job-listing-details">
								<div className="job-listing-company-logo">
									<LazyImage
				                        key={x.id + Math.random()}
				                        src={x.image || NoImage}
				                        alt={x.title}
				                    />
								</div>
								<div className="job-listing-description">
									<h3 className="job-listing-title">{t(x.title)}</h3>
									<div className="job-listing-footer">
										<ul>
											{x.service && x.service.title && (
												<li><i className="icon-material-outline-business"></i> {t(x.service.title)} <div className="verified-badge" title="Verified Employer" data-tippy-placement="top"></div></li>
												)}
											{x.city && x.city.label && (
												<li><i className="icon-material-outline-location-on"></i> {t(x.city.label)}</li>
												)}
											{x.job_type && x.job_type.label && (
												<li><i className="icon-material-outline-business-center"></i> {t(x.job_type.label)}</li>
												)}
											{x.created_at && (
												<li><i className="icon-material-outline-access-time"></i> {convertDateTime(x.created_at)}</li>
												)}
										</ul>
									</div>
								</div>
								<span className="list-apply-button ripple-effect">Apply Now</span>
							</div>
						</Link>	
					</React.Fragment>
				);
			});
		}
	};

	return (
		<div className="section gray margin-top-45 padding-top-65 padding-bottom-75">
			<div className="container">
				<div className="row">
					<div className="col-xl-12">
						<div className="section-headline margin-top-0 margin-bottom-35">
							<h3>Featured Jobs</h3>
							<a href="jobs-list-layout-full-page-map.html" className="headline-link">Browse All Jobs</a>
						</div>
						<div className="listings-container compact-list-layout margin-top-35">
						{renderCard()}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default FeaturedJobs;

