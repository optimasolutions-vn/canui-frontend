import React from 'react';
import langConst from '../../../libs/lang';
import Loader from '../../../components/effects/Loader';
import {
	getOptionPageFaq,
	setOptionPageFaq
} from '../../../services/optionsPagesServices';
import CategoriesServices from '../../../services/CategoriesServices';
import {Link} from 'react-router-dom';
import UrlPath from '../../../libs/UrlPath';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import {ScriptTabs} from '../Scripts/ScriptTabs';
import {Languages, MaxSizeUpload} from '../../../helpers/DataAccess';
import BlockInput from './BlockInput';
import './styles.scss';
const maxSize = MaxSizeUpload;
const _list = Languages;
class CmsStaticFAQ extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: {},
			members: [],
			total: 0,
			isLoading: false,
			errorMes: [],
			size: 10,
			page: 1,
			sort: 'userId,desc',
			en:{
				
			},
			vn:{
				
			},
			kr:{
				
			},
			jp:{
				
			},
			cn:{
				
			},
		};
		this.myRef = React.createRef();
	};
	componentDidMount(){
		ScriptTabs();
		this.setupParams();

	};
	componentDidUpdate(prevProps, prevState){
		ScriptTabs();
	};
	onContentStateChange = (_locale, contentState) => {
		let _state = [];
		_state[`contentState${_locale}`] = contentState;
		this.setState({
			..._state
		});
	};
	
	setupParams = () => {
		this.getOption();
	};
	
	getOption = () => {
		this.setState({
			isLoading: true
		}, async () => {
			let _res = await getOptionPageFaq();
			if(_res.status){
				if(_res?.data[0]?.value){
					let _obj = {};
					_obj['banner_url'] = _res.data[0].value?.banner_url || '';
					_list.map(x => {
						_obj[`${x.toLowerCase()}`] = _res.data[0].value[`${x.toLowerCase()}`];
					});
					this.setState({
						..._obj,
						defaultValue: _obj
					});
				}
			}else{
				this.setState({
					errorMes: [_res.message || 'Fail on Request']
				})
			}
			this.setState({
				isLoading: false
			})
		})
		
	};

	prepareDataBeforeCallApi = () => {
		let _obj = {};
		_obj.banner_url = this.state.banner_url;
		_list.map(x => {
			_obj[`${x.toLowerCase()}`] = this.state[`${x.toLowerCase()}`] || '';
		});
		return _obj;
	};

	FailAlert = (_mes, _time) => {
		window.Snackbar.show({
	      text: _mes || "SomeThing are wrong!",
	      pos: 'bottom-center',
	      showAction: false,
	      actionText: "Dismiss",
	      duration: _time || 2000,
	      textColor: '#de5959',
	      backgroundColor: '#ffe9e9'
	    });
	};
	SuccessAlert = (_mes, _time) => {
		window.Snackbar.show({
	      text: _mes || "Content has updated",
	      pos: 'bottom-center',
	      showAction: false,
	      actionText: "Dismiss",
	      duration: _time || 1000,
	      textColor: '#5f9025',
	      backgroundColor: '#EBF6E0'
	    });
	};

	callAPiUpdateProperties = async () => {
		if(this.state.isLoading){
			return false;
		}
		this.setState({
			isLoading: true
		});
		if(this.state.banner_file){
			let formData = new FormData();
      		formData.append('BannerImagesFaq', this.state.banner_file);
			let _resImage;
			try{
				_resImage = await CategoriesServices.uploadImage(formData);
			}catch(err){
				this.setState({
					isLoading: false
				})
				this.FailAlert('Fail on Upload Image');
			    return;
			}
			
			if(_resImage?.status && _resImage?.data){
				this.setState({
					banner_url: _resImage.data.BannerImagesFaq[0].url,
					banner_file: false,
				});
			}
		}
		let _data = this.prepareDataBeforeCallApi();
		let _res;
		try{
			_res = await setOptionPageFaq({objectValue: _data});
		}catch(err){
			this.FailAlert(_res?.message || 'Fail on NetWork');
			return;
		}
		
		if(_res.status){
			this.SuccessAlert();
		}
		this.setState({
			isLoading: false
		})
	};

	handleSubmitForm = (e) => {
		e.preventDefault();
		this.callAPiUpdateProperties();
	}

	handleChangeBanner = (e) => {
		let _mes = `Banner size must less than 2mb`;
		let _arrayErrors = this.state.errorMes;
		let _file = e.target.files[0];
		let reader = new FileReader();
		if(_arrayErrors.indexOf(_mes) > -1){
			_arrayErrors.splice(_arrayErrors.indexOf(_mes), 1);
		}
		if(_file.size > maxSize){
			if(_arrayErrors?.indexOf(_mes) === -1){
				_arrayErrors.push(_mes);
				this.setState({
					errorMes : _arrayErrors
				})
				this.FailAlert(_mes, 2000);
			};
			console.log(_arrayErrors);
			return false;
		}
		reader.readAsDataURL(_file);
		reader.onload = () => {
			if(_arrayErrors.indexOf(_mes) > -1){
				_arrayErrors.splice(_arrayErrors.indexOf(_mes), 1);
			}
			this.setState({
				banner: reader.result,
				banner_file: _file,
				errorMes: _arrayErrors
			})
		};
		reader.onerror = function (error) {
			_arrayErrors.push(error);
			this.setState({
				...this.state.errorMes,
				errorMes: _arrayErrors
			});
		};
	}
	
	renderError = () => {
		return this.state.errorMes.map(x => {
			return(
				<p>{x}</p>
			)
		});
	}
	dataCallBack = (_x, _val) => {
		let _key = _x.toLowerCase();
		this.setState({
			[`${_key}`]: _val
		}, () => {
			console.log(this.state)
		})

	}
	renderContentTabs = () => {
		const { t } = this.props;
		let _i = 0;
		let _state = this.state;
		return _list.map(x => {
			return (
				<div className={`tab ${_list.indexOf(x) === 0 ? 'active': ''}`} data-tab-id={`${_list.indexOf(x)}`}>
					<div className="main-list">
						<BlockInput
							defaultValue={this.state?.defaultValue ? this.state?.defaultValue[`${x.toLowerCase()}`] : false}
							dataCallBack={_val => this.dataCallBack(x, _val)}
						 />
					</div>
				</div>
				);
			});
	}

	render(){
		const { t } = this.props;
		return(
			<React.Fragment>
				{this.state.isLoading && <Loader />}
				<div className='service-detail-admin'>
					<div className="row">
						<div className="col-12">
							<div className='title-page-header'>
								<h3>Faq Config</h3>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-12">
							<form ref={this.myRef} method="post" id="service-detail-form" >
								<div className="row">
									<div className="col-12">
										<div className="submit-field">
											<h5>{t('Banner Image')}</h5>
											<div><img src={this.state.banner || this.state.banner_url} alt={this.state.data.title} /></div>
											<div className="uploadButton">
												<input onChange={this.handleChangeBanner} name="banner_url" className="uploadButton-input" type="file" accept="image/*" id="upload"/>
												<label className="uploadButton-button ripple-effect" htmlFor="upload">Change Banner</label>
											</div>
										</div>
									</div>
								</div>

								<div className="tabs">
									<div className="tabs-header">
										<ul>
											<li className="active"><a href="" data-tab-id="0">EN</a></li>
											<li><a href="" data-tab-id="1">VN</a></li>
											<li><a href="" data-tab-id="2">KR</a></li>
											<li><a href="" data-tab-id="3">JP</a></li>
											<li><a href="" data-tab-id="4">CN</a></li>
										</ul>
										<div className="tab-hover"></div>
										<nav className="tabs-nav">
											<span className="tab-prev"><i className="icon-material-outline-keyboard-arrow-left"></i></span>
											<span className="tab-next"><i className="icon-material-outline-keyboard-arrow-right"></i></span>
										</nav>
									</div>
									<div className="tabs-content">
										{this.renderContentTabs()}
									</div>
								</div>
								
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
							{this.state.isLoading && <button disabled className="button full-width button-sliding-icon ripple-effect margin-top-10" >{t('Updating')}<i className="icon-material-outline-arrow-right-alt"></i></button>}
							{!this.state.isLoading &&
								<button className="button full-width button-sliding-icon ripple-effect margin-top-10" onClick={this.handleSubmitForm}>{t('Update')}<i className="icon-material-outline-arrow-right-alt"></i></button>
							}
						</div>
					</div>
				</div>
			</React.Fragment>
		);
	}
};
export default CmsStaticFAQ;
