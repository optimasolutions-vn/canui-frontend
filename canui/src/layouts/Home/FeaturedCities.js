import React from 'react';
import { connect } from 'react-redux';
import UrlPath from '../../libs/UrlPath';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import PostDataFeaturedCitiesHome from '../../helpers/PostDataFeaturedCitiesHome';

function FeaturedCities (props){

	const { t, i18n } = useTranslation();
	const renderCard = () => {
		if(PostDataFeaturedCitiesHome.featuredCities && PostDataFeaturedCitiesHome.featuredCities.length > 0){
			return PostDataFeaturedCitiesHome.featuredCities.map(x => {
				var _style = {
					backgroundImage: `url(${x.image})`,
					backgroundSize: 'cover',
					backgroundPosition: 'center center',
					backgroundRepeat: 'no-repeat',
				};

				return (
					<div key={x.slug} className="col-xl-3 col-md-6">
						<Link
							className="photo-box"
							to={`${UrlPath.Search}?crnation=VN&crcities=${x.label}`}
							style={_style}>
							<div className="photo-box-content">
								<h3>{t(x.label)}</h3>
								<span>{x.total_jobs} {t('Cani')}</span>
							</div>
						</Link>
					</div>
				);
			});
		}
	};

	return (
		<div className="section margin-top-65 margin-bottom-65">
			<div className="container">
				<div className="row">
					<div className="col-xl-12">
						<div className="section-headline centered margin-top-0 margin-bottom-45">
							<h3>{t('Featured Cities')}</h3>
						</div>
					</div>
					{renderCard()}
				</div>
			</div>
		</div>
	);
};

export default FeaturedCities;

