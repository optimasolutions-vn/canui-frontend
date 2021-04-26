import React from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import UrlPath from '../../libs/UrlPath';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import PostDataFeaturedJobsHome from '../../helpers/PostDataFeaturedJobsHome';
import {LazyImage} from "../../components/effects/LazyImage";
import NoImage from "../../assets/images/no-image-job.png";
import {compareTime} from '../../helpers/convert';
import JobBoxLine from '../../components/JobBoxLine';
import {checkIsCanIState} from '../../helpers';
import otherServices from '../../services/otherServices';

function FeaturedJobs (props){

	const [data, setData] = React.useState([]);
	const dataUser = useSelector(state => state.user);

	React.useEffect(() => {
		getJobs();
	}, []);

	const getJobs = async () => {
		let _list = await otherServices.getJobsList({
			page: 0,
			size: 5,
			sort: 'createdAt,desc'
		});
		if(_list?.status && _list?.data?.content){
			setData(_list.data.content);
		}else{

		}
	}

	const { t, i18n } = useTranslation();
	const convertDateTime = (_dateTimeString) => {
		return compareTime(_dateTimeString);
	};
	const renderCard = () => {
		return data.map(x => {
			return (
				<JobBoxLine
					key={`line-job-${x.id}`}
					dataOption={x}
					/>
			);
		});
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
							{dataUser?.profile?.id && (
								<Link to={`${UrlPath.MyPagePostRequest}`} className="headline-link">{t('Create Job')}</Link>
							)}
						</div>
						<div className="listings-container compact-list-layout margin-top-35">
						{data?.length > 0 && renderCard()}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default FeaturedJobs;

