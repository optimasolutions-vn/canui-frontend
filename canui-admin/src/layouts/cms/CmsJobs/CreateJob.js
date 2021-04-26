import React from 'react';
import Loader from '../../../components/effects/Loader';
import JobsServices from '../../../services/JobsServices';
import {Link} from 'react-router-dom';
import UrlPath from '../../../libs/UrlPath';
import MessageConst from '../../../libs/MessageConst';
import { Popup, Alert} from '../Scripts/Popup';
import {JobStatus, Currency} from '../../../helpers/DataAccess';
import CategoriesServices from '../../../services/CategoriesServices';
import OtherServices from '../../../services/OtherServices';
import KeyWord from '../../../components/cms/KeywordSuggest/KeyWord';
import {convertNumberToHaveCommas} from '../../../helpers/DataAccess';
import '../Styles/style.scss';
function runScript(){
	window.$('.selectpicker').selectpicker();
}

const _minLengthTitle = 10;
const _maxLengthTitle = 120;
const _minLengthContent = 20;
const _maxLengthContent = 500;
const _keyImageUpload = 'job_image';
const _maxSizeImage = 204800;

class CreateJob extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: {},
			formField: false,
			Detail: false,
			showSuggestion: true
		};
		this.keyWordRef = React.createRef(null);
	};
	componentDidMount(){
		console.log(this.props);
		runScript();
		this.getServices();
		this.getNation();
		this.getCurrency();
	};
	componentDidUpdate(prevProps, prevState){
		runScript();
	};
	getServices = async () => {
		let _res = await CategoriesServices.getCategoriesServices();
		if(_res?.data){
			this.setState({
				ServiceList: _res.data
			})
		}
	}
	getNation = async () => {
		let _res = await OtherServices.getCountry();
		if(_res){
			this.setState({
				NationList: _res
			}, () => {
				window.$('.selectpicker.nation-name').selectpicker('refresh');
			})
		}
	}
	getCityByCountry = async (_country) => {
		let _res = await OtherServices.getCityByCountry({country: _country});
		if(_res){
			this.setState({
				CityByNationList: _res
			}, () => {
				window.$('.selectpicker.city-name').selectpicker('refresh');
			})
		}
	}
	getCurrency = async () => {
		/*let _res = await OtherServices.getCountry();
		if(_res?.data){*/
			this.setState({
				CurrencyList: Currency
			})
		//}
	}
	handleChangeService = (e) => {
		let _n = this.state.formField || {};
		_n.service = [Number(e.target.value)];
		this.setState({
			formField: _n
		})
	}
	handleChangeNation = (e) => {
		let _n = this.state.formField || {};
		_n.nation = e.target.value;
		_n.city = false;
		if(_n?.nation){
			this.getCityByCountry(_n.nation);
		}
		this.setState({
			formField: _n,
			CityByNationList: false
		})	
	}
	handleChangeCity = (e) => {
		let _n = this.state.formField || {};
		_n.city = e.target.value;
		this.setState({
			formField: _n
		})	
	}
	handleChangeCurrency = (e) => {
		let _n = this.state.formField || {};
		_n.currency = e.target.value;
		this.setState({
			formField: _n
		})
	}
	handleChangeInput = (e, _field) => {
		let _n = this.state.formField || {};
		if(_field === 'total'){
			_n[`${_field}`] = convertNumberToHaveCommas(e.target.value);
		}else{
			_n[`${_field}`] = e.target.value;
		}
		this.setState({
			formField : _n
		})
	}
	renderPickupCani = () => {
		return this.state.formField?.pickupCanI.map(x => {
			return(
				<div key={`pickupCani${x.id}`} className="pickupCani-list">
					{x.avatar && (
					<div className='avatar-pickupCani'><img src={x?.avatar} alt={x?.name || ''} /></div>
					)}
					<div className='info-pickupCani'><Link to={`${UrlPath.CmsPath.CmsMembersDetail}/${x?.id}`}>{`(${x.id}) ${x?.name}`}</Link></div>
				</div>
			);
		});
	}
	renderRequestedUser = () => {
		if(!this.state.formField?.requestedUser){
			return null;
		}
		let x = this.state.formField?.requestedUser;
		return(
			<div key={`pickupCani${x.id}`} className="pickupCani-list">
				{x.avatar && (
				<div className='avatar-pickupCani'><img src={x?.avatar} alt={x?.name || ''} /></div>
				)}
				<div className='info-pickupCani'><Link to={`${UrlPath.CmsPath.CmsMembersDetail}/${x?.id}`}>{`(${x.id}) ${x?.name}`}</Link></div>
			</div>
		);
	}
	handleAddKeyWord = (e) => {
		e.preventDefault();
		let _n = this.state.formField || {};
		_n.keyword = _n.keyword || [];
		if(_n?.keyword.indexOf(this.keyWordRef?.current?.value) === -1){
			_n.keyword.push(this.keyWordRef?.current?.value);
			this.setState({
				formField: _n
			})
			this.keyWordRef.current.value = '';
		}
	}
	handleRemoveKeyWord = (e, x) => {
		let _n = this.state.formField;
		if(_n?.keyword?.length > 0){
			let _pos = _n.keyword.indexOf(x);
			if(_pos && _pos > -1){
				_n.keyword.splice(_pos, 1);
			}
		}
		
		this.setState({
			formField: _n
		})
	}
	handleChangeIcon = (e) => {
		let _mes = `Size of Image can not more than ${_maxSizeImage/1024}kb`;
		let _arrayErrors = this.state.errorMes || [];
		let _file = e.target.files[0];
		let reader = new FileReader();
		if(_arrayErrors.indexOf(_mes) > -1){
			_arrayErrors.splice(_arrayErrors.indexOf(_mes), 1);
		}
		if(_file.size > _maxSizeImage){
			if(_arrayErrors?.indexOf(_mes) === -1){
				_arrayErrors.push(_mes)
				this.setState({
					errorMes : _arrayErrors
				})
			};
			return false;
		}
		reader.readAsDataURL(_file);
		reader.onload = () => {
			if(_arrayErrors.indexOf(_mes) > -1){
				_arrayErrors.splice(_arrayErrors.indexOf(_mes), 1);
			}
			this.setState({
				icon: reader.result,
				icon_file: _file,
				errorMes: _arrayErrors
			})
		};
		reader.onerror = function (error) {
			_arrayErrors.push(error);
			this.setState({
				...this.state.errorMes,
				errorMes: _arrayErrors
			});
			console.log('Error: ', error);
		};
	}
	createJob = async (payload) => {
		if(this.state.isLoading){
			return;
		}
		this.setState({
			isLoading: true
		}, async () => {
			let _res = await JobsServices.createJob(payload);
			if(_res?.status){
				Alert({
					title: _res?.message || `${MessageConst.MessStatic.Create_Job_Detail_Success}`,
					status: 'success'
				})
				this.props.history.push({
					pathname: `${UrlPath.CmsPath.CmsJobs}`,
				})
			}else{
				Alert({
					title: _res?.message || `${MessageConst.MessStatic.Create_Job_Detail_Fail}`
				})
			}
			this.setState({
				isLoading: false
			})
		})
	};
	callApiUploadFile = async () => {
		let _res;
		let formData = new FormData();
      	formData.append(`${_keyImageUpload}`, this.state.icon_file);
      	try{
      		_res = await CategoriesServices.uploadImage(formData);
      	}catch(err){
      		console.log(err);
      	}
		
		if(_res.status && _res.data[`${_keyImageUpload}`][0]?.url){
			this.setState({
				icon:  _res.data[`${_keyImageUpload}`][0]?.url || this.state.formField.image,
				icon_file: false,
				formField: {
					...this.state.formField,
					image: _res.data[`${_keyImageUpload}`][0]?.url || this.state.formField.image
				}
			})
			return _res.data[`${_keyImageUpload}`][0]?.url;
		}else{
			Alert({
				title: _res?.message || `${MessageConst.MessStatic.Can_Not_UpLoad_Image}`
			})
			return false;
		}
		console.log(_res);
	};
	validationForm = (_data) => {
		let _errors = [];
		if(!_data?.title){
			_errors.push('Title is required!');
		}else if(_data.title?.length > _maxLengthTitle){
			_errors.push(`Title can not more than ${_maxLengthTitle} characters`);
		}else if(_data.title?.length < _minLengthTitle){
			_errors.push(`Title can not less than ${_minLengthTitle} characters`);
		}
		
		if(!_data?.total){
			_errors.push('Price is required!');
		}
		if(!_data?.currency || _data?.currency?.length === 0){
			_errors.push('Currency is required!');
		}
		if(!_data?.service || _data?.service?.length === 0){
			_errors.push('Service is required!');
		}
		if(!_data?.nation){
			_errors.push('Nation is required!');
		}
		if(!_data?.city){
			_errors.push('City is required!');
		}
		if(!_data?.content){
			_errors.push('Content is required!');
		}else if(_data?.content?.length > _maxLengthContent){
			_errors.push(`Content can not more than ${_maxLengthTitle} characters`);
		}else if(_data?.content?.length < _minLengthContent){
			_errors.push(`Content can not less than ${_minLengthTitle} characters`);
		}
		if(!_data?.keyword || _data?.keyword?.length === 0){
			_errors.push('KeyWords is required!');
		}
		if(!this.state.icon){
			_errors.push('Image is required!');
		}
		if(_errors.length > 0){
			this.setState({
				errorMes: _errors,
				isLoading: false
			});
			return false;
		}else{
			this.setState({
				errorMes: [],
			});
		}
		return true;
	}
	handleSubmitForm = async (e) => {
		e.preventDefault();
		let _n = this.state.formField;
		let _obj = {
			title: _n.title,
			content: _n.content,
			nation: _n.nation,
			city: _n.city,
			keyword: _n.keyword,
			service: _n.service,
			total: _n.total,
			currency: _n.currency
		}
		if(this.validationForm(_obj)){
			_obj.total = _n.total.indexOf(',') > -1 ? _n.total.replace(/\,/g, '') : _n.total;
			let _res = await this.callApiUploadFile();
			if(_res){
				_obj.image = _res;
				this.createJob(_obj);
			}
		}
	}
	renderServices = () => {
		return this.state?.ServiceList.map(x => {
			return <option key={`service-sg-${x.id}`} value={x.id}>{x.title}</option>
		})
	}
	renderNations = () => {
		return this.state?.NationList.map(x => {
			return <option key={`nation-sg-${x.countryId}`} value={x.countryId}>{x.countryName}</option>
		})
	}
	renderCityByNation = () => {
		return this.state?.CityByNationList.map(x => {
			return <option key={`city-sg-${x.id}`} value={x.countryName}>{x.countryName}</option>
		})
	}
	renderCurrency = () => {
		return this.state?.CurrencyList.map(x => {
			return <option key={`currency-sg-${x}`} value={x}>{x}</option>
		})
	}
	renderError = () => {
		return this.state.errorMes.map(x => {
			return(
				<p>{x}</p>
			)
		});
	}
	handleSelectedKeyFromSuggest = (x) => {
		this.keyWordRef.current.value = x;
		this.setState({
			showSuggestion: false
		})
	}
	handleOnChangeKeyWord = (e, x) => {
		e.preventDefault();
		this.setState({
			keyWordRefOnchange: (e.target.value).trim(),
			showSuggestion: true
		})
	}
	renderContentMain = () => {
		const { t } = this.props;
		this.myRef = React.createRef();
		return(
			<div className='service-detail-admin'>
				<div className="row">
					<div className="col-12">
						<div className='title-page-header'>
							<h3>Create Job</h3>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-12">
						<form ref={this.myRef} method="post" id="service-detail-form">
							<div className="row">
								<div className="col-6">
									<div className="submit-field">
										<h5>{t('Title')}</h5>
										<input type="text" className="input-text with-border" name="title" defaultValue={this.state?.formField?.title} onChange={e => this.handleChangeInput(e, 'title')}/>
									</div>
								</div>
								<div className="col-6">
									<div className="submit-field">
										<h5>{t('Image')}</h5>
										{this.state.icon && (
											<div className="img-job-icon"><img src={this.state.icon || this.state.formField.image} alt={this.state.formField.title} /></div>
										)}
										<div className="uploadButton">
											<input onChange={this.handleChangeIcon} className="uploadButton-input" type="file" accept="image/*" id="upload"/>
											<label className="uploadButton-button ripple-effect" for="upload">Upload Image</label>
											<span className="uploadButton-file-name">Images that might be helpful in describing your job</span>
										</div>
									</div>
								</div>
								<div className="col-6">
									<div className="submit-field">
										<h5>{t('Price')}</h5>
										<input type="text" className="input-text with-border" name="price" value={this.state?.formField?.total} onChange={e => this.handleChangeInput(e, 'total')}/>
									</div>
								</div>
								<div className="col-6">
									<div className="submit-field">
										<h5>{t('Currency')}</h5>
										{this.state?.CurrencyList?.length > 0 && (
										<select title="Select Currency" className="selectpicker default" data-selected-text-format="count" data-size="7" onChange={this.handleChangeCurrency}>
											{this.renderCurrency()}
										</select>
										)}
									</div>
								</div>
								<div className="col-6">
									<div className="submit-field">
										<h5>{t('Nation')}</h5>
										{this.state?.NationList?.length > 0 && (
										<select title="Select Nation" className="selectpicker nation-name default" data-selected-text-format="count" data-size="7" onChange={this.handleChangeNation}>
											{this.renderNations()}
										</select>
										)}
									</div>
								</div>
								<div className="col-6">
									<div className="submit-field">
										<h5>{t('City')}</h5>
										{this.state?.CityByNationList?.length > 0 && (
											<div>
												<select title="Select City" className="selectpicker city-name default" data-selected-text-format="count" data-size="7" onChange={this.handleChangeCity}>
													{this.renderCityByNation()}
												</select>
											</div>
										)}
										{!this.state?.CityByNationList && (
											<div>
												<select disabled placeholder="Select City" title="Select City" className="selectpicker city-name default" data-selected-text-format="count" data-size="7"></select>
											</div>
										)}
									</div>
								</div>
								<div className="col-6">
									<div className="submit-field">
										<h5>{t('Service')}</h5>
										{this.state?.ServiceList?.length > 0 && (
										<select title="Select Service" className="selectpicker default" data-selected-text-format="count" data-size="7" onChange={this.handleChangeService}>
											{this.renderServices()}
										</select>
										)}
									</div>
								</div>
								<div className="col-6">
									<div className="submit-field">
										<h5>{t('KeyWords')}</h5>
										<div className="keywords-container">
											<div className="keyword-input-container">
												<input type="text" onChange={this.handleOnChangeKeyWord} ref={this.keyWordRef} className="keyword-input with-border" placeholder="Add Keywords"/>
												<button type="button" onClick={this.handleAddKeyWord} className="keyword-input-button ripple-effect"><i className="icon-material-outline-add"></i></button>
												<KeyWord 
													show={this.state.showSuggestion}
													KeyOnChange={this.state.keyWordRefOnchange}
													SelectedKey={this.handleSelectedKeyFromSuggest}
													 />
											</div>
											<div className="keywords-list">
												{this.state?.formField?.keyword?.map(x => {
													return <span key={x} className="keyword"><span className="keyword-remove" onClick={e => this.handleRemoveKeyWord(e, x)}></span><span className="keyword-text">{x}</span></span>
												})}
											</div>
											<div className="clearfix"></div>
										</div>
									</div>
								</div>
								<div className="col-12">
									<div className="submit-field">
										<h5>{t('Content')}</h5>
										<textarea 
			                                cols="30"
			                                rows="5"
			                                className="with-border"
			                                name="description"
			                                onChange={e => this.handleChangeInput(e, 'content')}
											value={this.state?.formField?.content || ''}
											/>
									</div>
								</div>
							</div>
						</form>
					</div>
					{this.state.errorMes?.length > 0 && (
						<div className="col-12">
							<div className="notification error">{this.renderError()}</div>
						</div>
					)}
					<div className="col-3">
						{this.state.isLoading && <button disabled className="button full-width button-sliding-icon ripple-effect margin-top-10" type="submit">{t('Updating')}<i className="icon-material-outline-arrow-right-alt"></i></button>}
						{!this.state.isLoading &&
							<button className="button full-width button-sliding-icon ripple-effect margin-top-10" type="submit" onClick={this.handleSubmitForm} form="service-detail-form">{t('Create')}<i className="icon-material-outline-arrow-right-alt"></i></button>
						}
					</div>
				</div>
			</div>
		)
	};

	render(){
		return(
			<>
			{this.renderContentMain()}
			{this.state.isLoading && <Loader />}
			</>
		);
	}
};
export default CreateJob;
