import React from 'react';
import { connect } from 'react-redux';
import UrlPath from '../../libs/UrlPath';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import JobBoxLine from '../../components/JobBoxLine';
import PersonLine from '../../components/PersonLine';

import Pagination from '@material-ui/lab/Pagination';
//import PostDataCategoriesHome from '../../helpers/PostDataCategoriesHome';

function SearchResultInPage (props){

	const [dataOptions , setDataOptions] = React.useState(false);
	React.useEffect(() => {
		if(props.dataOptions){
			setDataOptions(props.dataOptions);
		}
	}, [props.dataOptions]);

	const { t, i18n } = useTranslation();
	const handleCallBackNextPage = (event, _page) => {
		if(typeof props.callBackNextPage === 'function'){
			props.callBackNextPage(_page);
		}
	}
	const handleChangeOrder = (e) => {
		if(typeof props.callBackChangeOrder === 'function'){
			props.callBackChangeOrder(e.target.value);
		}
	}

	return (
		<React.Fragment>
			<h3 className="page-title hide-on-mobile">{t('Search Results')} (<strong>{props?.dataOptions?.totalElements || 0}</strong>)</h3>
			<h4 className="page-title hide-on-mobile"></h4>
			<div className="notify-box margin-top-15 hide-on-mobile">
				<div className="switch-container">
					<label className="switch">
						<input type="checkbox"/>
						<span className="switch-button"></span>
						<span className="switch-text">{t('Turn on email alerts for this search')}</span>
					</label>
				</div>

				<div className="sort-by">
					<span>{t('Sort by')}:</span>
					<select className="selectpicker" defaultValue={dataOptions?.order || 'desc'} onChange={handleChangeOrder}>
						<option  value={'desc'}>{t('Newest')}</option>
						<option  value={'asc'}>{t('Oldest')}</option>
					</select>
				</div>
			</div>
			<div className="freelancers-container freelancers-list-layout compact-list margin-top-35">
				{dataOptions && dataOptions?.content?.length > 0 && dataOptions?.content.map(x => {
					return (
						<PersonLine dataOption={x} />
					);
				})}
			</div>
			<div className="clearfix"></div>
			<div className="row">
				<div className="col-md-12">
					<div className="pagination-container margin-top-30 margin-bottom-60">
						{dataOptions?.totalPages > 1 &&  (
							<Pagination 
								count={dataOptions?.totalPages} 
								page={1 + dataOptions?.number} 
								onChange={handleCallBackNextPage}
								size="large" />
						
						)}
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};

export default SearchResultInPage;

