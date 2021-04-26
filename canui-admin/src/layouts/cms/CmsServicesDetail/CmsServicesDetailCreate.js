import React from 'react';
import langConst from '../../../libs/lang';
import Loader from '../../../components/effects/Loader';
import CategoriesServices from '../../../services/CategoriesServices';
import {runScript} from './runScript';
import Validation from '../../../helpers/Validation';
import UrlPath from '../../../libs/UrlPath';
import './style.scss';
const _imgBanner = '/images/home-background.jpg';
const maxSize = 102400;

const _listLang = ['EN', 'VN', 'KR', 'JP', 'CN'];
class CmsServicesDetailCreate extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			serviceDetail: {},
			formField: {},
			formDom: false,
			isLoading: false,
			errorMes: [],
			icon_file: false,
			icon: false
		};
		this.myRef = React.createRef();
	};
	componentDidMount(){
		runScript();
	};
	componentDidUpdate(prevProps, prevState){};
	
	getServicesDetail = async () => {
		let _res;
		try{
			_res = await CategoriesServices.getCategoriesServices({slug: this.state.formField.slug});
			if(_res?.data[0]){
				return false;
			}else{
				return true;
			}
		}catch(err){
			return true;
		}
	};

	validationFields = async () => {
		console.log(this.state);

		let _vl = {
				slug: ['required']
			};
		_listLang.map(x => {
			_vl[`title${x.toLowerCase() === 'en' ? '' : '_'+x.toLowerCase()}`] = ['required'];
			_vl[`description${x.toLowerCase() === 'en' ? '' : '_'+x.toLowerCase()}`] = ['required'];
		});
		let _arrayErrors = [];
		let _thisForm = [];
		if(this.state.formDom){
			_thisForm = this.state.formDom;
		}
		for(const [k, v] of Object.entries(_vl)){
			for(const [k1, v1] of Object.entries(this.myRef.current)){
				if(v1.name === k){
					_thisForm[k] = v1;
				}
			}
			for(let i in v){
				switch(v[i]){
					case 'required':
						if(!this.state.formField[k] || this.state.formField[k].length <= 0){
							_arrayErrors.push(`${_thisForm[k].title} is required`);
						}
						break;
					default:
						break;
				}
			}
		}
		if(!this.state.icon && !this.state.formField.icon_url){
			_arrayErrors.push('icon is required');
		}
		this.setState({
			formDom: _thisForm,
			errorMes: _arrayErrors
		});
		if(_arrayErrors?.length > 0){
			this.setState({
				isLoading: false
			})
			return false;
		}
		if(this.state?.formField?.slug){
			let _slugUnique = await this.getServicesDetail();
			if(!_slugUnique){
				this.setState({
					isLoading: false,
					errorMes: [`This Slug is Exit, please change it!`]
				})
				return false;
			}
		}
		return true;
	};
	handleSubmitForm =  (e) => {
		e.preventDefault();
		if(this.state.isLoading){
			return false;
		}
		this.setState({
			isLoading: true,
			errorMes: [],
		}, async () => {
			let _validation = await this.validationFields();
			if(_validation){
				if(this.state.icon){
					this.callApiUploadFile();
				}else{
					this.callApiUpdateService();
				}	
			}
		})
	};
	callApiUploadFile = async () => {
		let formData = new FormData();
      	formData.append('servicesIcons', this.state.icon_file);
		let _res = await CategoriesServices.uploadImage(formData);
		if(_res.status && _res.data?.servicesIcons[0]?.url){
			this.setState({
				icon: false,
				icon_file: false,
				formField: {
					...this.state.formField,
					icon_url: _res.data?.servicesIcons[0]?.url || this.state.formField.icon_url
				}
			}, () => {
				this.callApiUpdateService();
			})
		}
		console.log(_res);
	};
	callApiUpdateService = async () => {
		console.log(this.state.formField);
		let _res = await CategoriesServices.updateCategoriesServices(this.state.formField);
		if(_res.status){
			this.setState({
				isLoading: false,
				errorMes: [],
				icon: false,
				UpdateSuccess: true
			}, () => {
				this.props.history.push({
					pathname: `${UrlPath.CmsPath.CmsServices}/${_res?.data[0]?.slug || this.state.formField.slug}`,
					search: '',
					state: {}
				})
			})
		}else{
			this.setState({
				isLoading: false,
				errorMes: [_res.message || 'update fail'],
				UpdateSuccess: false
			})
		}
	};
	handleChangeSlug = (e) => {
		e.preventDefault();
		let _newValue = Validation.convertSlug(e.target.value);
		console.log(_newValue);
		this.setState({
			formField: {
				...this.state.formField,
				slug: _newValue,
			}
		})
	}
	handleChangeField = (e) => {
		e.preventDefault();
		if(!e?.target?.name){
			return;
		}
		let newObject = this.state.formField;
		let _fieldName = [];
		_fieldName[`${e.target.name}`] = `${e.target.value}`;
		newObject = Object.assign(newObject, _fieldName);
		this.setState({
			formField: newObject
		})
	}
	handleChangeIcon = (e) => {
		let _mes = `size of icon can not more than 100kb`;
		let _arrayErrors = this.state.errorMes;
		let _file = e.target.files[0];
		let reader = new FileReader();
		if(_arrayErrors.indexOf(_mes) > -1){
			_arrayErrors.splice(_arrayErrors.indexOf(_mes), 1);
		}
		if(_file.size > maxSize){
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

	};
	renderError = () => {
		return this.state.errorMes.map(x => {
			return(
				<p>{x}</p>
			)
		});
	}
	renderContentTabsWithLangs = () => {
		const { t } = this.props;
		let _i = 0;
		let _state = this.state;
		return (
			<div className="tabs">
				<div className="tabs-header">
					<ul>
						{_listLang.map(x => {
							return (
								<li className={`${_listLang.indexOf(x) === 0 ? 'active': ''}`}>
									<a href="#" data-tab-id={`${_listLang.indexOf(x)}`}>{x}</a>
								</li>
							)
						})}
					</ul>
					<div className="tab-hover"></div>
					<nav className="tabs-nav">
						<span className="tab-prev"><i className="icon-material-outline-keyboard-arrow-left"></i></span>
						<span className="tab-next"><i className="icon-material-outline-keyboard-arrow-right"></i></span>
					</nav>
				</div>
				<div className="tabs-content">
					{_listLang.map(x => {
						return (
							<div className={`tab ${_listLang.indexOf(x) === 0 ? 'active': ''}`} data-tab-id={`${_listLang.indexOf(x)}`}>
								<div className="row">
									<div className="col-12">
										<div className="submit-field">
											<h5>{t('Title')}</h5>
											<input title={t(`Title ${x}`)} name={`title${x.toLowerCase() === 'en' ? '' : `_${x.toLowerCase()}`}`} onChange={this.handleChangeField} type="text" value={x.toLowerCase() === 'en' ? _state.formField.title : _state.formField[`title_${x.toLowerCase()}`]} defaultValue={x.toLowerCase() === 'en' ? _state.formField.title : _state.formField[`title_${x.toLowerCase()}`]} className="input-text with-border" autoComplete="new-field" placeholder={t('title')}/>
										</div>
									</div>
									<div className="col-12">
										<div className="submit-field">
											<h5>{t('Description')}</h5>
											<textarea title={t(`Description ${x}`)} name={`description${x.toLowerCase() === 'en' ? '' : `_${x.toLowerCase()}`}`} onChange={this.handleChangeField} cols="30" rows="5" className="with-border" value={x.toLowerCase() === 'en' ? _state.formField.description : _state.formField[`description_${x.toLowerCase()}`]} defaultValue={x.toLowerCase() === 'en' ? _state.formField.description : _state.formField[`description_${x.toLowerCase()}`]}  placeholder={t('description')} />
										</div>
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		);
	}
	render(){
		const { t } = this.props;
		return(
			<div className='service-detail-admin'>
				<div className="row">
					<div className="col-12">
						<div className='title-page-header'>
							<h3>Create New Service Detail</h3>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-12">
						<form ref={this.myRef} method="post" id="service-detail-form" onSubmit={this.handleSubmitForm}>
							<div className="row">
								<div className="col-12">
									<div className="submit-field">
										<h5>{t('Slug')} (This field will be diplay on url, please make sure only input with English)</h5>
										<input title={t('Slug')} name="slug" onChange={this.handleChangeSlug} type="text" value={this.state.formField.slug} defaultValue={this.state.serviceDetail.slug} className="input-text with-border" autoComplete="new-field" placeholder={t('slug')}/>
									</div>
								</div>
								<div className="col-12">
									<div className="submit-field">
										<h5>{t('Icon default')}</h5>
										<div className='icon-detail'>
											<div><img src={this.state.icon || this.state.serviceDetail.icon_url} alt={this.state.serviceDetail.title} /></div>
											<div className="uploadButton">
												<input onChange={this.handleChangeIcon} name="icon_url" className="uploadButton-input" type="file" accept="image/*" id="upload"/>
												<label className="uploadButton-button ripple-effect" for="upload">Change Icon</label>
											</div>
										</div>
									</div>
								</div>
							</div>
							{this.renderContentTabsWithLangs()}
						</form>
					</div>
					{this.state.errorMes?.length > 0 && (
						<div className="col-12">
							<div className="notification error">{this.renderError()}</div>
						</div>
					)}
					{this.state.UpdateSuccess && (
						<div className="col-12">
							<div className="notification success">{t('Update Success')}</div>
						</div>
					)}
					<div className="col-3">
						{this.state.isLoading && <button disabled className="button full-width button-sliding-icon ripple-effect margin-top-10" type="submit">{t('Updating')}<i className="icon-material-outline-arrow-right-alt"></i></button>}
						{!this.state.isLoading &&
							<button className="button full-width button-sliding-icon ripple-effect margin-top-10" type="submit" form="service-detail-form">{t('Update')}<i className="icon-material-outline-arrow-right-alt"></i></button>
						}
					</div>
				</div>
			</div>
		);
	}
};
export default CmsServicesDetailCreate;
