import React from 'react';
import { connect } from 'react-redux';
import UrlPath from '../../libs/UrlPath';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import PostDataCategoriesHome from '../../helpers/PostDataCategoriesHome';
import PostDataJobType from '../../helpers/PostDataJobType';
import Validation from '../../helpers/Validation';
import {useHistory} from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import runCustomJs from './script';
import otherServices from '../../services/otherServices';
import RangeSlider from 'react-bootstrap-range-slider';

//import PostDataCategoriesHome from '../../helpers/PostDataCategoriesHome';

function SearchSideBarInPage (props){
	
	const history = useHistory();
	const [dataOptions , setDataOptions] = React.useState(props.dataOptions || {});
	const [dataOptionsCurrent , setDataOptionsCurrent] = React.useState(props.dataOptions || {});
	const { t, i18n } = useTranslation();
	const _data = useSelector((state) => state.siteData);
	const [nationList, setNationList] = React.useState(false);
	const [citiesList, setCitiesList] = React.useState(false);
	const [loadingState, setLoadingState] = React.useState(false);
	const refJobType = React.createRef(null);
	const refPrice = React.createRef(null);


	React.useEffect(() => {
		//console.log(dataOptionsCurrent);
		runCustomJs();
		getCountry();
		if(dataOptionsCurrent?.crservices?.length > 0){
			if(typeof dataOptionsCurrent?.crservices === 'string'){
				window.$('.selectpicker.services-select').selectpicker('val', dataOptionsCurrent?.crservices?.split(/\,/) || '');
			}else if(dataOptionsCurrent?.crservices?.length > 0){
				window.$('.selectpicker.services-select').selectpicker('val', dataOptionsCurrent?.crservices || '');
			}
			
		}else{
			window.$('.selectpicker.services-select').selectpicker('val', '');
		}
	}, []);

	React.useEffect(() => {
		setTimeout(() => {
			window.$(".range-slider").slider();
		}, 10000);
		
	})

	React.useEffect(() => {
		window.$('.selectpicker.nation-select').selectpicker('refresh');
		if(dataOptions?.crnation){
			window.$('.selectpicker.nation-select').selectpicker('val', dataOptions?.crnation);
		}
	}, [nationList]);

	React.useEffect(() => {
		window.$('.selectpicker.cities-select').selectpicker('refresh');
		if(dataOptionsCurrent?.crcities?.length > 0){
			if(typeof dataOptionsCurrent?.crcities === 'string'){
				window.$('.selectpicker.cities-select').selectpicker('val', dataOptionsCurrent?.crcities?.split(/\,/) || '');
			}else if(dataOptionsCurrent?.crcities?.length > 0){
				window.$('.selectpicker.cities-select').selectpicker('val', dataOptionsCurrent?.crcities || '');
			}
		}else{
			window.$('.selectpicker.cities-select').selectpicker('val', '');
		}
	}, [citiesList]);

	const handleOnChangeSelectServices = (e) => {
		e.preventDefault();
		let _sl = e.target.selectedOptions;
		let _cr = [];
		for(let i of _sl){
			_cr.push(i.value);
		}
		setDataOptionsCurrent({
			...dataOptionsCurrent,
			crservices: _cr
		})
	};

	const handleSubmitSearchForm = (e) => {
		e.preventDefault();
		
		let _dataObject = {};
		if(dataOptionsCurrent?.crnation){
			_dataObject.crnation = dataOptionsCurrent.crnation;
		}
		if(dataOptionsCurrent?.crcities){
			if(typeof dataOptionsCurrent?.crcities === 'string'){
				_dataObject.crcities = dataOptionsCurrent.crcities.split(/\,/);
			}else if( dataOptionsCurrent?.crcities?.length > 0){
				_dataObject.crcities = dataOptionsCurrent.crcities;
			}
		}
		if(dataOptionsCurrent?.crservices){
			if(typeof dataOptionsCurrent?.crservices === 'string'){
				_dataObject.crservices = dataOptionsCurrent.crservices.split(/\,/);
			}else if(dataOptionsCurrent?.crservices?.length > 0){
				_dataObject.crservices = dataOptionsCurrent.crservices;
			}
		}
		if(dataOptionsCurrent?.crkeys){
			_dataObject.crkeys = dataOptionsCurrent.crkeys;
		}
		if(dataOptionsCurrent?.crserviceType){
			_dataObject.crserviceType = dataOptionsCurrent.crserviceType;
		}
		//console.log(refPrice.current.value);
		if(refPrice?.current?.value){
			_dataObject.crprice = refPrice.current.value;
		}else if(dataOptionsCurrent?.crprice){
			_dataObject.crprice = dataOptionsCurrent.crprice;
		}
		
		//debugger;
		let _uri = new URLSearchParams(_dataObject).toString();
		history.push({
			pathname: `${UrlPath.Search}`,
			search: `?${_uri}`,
		})
	}

	const handleOnChangeKeys = (e) => {
		e.preventDefault();
		let _val = Validation.clean(e.target.value);
		setDataOptionsCurrent({
			...dataOptionsCurrent,
			crkeys: _val
		})
	}

	const hanldeChangeJobType = (e) => {
		let _status = e.target.checked;
		let _eval = e.target.value;
		let _checkedList = dataOptionsCurrent.crserviceType || [];
		if(_checkedList){
			if(!_status && _checkedList.indexOf(_eval) > -1){
				_checkedList.splice(_checkedList.indexOf(_eval), 1);
			}else if(_status && _checkedList.indexOf(_eval) === -1){
				_checkedList.push(_eval);
			}
		}
		setDataOptionsCurrent(prevState => {
			return{
				...prevState,
				crserviceType: _checkedList
			}
		});
	};

	const handleOnChangePrice = (_val) => {
		setDataOptionsCurrent(prevState => {
			return{
				...prevState,
				crprice: _val
			}
		});
	}

	const checkSelected = (_val) => {
		if(dataOptions.ServicesSelected && dataOptions.ServicesSelected.length > 0){
			if(_val.indexOf(dataOptions.ServicesSelected) > -1){
				return true;
			}
		}
		return false;
	};

	const getCountry = async () => {
		let _data = await otherServices.getCountry();
		if(_data?.length > 0){
			setNationList(_data);
			if(dataOptions?.crnation){
				getCities(dataOptionsCurrent?.crnation)
			}
		}
	};
	const handleOnChangeNation = (e) => {
		let _cn = e.target.value;
		setDataOptionsCurrent(propsState => {
			return {
				...propsState,
				crnation: _cn,
				crcities: []
			}
		});
		getCities(_cn);
	}

	const getCities = async (_countryId) => {
		let _data = await otherServices.getCityByCountry({country: _countryId});
		if(_data){
			setCitiesList(_data);
		}
	};

	const handleOnChangeCities = (e) => {
		e.preventDefault();
		let _sl = e.target.selectedOptions;
		let _cr = [];
		for(let i of _sl){
			_cr.push(i.value);
		}
		setDataOptionsCurrent(prevState => {
		  return {
			...prevState,
			crcities: _cr
		  }
		})
	}

	const renderKeyWordList = () => {
		if(dataOptions.keys){
			return(
			<span className='keyword'>
				<span className='keyword-remove'></span>
				<span className='keyword-text'>{dataOptions.keys}</span>
			</span>);
		}
		return null;
	};

	const renderCategories = () => {
		if(_data.categories && _data.categories.length > 0){
			return _data.categories.map(x => {
				return (
					<>
						<option value={x.id}>{x.title}</option>
					</>
				);
			});
		}
	}

	const renderJobType = () => {
		if(PostDataJobType.jobtype && PostDataJobType.jobtype.length > 0){
			return PostDataJobType.jobtype.map(x => {
				let _checked = dataOptionsCurrent?.crserviceType?.indexOf(x.slug) > -1 ? true : false;
				return (
					<div className="switch-container">
						<label className="switch">
							<input type="checkbox" onChange={hanldeChangeJobType} checked={_checked} id={`service-type-${x.slug}`} value={x.slug}/>
							<span className="switch-button"></span> 
							{x.title}
						</label>
					</div>
				);
			});
		}
	};

	const renderNation = () => {
		return(
		<>
			<div className="sidebar-widget">
				<h3>{t('Nation')}</h3>
				<div className="input-with-icon">
					<div id="autocomplete-container-nation">
						<select onChange={handleOnChangeNation} className="selectpicker nation-select" data-selected-text-format="count" data-size="7" title={t('Select Nation')}>
							{nationList && nationList.map(x => {
								return(
									<><option value={x.countryId}>{x.countryName}</option></>
								)
							})}
						</select>
					</div>
					<i className="icon-material-outline-location-on"></i>
				</div>
			</div>
		</>
		);
	}

	const renderCities = () => {
		return (
		<>
			<div className="sidebar-widget">
				<h3>{t('Cities')}</h3>
				<div className="input-with-icon">
					<div id="autocomplete-container-cities">
						<select onChange={handleOnChangeCities} className="selectpicker cities-select" multiple data-selected-text-format="count" data-size="7" title={t('All Cities')}>
							{citiesList && citiesList.map(x => {
								return(
									<><option value={x.countryName}>{x.countryName}</option></>
								)
							})}
						</select>
					</div>
					<i className="icon-material-outline-location-on"></i>
				</div>
			</div>
		</>
		);
	}

	const renderPriceRange = (_range) => {
		return(
			<>
				<div>
					<input ref={refPrice} className="range-slider" defaultValue={_range} type="text" data-slider-currency="$" data-slider-min="10" data-slider-max="250" data-slider-step="5" data-slider-value="[10,250]"/>
				</div>
			</>
		)
	}

	const renderPriceT = () => {
		return null;
		return (
			<div className="sidebar-widget">
				<h3>{t('Price')}</h3>
				<div className="margin-top-55"></div>
				{renderPriceRange(dataOptionsCurrent.crprice)}
			</div>
		);
	}

	return (
		<div className="sidebar-container">
			{renderNation()}
			{renderCities()}
			<div className="sidebar-widget">
				<h3>{t('Keywords')}</h3>
				<div className="keywords-container">
					<div className="keyword-input-container">
						<input onChange={handleOnChangeKeys} defaultValue={dataOptionsCurrent.crkeys} type="text" className="keyword-input" placeholder={t('e.g. title')}/>
					</div>
					<div className="clearfix"></div>
				</div>
			</div>
			<div className="sidebar-widget">
				<h3>{t('Services')}</h3>
				<select onChange={handleOnChangeSelectServices} className="selectpicker services-select" multiple data-selected-text-format="count" data-size="7" title={t('All Categories')}>
					{renderCategories()}
				</select>
			</div>
			<div className="sidebar-widget">
				<h3>{t('Job Type')}</h3>
				<div className="switches-list" ref={refJobType}>
					{renderJobType()}
				</div>
			</div>
			{renderPriceT()}
			<div className="sidebar-search-button">
				{loadingState && (
					<button className="button ripple-effect fullwidth">{t('Search')}</button>
				)}
				{!loadingState && (
					<button className="button ripple-effect fullwidth" onClick={handleSubmitSearchForm}>{t('Search')}</button>
				)}
			</div>
		</div>
	);
};

export default SearchSideBarInPage;

