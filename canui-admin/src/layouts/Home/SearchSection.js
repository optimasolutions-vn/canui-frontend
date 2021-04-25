import React from 'react';
import {useHistory} from 'react-router';
import UrlPath from '../../libs/UrlPath';
import {objectToUrl} from '../../helpers/convert';
import Validation from '../../helpers/Validation';
import { useSelector, useDispatch } from 'react-redux';
const minValue = 3;

function runScript(){
	window.$('.selectpicker').selectpicker();
}

function SearchSection (props){

	React.useEffect(() => {
		runScript();
	}, []);

	const history = useHistory();
	const inputElKey = React.useRef(null);
	const inputElWhere = React.useRef(null);
	const hanldeClickSearch = (e) => {
		e.preventDefault();
		redirectToSearchPage();
	};
	const _data = useSelector((state) => state.siteData);
	const renderCategories = () => {
		if(_data.categories && _data.categories.length > 0){
			return _data.categories.map(x => {
				return (
					<option value={x.slug}>{x.title}</option>
				);
			});
		}
	}

	const redirectToSearchPage = () => {
		let _options = {};
		let _key = Validation.clean(inputElKey.current.value);
		let _where = Validation.clean(inputElWhere.current.value);
		if(_key.length > minValue){
			_options.keys = Validation.clean(_key.trim());
		}
		if(_where.length > minValue){
			_options.where = Validation.clean(_where.trim());
		}
		let _url = objectToUrl(_options);
		history.push({
			pathname: `${UrlPath.Search}`,
			search: `${_url.search}`,
			state: {}
		})
		return;
	};

	return (
		<div className="row">
			<div className="col-md-12">
				<div className="intro-banner-search-form margin-top-95">

					
					<div className="intro-search-field with-autocomplete">
						<label htmlFor="autocomplete-input" className="field-title ripple-effect">Where?</label>
						<div className="input-with-icon">
							<input ref={inputElWhere} id="autocomplete-input" type="text" placeholder="Online Job"/>
							<i className="icon-material-outline-location-on"></i>
						</div>
					</div>

					
					<div className="intro-search-field">
						<label htmlFor="intro-keywords" className="field-title ripple-effect">What job you want?</label>
						<input ref={inputElKey} id="intro-keywords" type="text" placeholder="Job Title or Keywords"/>
					</div>

					<div className="intro-search-field">
						<select class="selectpicker default" multiple data-selected-text-format="count" data-size="7" title="All Categories" >
							{renderCategories()}
						</select>
					</div>

					
					<div className="intro-search-button">
						<button className="button ripple-effect" onClick={hanldeClickSearch} >Search</button>
					</div>
				</div>
			</div>
		</div>
	);
}
export default SearchSection;