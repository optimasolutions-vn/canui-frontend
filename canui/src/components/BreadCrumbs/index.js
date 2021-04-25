import React from 'react';
import { connect } from 'react-redux';
import UrlPath from '../../libs/UrlPath';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';


function BreadCrumbs (props){

	const { t, i18n } = useTranslation();

	return (
		<nav id="breadcrumbs" className="white">
			<ul>
				<li><Link to={`${UrlPath.Home}`}>{t('Home')}</Link></li>
				{props.dataList && props.dataList.map(x => {
					return x.value ? (
						<li key={x.value}><Link to={x.value}>{t(x.label)}</Link></li>
					) : (
						<li key={x.label}>{x.label}</li>
					);
				})}
			</ul>
		</nav>
	);
};

export default BreadCrumbs;

