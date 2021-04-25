import React from 'react';
import { connect } from 'react-redux';
import UrlPath from '../../libs/UrlPath';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import PostDataFeaturedJobsHome from '../../helpers/PostDataFeaturedJobsHome';
import {LazyImage} from "../../components/effects/LazyImage";
import NoImage from "../../assets/images/no-image-job.png";
import {compareTime} from '../../helpers/convert';
import JobBoxLine from '../../components/JobBoxLine';

function FeaturedJobs (props){

	const { t, i18n } = useTranslation();
	const convertDateTime = (_dateTimeString) => {
		return compareTime(_dateTimeString);
	};
	const renderCard = () => {
		if(PostDataFeaturedJobsHome.featuredJobs && PostDataFeaturedJobsHome.featuredJobs.length > 0){
			return PostDataFeaturedJobsHome.featuredJobs.map(x => {
				//x.applyBtn = true;
				return (
					<JobBoxLine 
						dataOption={x}
						/>
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
							<Link to={`${UrlPath.Job}`} className="headline-link">Browse All Jobs</Link>
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

