import React from 'react';
import { connect } from 'react-redux';
import UrlPath from '../../libs/UrlPath';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import JobBoxLine from '../../components/JobBoxLine';
import PersonLine from '../../components/PersonLine';
//import PostDataCategoriesHome from '../../helpers/PostDataCategoriesHome';

function SearchResultInPage (props){

	const [dataOptions , setDataOptions] = React.useState(false);
	React.useEffect(() => {
		if(props.dataOptions){
			setDataOptions(props.dataOptions);
		}
	}, [props.dataOptions]);

	const { t, i18n } = useTranslation();

	const getResultSearch = () => {

	};

	return (
		<React.Fragment>
			<h3 className="page-title hide-on-mobile">Search Results</h3>
			<div className="notify-box margin-top-15 hide-on-mobile">
				<div className="switch-container">
					<label className="switch">
						<input type="checkbox"/>
						<span className="switch-button"></span>
						<span className="switch-text">Turn on email alerts for this search</span>
					</label>
				</div>

				<div className="sort-by">
					<span>Sort by:</span>
					<select className="selectpicker">
						<option>Relevance</option>
						<option>Newest</option>
						<option>Oldest</option>
						<option>Random</option>
					</select>
				</div>
			</div>
			<div className="freelancers-container freelancers-list-layout compact-list margin-top-35">
				
				{dataOptions && dataOptions.length > 0 && dataOptions.map(x => {
					return (
						<PersonLine dataOption={x} />
					);
				})}
			</div>
			<div className="clearfix"></div>
			<div className="row">
				<div className="col-md-12">
					<div className="pagination-container margin-top-30 margin-bottom-60">
						<nav className="pagination">
							<ul>
								<li className="pagination-arrow"><a href="#"><i className="icon-material-outline-keyboard-arrow-left"></i></a></li>
								<li><a href="#" className="current-page">1</a></li>
								<li><a href="#">2</a></li>
								<li><a href="#">3</a></li>
								<li><a href="#">4</a></li>
								<li className="pagination-arrow"><a href="#"><i className="icon-material-outline-keyboard-arrow-right"></i></a></li>
							</ul>
						</nav>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};

export default SearchResultInPage;

