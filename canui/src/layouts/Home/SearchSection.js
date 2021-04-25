import React from 'react';
import {useHistory} from 'react-router';
import UrlPath from '../../libs/UrlPath';
import {objectToUrl} from '../../helpers/convert';
import Validation from '../../helpers/Validation';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import otherServices from '../../services/otherServices';
import { SelectPicker } from 'rsuite';


const minValue = 3;

function runScript(){
	window.$('.selectpicker').selectpicker();
}

function SearchSection (props){

	const history = useHistory();
	const inputElKey = React.useRef(null);
	const inputElWhere = React.useRef(null);
	const { t, i18n } = useTranslation();
	const _data = useSelector((state) => state.siteData);
	const [nation, setNation] = React.useState(false);
	const [cities, setCities] = React.useState(false);

	const [currentForm, setCurrentForm] = React.useState({
	  crnation: '',
	  crcities: [],
	  crkeys: '',
	  crservices: []
	});

	React.useEffect(() => {

		getCountry();
	}, []);

	React.useEffect(() => {
		runScript();
		//if(nation[0]){
			//window.$('.selectpicker.nation-select').selectpicker();
			window.$('.selectpicker.nation-select').selectpicker('refresh');
			//window.$('.selectpicker.nation-select').selectpicker('val', nation[0]?.countryId).change();
		//}
	}, [nation]);

	React.useEffect(() => {
		//if(cities[0]){
			window.$('.selectpicker.cities-select').selectpicker('refresh');
			window.$('.selectpicker.cities-select').selectpicker('val', '');
		//}
	}, [cities]);


	const hanldeClickSearch = (e) => {
		e.preventDefault();
		redirectToSearchPage();
	};

	const renderCategories = () => {
		if(_data.categories && _data.categories.length > 0){
			return (
				<>
					<select key={`categories-sl`} onChange={handleChangeService} className="selectpicker services-select default" multiple data-selected-text-format="count" data-size="7" title={t("All Categories")} >
					{_data.categories.map(x => {
						return (
							<>
								<option key={`categories-sl-${x.id}`} value={x.id}>{x.title}</option>
							</>
						);
					})}
					</select>
				</>
			)
		}
		return null;
	};

	const handleChangeService = (e) => {
		let _sl = e.target.selectedOptions;
		let _cr = [];
		for(let i of _sl){
			_cr.push(i.value);
		}
		setCurrentForm((prevState) => {
		  return {
			...prevState,
			crservices: _cr
		  }
		})
	}

	const getCountry = async () => {
		let _data = await otherServices.getCountry();
		if(_data?.length > 0){
			setNation(_data);
		}
	};

	const getCities = async (_countryId) => {
		let _data = await otherServices.getCityByCountry({country: _countryId});
		if(_data){
			setCities(_data);
		}
	};

	const redirectToSearchPage = () => {
		let _newObject = {};
		for (const [key, value] of Object.entries(currentForm)) {
			if(value?.length > 0){
				_newObject[key] = value;
			}
		}
		if(inputElKey.current.value){
			_newObject.crkeys = inputElKey.current.value;
		}
		console.log(_newObject);
		let _uri = new URLSearchParams(_newObject).toString();
		history.push({
			pathname: `${UrlPath.Search}`,
			search: `?${_uri}`,
		})
		return;
	};

	const handleChangeNation = (e) => {
		e.preventDefault();
		let _val = e.target.value;
		setCurrentForm((prevState) => {
		  return {
			...prevState,
			crnation: _val,
			crcities: []
		  }
		})
		getCities(e.target.value);
	};
	const handleChangeCity = (e) => {
		e.preventDefault();
		let _sl = e.target.selectedOptions;
		let _cr = [];
		for(let i of _sl){
			_cr.push(i.value);
		}
		setCurrentForm((prevState) => {
		  return {
			...prevState,
			crcities: _cr
		  }
		})

		//getCities(e.target.value);
	};
	const renderNation = () => {
		if(nation?.length > 0){
			return nation.map(x => {
				return (
					<option key={`nation-${x?.countryId}`} value={x?.countryId}>{x?.countryName}</option>
				);
			});
		}
		return null;
	};

	const renderCities = () => {
		if(cities?.length > 0){
			return cities.map(x => {
				return (
					<option key={`cities-${x?.countryName}`} value={x?.countryName}>{x?.countryName}</option>
				);
			});
		}
	};

	const renderContent = () => {
		return(
			<>
				<div className="row">
					<div className="col-md-12">
						<div className="intro-banner-search-form margin-top-95">

							<div className="intro-search-field">
								<label htmlFor="intro-nation" className="field-title ripple-effect">Where?</label>
								<select onChange={handleChangeNation} id="intro-nation" className="selectpicker nation-select default" data-selected-text-format="count" data-size="7" title={t("Nation")} >
									{renderNation()}
								</select>
							</div>
							<div className="intro-search-field">
								<select onChange={handleChangeCity} multiple id="intro-cities" className="selectpicker cities-select default" data-selected-text-format="count" data-size="7" title={t("All Cities")} >
									{currentForm?.crnation && cities && renderCities()}
								</select>
							</div>
							<div className="intro-search-field">
								<label htmlFor="intro-keywords" className="field-title ripple-effect">{t("What job you want?")}</label>
								<input ref={inputElKey} id="intro-keywords" type="text" placeholder="Keywords"/>
							</div>

							<div className="intro-search-field">
								{renderCategories()}
							</div>

							<div className="intro-search-button">
								<button className="button ripple-effect" onClick={hanldeClickSearch} >{t("Search")}</button>
							</div>
						</div>
					</div>
				</div>
			</>
		)
	}
	return (
		<>
		{nation && renderContent()}
		</>
	);
}
export default SearchSection;
