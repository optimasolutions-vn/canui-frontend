import React from 'react';
import { connect } from 'react-redux';
import { stores } from '../../stores';
import UrlPath from '../../libs/UrlPath';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
//import PostDataCategoriesHome from '../../helpers/PostDataCategoriesHome';

import { useSelector, useDispatch } from 'react-redux';

function CategoriesBox (props){

	const _data = useSelector((state) => state.siteData);
	const { t, i18n } = useTranslation();

	const renderCard = () => {
		if(_data.categories && _data.categories.length > 0){
			return _data.categories.map(x => {
				return (
					<React.Fragment key={x.id}>
						<Link to={`${UrlPath.Search}/?crservice=${x.id}`} className="category-box">
							<div className="category-box-icon">
							{x.icon_awesome_class && (
								<i className={x.icon_awesome_class}></i>
							)}
							{!x.icon_awesome_class && x.icon_url && (
								<img src={x.icon_url} alt=""/>
							)}
							</div>
							<div className="category-box-counter">{x.quantity || 0}</div>
							<div className="category-box-content">
								<h3>{x.title}</h3>
								{x.description && (
									<p>{x.description}</p>
								)}
							</div>
						</Link>
					</React.Fragment>
				);
			});
		}
	};

	return (
		<div className="section margin-top-65">
			<div className="container">
				<div className="row">
					<div className="col-xl-12">
						<div className="section-headline centered margin-bottom-15">
							<h3>{t('Popular Job Categories')}</h3>
						</div>
						<div className="categories-container">
							{renderCard()}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CategoriesBox;

