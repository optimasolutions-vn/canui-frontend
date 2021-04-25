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
//import PostDataCategoriesHome from '../../helpers/PostDataCategoriesHome';

const $ = window.$;
function ThousandSeparator(nStr) {
    nStr += '';
    var x = nStr.split('.');
    var x1 = x[0];
    var x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
}
function runCustomJs(){
	// Bidding Slider Average Value
	$('.selectpicker').selectpicker();
	var avgValue = (parseInt($('.bidding-slider').attr("data-slider-min")) + parseInt($('.bidding-slider').attr("data-slider-max")))/2;
	if ($('.bidding-slider').data("slider-value") === 'auto') {
		$('.bidding-slider').attr({'data-slider-value': avgValue});
	}

	// Bidding Slider Init
	$('.bidding-slider').slider();

	$(".bidding-slider").on("slide", function(slideEvt) {
		$("#biddingVal").text(ThousandSeparator(parseInt(slideEvt.value)));
	});
	$("#biddingVal").text(ThousandSeparator(parseInt($('.bidding-slider').val())));


	// Default Bootstrap Range Slider
	var currencyAttr = $(".range-slider").attr('data-slider-currency');
	
	$(".range-slider").slider({
		formatter: function(value) {
			return currencyAttr + ThousandSeparator(parseInt(value[0])) + " - " + currencyAttr + ThousandSeparator(parseInt(value[1]));
		}
	});
	
	$(".range-slider-single").slider();
	$(".keywords-container").each(function() {

		var keywordInput = $(this).find(".keyword-input");
		var keywordsList = $(this).find(".keywords-list");

		// adding keyword
		function addKeyword() {
			var $newKeyword = $("<span class='keyword'><span class='keyword-remove'></span><span class='keyword-text'>"+ keywordInput.val() +"</span></span>");
			keywordsList.append($newKeyword).trigger('resizeContainer');
			keywordInput.val("");
		}

		// add via enter key
		keywordInput.on('keyup', function(e){
			if((e.keyCode == 13) && (keywordInput.val()!=="")){
				addKeyword();
			}
		});

		// add via button
		$('.keyword-input-button').on('click', function(){ 
			if((keywordInput.val()!=="")){
				addKeyword();
			}
		});

		// removing keyword
		$(document).on("click",".keyword-remove", function(){
			$(this).parent().addClass('keyword-removed');

			function removeFromMarkup(){
			  $(".keyword-removed").remove();
			}
			setTimeout(removeFromMarkup, 500);
			keywordsList.css({'height':'auto'}).height();
		});


		// animating container height
		keywordsList.on('resizeContainer', function(){
		    var heightnow = $(this).height();
		    var heightfull = $(this).css({'max-height':'auto', 'height':'auto'}).height();

			$(this).css({ 'height' : heightnow }).animate({ 'height': heightfull }, 200);
		});

		$(window).on('resize', function() {
			keywordsList.css({'height':'auto'}).height();
		});

		// Auto Height for keywords that are pre-added
		$(window).on('load', function() {
			var keywordCount = $('.keywords-list').children("span").length;

			// Enables scrollbar if more than 3 items
			if (keywordCount > 0) {
				keywordsList.css({'height':'auto'}).height();
		
			} 
		});

	});
};
function SearchSideBarInPage (props){
	React.useEffect(() => {
		runCustomJs();
		//console.log(props);
	}, []);

	const history = useHistory();

	const [dataOptions , setDataOptions] = React.useState(props.dataOptions || {});
	const [dataOptionsCurrent , setDataOptionsCurrent] = React.useState(props.dataOptions || {});
	const { t, i18n } = useTranslation();

	const _data = useSelector((state) => state.siteData);

	const handleOnChangeSelectServices = (e) => {
		e.preventDefault();
		//console.log(e.target.selectedOptions.length);
		let _sl = e.target.selectedOptions;
		let _cr = [];
		for(let i of _sl){
			_cr.push(i.value);
		}
		setDataOptionsCurrent({
			...dataOptionsCurrent,
			ServicesSelected: _cr
		})
	};

	const handleSubmitSearchForm = (e) => {
		e.preventDefault();
		//console.log(dataOptionsCurrent);
		history.push({
			pathname: `${UrlPath.Search}`,
			search: `?`,
			state: {}
		})
	}

	const handleOnChangeKeys = (e) => {
		e.preventDefault();
		let _val = Validation.clean(e.target.value);
		setDataOptionsCurrent({
			...dataOptionsCurrent,
			keys: _val
		})
	}

	const hanldeChangeJobType = (e) => {
		e.preventDefault();
		let _val = Validation.clean(e.target.value);
		let _ar = dataOptionsCurrent.JobTypeChoice || [];
		if(e.target.checked){
			if(!_ar || _ar.indexOf(e.target.value) === -1){
				_ar.push(e.target.value);
			}
		}else{
			if(_ar && _ar.indexOf(e.target.value) > -1){
				_ar.splice(_ar.indexOf(e.target.value), 1);
			}
		}
		setDataOptionsCurrent({
			...dataOptionsCurrent,
			JobTypeChoice: dataOptionsCurrent.JobTypeChoice
		});
	};

	const checkSelected = (_val) => {
		if(dataOptions.ServicesSelected && dataOptions.ServicesSelected.length > 0){
			if(_val.indexOf(dataOptions.ServicesSelected) > -1){
				return true;
			}
		}
		return false;
	};

	const renderKeyWordList = () => {
		//console.log(dataOptions);
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
					<option value={x.slug} selected={checkSelected(x.slug)}>{x.title}</option>
				);
			});
		}
	}

	const renderJobType = () => {
		if(PostDataJobType.jobtype && PostDataJobType.jobtype.length > 0){
			return PostDataJobType.jobtype.map(x => {
				return (
					<div className="switch-container">
						<label className="switch">
							<input type="checkbox" value={x.slug} onChange={hanldeChangeJobType}/>
							<span className="switch-button"></span> 
							{x.title}
						</label>
					</div>
				);
			});
		}
	};

	return (
		<div className="sidebar-container">
			<div className="sidebar-widget">
				<h3>Location</h3>
				<div className="input-with-icon">
					<div id="autocomplete-container">
						<input id="autocomplete-input" type="text" placeholder="Location" />
					</div>
					<i className="icon-material-outline-location-on"></i>
				</div>
			</div>
			<div className="sidebar-widget">
				<h3>Keywords</h3>
				<div className="keywords-container">
					<div className="keyword-input-container">
						<input onChange={e => handleOnChangeKeys(e)} defaultValue={dataOptions.keys} value={dataOptionsCurrent.keys} type="text" className="keyword-input" placeholder="e.g. job title"/>
					</div>
					<div className="clearfix"></div>
				</div>
			</div>
			<div className="sidebar-widget">
				<h3>Services</h3>
				<select onChange={handleOnChangeSelectServices} className="selectpicker select-services" multiple data-selected-text-format="count" data-size="7" title="All Categories">
					{renderCategories()}
				</select>
			</div>
			<div className="sidebar-widget">
				<h3>Job Type</h3>

				<div className="switches-list">
					{renderJobType()}
				</div>

			</div>

			
			<div className="sidebar-widget">
				<h3>Hourly Rate</h3>
				<div className="margin-top-55"></div>

				<input defaultValue={''} className="range-slider" type="text" value="" data-slider-currency="$" data-slider-min="10" data-slider-max="250" data-slider-step="5" data-slider-value="[10,250]"/>
			</div>

			<div className="sidebar-search-button">
				<button className="button ripple-effect fullwidth" onClick={handleSubmitSearchForm}>Search</button>
			</div>
		</div>
	);
};

export default SearchSideBarInPage;

