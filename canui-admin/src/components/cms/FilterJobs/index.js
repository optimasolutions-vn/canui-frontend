import React from 'react';
import Loader from '../../../components/effects/Loader';
import { connect } from 'react-redux';
import JobsServices from '../../../services/JobsServices';
import {Link} from 'react-router-dom';
import UrlPath from '../../../libs/UrlPath';
import MessageConst from '../../../libs/MessageConst';
import { SelectPicker, Popup, Alert} from '../../../layouts/cms/Scripts/Popup';
import {JobStatus, getNationList, getCitiesList} from '../../../helpers/DataAccess';

import '../../../layouts/cms/Styles/style.scss';
import { withTranslation } from 'react-i18next';
import SelectPickerCom from "../../../components/SelectPicker";
import KeyWordsForm from '../../../components/cms/KeywordsForm/KeyWordsForm';

const mapStateToProps = state => ({
	user: state.user,
	ServicesList: state.siteData.categories
});

class FilterJobs extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			keys: [],
			nations: [],
			cities: [],
			services: [],
			status: [],
			createdBy: [],
			pickupBy: [],
			requestedBy: [],
			ServiceList: this.props.ServicesList || [],
			StatusList: JobStatus,
			NationsList: getNationList(),
			CitiesList: false,
			isLockFilter: false,
			createdUser: this.props?.createdUser || [],
			requestedUser: this.props?.requestedUser || [],
			pickupUser: this.props?.pickupUser || [],
		};
	};
	componentDidMount(){
		SelectPicker();
	};
	componentDidUpdate(prevProps, prevState){
		window.$('.selectpicker').selectpicker('refesh');
	};

	getCities = (_ct) => {
		let _res = [];
		let _ctsg;
		if(typeof _ct === 'array' || typeof _ct === 'object'){
			for (let i in _ct) {
				_ctsg = getCitiesList(_ct[i]);
				_res = [..._res, ..._ctsg];
			}
		}
		this.setState({
			CitiesList: _res,
		}, () => {
			window.$('.selectpicker.select-cities').selectpicker('refesh');
		})
	}

	handleSelectedKeys = (_keys) => {
		
		this.setState({
			keys: _keys
		})
	}

	handleCloseFilter = (e) => {
		e.persist();
		if(typeof this.props.callBackClose === 'function'){
			this.props.callBackClose();
		}
	}

	handleFilterData = (e) => {
		this.handleCallBackSearchProps();
		this.setState({
			isLockFilter: false
		})
	}

	handleClickOnBtnSearch = (e) => {
		e.preventDefault();
		if(this.state.isLockFilter){
			return;
		}
		this.setState({
			isLockFilter: true
		}, () => {
			this.handleFilterData();
		})
	}
	handleClickOnBtnReset = (e) => {
		if(this.state.isLockFilter){
			return;
		}
		this.setState({
			keys: [],
			nations: [],
			cities: [],
			services: [],
			status: [],
			createdBy: [],
			pickupBy: [],
			requestedBy: [],
			CitiesList: false,
			isLockFilter: false
		}, () => {
			if(typeof this.props.callBackReset === 'function'){
				this.props.callBackReset();
			}
			window.$('.selectpicker.select-nations').selectpicker('refesh');
			window.$('.selectpicker.select-nations').selectpicker('val', '');
			
			window.$('.selectpicker.select-services').selectpicker('refesh');
			window.$('.selectpicker.select-services').selectpicker('val', '');

			window.$('.selectpicker.select-status').selectpicker('refesh');
			window.$('.selectpicker.select-status').selectpicker('val', '');

			window.$('.selectpicker.select-createdBy').selectpicker('refesh');
			window.$('.selectpicker.select-createdBy').selectpicker('val', '');
			window.$('.selectpicker.select-pickupCani').selectpicker('refesh');
			window.$('.selectpicker.select-pickupCani').selectpicker('val', '');
			window.$('.selectpicker.select-requestedCani').selectpicker('refesh');
			window.$('.selectpicker.select-requestedCani').selectpicker('val', '');

			setTimeout(() => {
				window.$(".jobs-filter-wrapper").animate({ scrollTop: 0 }, "slow");
			}, 50);
		})
	}
	handleChangeService = (e) => {
		let _nt = e.target.selectedOptions;
		let _cr = [];
		for(let i of _nt){
			_cr.push(Number(i.value));
		}
		this.setState({
			services: _cr,
		})
	}
	handleChangeStatus = (e) => {
		let _nt = e.target.selectedOptions;
		let _cr = [];
		for(let i of _nt){
			_cr.push(i.value);
		}
		this.setState({
			status: _cr,
		})
	}
	handleChangeNation = (e) => {
		let _nt = e.target.selectedOptions;
		let _cr = [];
		for(let i of _nt){
			_cr.push(i.value);
		}
		this.setState({
			nations: _cr,
			cities: [],
			CitiesList: false,
		}, () => {
			this.getCities(_cr);
		})
	}
	handleChangeCities = (e) => {
		let _nt = e.target.selectedOptions;
		let _cr = [];
		for(let i of _nt){
			_cr.push(i.value);
		}
		this.setState({
			cities: _cr,
		})
	}
	handleChangeCreatedBy = (e) => {
		let _nt = e.target.selectedOptions;
		let _cr = [];
		for(let i of _nt){
			_cr.push(Number(i.value));
		}
		this.setState({
			createdBy: _cr,
		})
	}
	handleChangeRequestedBy = (e) => {
		let _nt = e.target.selectedOptions;
		let _cr = [];
		for(let i of _nt){
			_cr.push(Number(i.value));
		}
		this.setState({
			requestedBy: _cr,
		})
	}
	handleChangePickupBy = (e) => {
		let _nt = e.target.selectedOptions;
		let _cr = [];
		for(let i of _nt){
			_cr.push(Number(i.value));
		}
		this.setState({
			pickupBy: _cr,
		})
	}

	handleCallBackSearchProps = () => {
		if(typeof this.props.callBackSearch === 'function'){
			let _obj = {
				nations: this.state.nations,
				cities: this.state.cities,
				keys: this.state.keys,
				services: this.state.services,
				status: this.state.status,
				createdBy: this.state.createdBy,
				pickupBy: this.state.pickupBy,
				requestedBy: this.state.requestedBy
			}
			this.props.callBackSearch(_obj);
		}
	}

	renderNations = () => {
		return this.state?.NationsList.map(x => {
			return <option key={`nation-sg-${x.countryId}`} value={x.countryId}>{x.countryName}</option>
		})
	}

	renderCities = () => {
		return this.state?.CitiesList.map(x => {
			return <option key={`cities-sg-${x.countryName}`} value={x.countryName}>{x.countryName}</option>
		})
	}

	renderServices = () => {
		return this.state?.ServiceList.map(x => {
			return <option key={`service-sg-${x.id}`} value={x.id}>{x.title}</option>
		})
	}
	renderStatus = () => {
		return this.state?.StatusList.map(x => {
			return <option key={`status-sg-${x}`} value={x}>{x.toLowerCase()}</option>
		})
	}
	renderCreatedUserList = () => {
		return this.state?.createdUser.map(x => {
			return <option key={`createduser-sg-${x.id}`} value={x.id}>({x.id}) {x.name}</option>
		})
	}
	renderPickupUserList = () => {
		return this.state?.pickupUser.map(x => {
			return <option key={`pickupuser-sg-${x.id}`} value={x.id}>({x.id}) {x.name}</option>
		})
	}
	renderRequestedUserList = () => {
		return this.state?.requestedUser.map(x => {
			return <option key={`requesteduser-sg-${x.id}`} value={x.id}>({x.id}) {x.name}</option>
		})
	}


	render(){
		const {t} = this.props;
		return(
			<>
				<div className={`${this.props.isOpen ? 'jobs-filter-show' : 'jobs-filter-hide'}`}>
					<div className="jobs-filter" tabIndex="-1">
						<div className="jobs-filter-wrapper">
							<div className="jobs-filter-header">
								<h5>Filter Jobs</h5>
								<div className="jobs-filter-btnClose" onClick={this.handleCloseFilter}>
									<span></span>
									<span></span>
								</div>
							</div>

							<div className="jobs-filter-content">
								<div className="row">
									<div className="col-12">
										<div className="submit-field">
											<h5>{t('Key Words')}</h5>
											<KeyWordsForm 
												resetSelected={this.state.keys}
												callBackSelectKeyWord={this.handleSelectedKeys}
												/>
										</div>
									</div>
									<div className="col-12">
										<div className="submit-field">
											<h5>{t('Nation')}</h5>
											{this.state?.NationsList?.length > 0 && (
											<select title="All Nations" className="selectpicker select-nations default" multiple data-live-search="true" data-selected-text-format="count" data-size="7" onChange={this.handleChangeNation}>
												{this.renderNations()}
											</select>
											)}
										</div>
									</div>
									<div className="col-12">
										<div className="submit-field">
											<h5>{t('Cities')}</h5>
											{this.state?.CitiesList?.length > 0 && (
												<div>
													<select title="All Cities" className="selectpicker select-cities default" multiple data-live-search="true" data-selected-text-format="count" data-size="7" onChange={this.handleChangeCities}>
														{this.renderCities()}
													</select>
												</div>
											)}
											{!this.state?.CitiesList && (
												<div>
													<select disabled placeholder="All Cities" title="All Cities" className="selectpicker select-cities default" data-selected-text-format="count" data-size="7"></select>
												</div>
											)}
										</div>
									</div>
									<div className="col-12">
										<div className="submit-field">
											<h5>{t('Services')}</h5>
											{this.state?.ServiceList?.length > 0 && (
											<select title="All Services" className="selectpicker select-services default" data-live-search="true" multiple data-selected-text-format="count" data-size="7" onChange={this.handleChangeService}>
												{this.renderServices()}
											</select>
											)}
										</div>
									</div>
									<div className="col-12">
										<div className="submit-field">
											<h5>{t('Status')}</h5>
											{this.state?.ServiceList?.length > 0 && (
											<select title="All Status" className="selectpicker select-status default" multiple data-live-search="true" data-selected-text-format="count" data-size="7" onChange={this.handleChangeStatus}>
												{this.renderStatus()}
											</select>
											)}
										</div>
									</div>
									<div className="col-12">
										<div className="submit-field">
											<h5>{t('Created By')} ({this.state?.createdUser?.length})</h5>
											{this.state?.createdUser?.length > 0 && (
											<select title="All CanU" className="selectpicker select-createdBy default" multiple data-live-search="true" data-selected-text-format="count" data-size="7" onChange={this.handleChangeCreatedBy}>
												{this.renderCreatedUserList()}
											</select>
											)}
										</div>
									</div>
									<div className="col-12">
										<div className="submit-field">
											<h5>{t('Pickup By')} ({this.state?.pickupUser?.length})</h5>
											{this.state?.pickupUser?.length > 0 && (
											<select title="All Pickup CanI" className="selectpicker select-pickupCani default" multiple data-live-search="true" data-selected-text-format="count" data-size="7" onChange={this.handleChangePickupBy}>
												{this.renderPickupUserList()}
											</select>
											)}
										</div>
									</div>
									<div className="col-12">
										<div className="submit-field">
											<h5>{t('Requested By')} ({this.state?.requestedUser?.length})</h5>
											{this.state?.requestedUser?.length > 0 && (
											<select title="All Requested CanI" className="selectpicker select-requestedCani default" multiple data-live-search="true" data-selected-text-format="count" data-size="7" onChange={this.handleChangeRequestedBy}>
												{this.renderRequestedUserList()}
											</select>
											)}
										</div>
									</div>
								</div>
							</div>
							<div className="jobs-filter-footer">
								<div className="jobs-filter-btnFilter">
									<button className="button align-center button-sliding-icon ripple-effect " onClick={this.handleClickOnBtnReset} >{t('Reset')}<i className="icon-material-outline-arrow-right-alt"></i></button>
									<button className="button align-center button-sliding-icon ripple-effect " onClick={this.handleClickOnBtnSearch} >{t('Filter')}<i className="icon-material-outline-arrow-right-alt"></i></button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</>
		);
	}
};
export default withTranslation()(
	connect(
		mapStateToProps,
	)(FilterJobs)
);
