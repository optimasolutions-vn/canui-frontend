import React from 'react';
import langConst from '../../../libs/lang';
import Loader from '../../../components/effects/Loader';
import {
	getOptionPageHowToUse,
	setOptionPageHowToUse
} from '../../../services/optionsPagesServices';
import {Link} from 'react-router-dom';
import UrlPath from '../../../libs/UrlPath';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import './style.scss';
import {ScriptTabs} from '../Scripts/ScriptTabs';
import {Languages, MaxSizeUpload} from '../../../helpers/DataAccess';
import { EditorState, convertToRaw, convertFromRaw, convertFromRawToDraftState} from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
const maxSize = MaxSizeUpload;
const _list = Languages;
const _titlePage = 'How To Use Page Config';
function createMarkup(content){
	return{__html: content};
}
class CmsHowToUse extends React.Component {
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
		//googleMap();
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
	handleChangeField = (e) => {
		e.preventDefault();
		let _new = [];
		let _currentState = this.state;
		let _val = e.target.value;
		let _preLocale = e.target?.name.split('_');
		_preLocale = _preLocale[_preLocale.length - 1];
		if(_list.indexOf(_preLocale.toLowerCase()) > -1){
			_new[`${_preLocale}`] = _currentState[`${_preLocale}`];
			_currentState[`${_preLocale}`][`${e.target?.name.replace(`_${_preLocale}`, '')}`] = _val;
		}else{
			_currentState[`${e.target?.name}`] = e.target.value.trim();
		}
		this.setState({
			_currentState
		});
		
	};
	calcState = (value) => {
		return value
	    ? EditorState.createWithContent(convertFromRaw(value))
	    : EditorState.createEmpty();
	};
	getOption = () => {
		this.setState({
			isLoading: true
		}, async () => {
			let _res = await getOptionPageHowToUse();
			if(_res.status){
				if(_res?.data[0]?.value){
					let _obj = {};
					_obj['banner_url'] = _res.data[0].value?.banner_url || '';
					_list.map(x => {
						_obj[`${x.toLowerCase()}`] = _res.data[0].value[`${x.toLowerCase()}`];
						_obj[`contentState${x}`] = this.calcState(_res.data[0].value[`${x.toLowerCase()}`]?.content);
					});
					this.setState(_obj);
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
			_obj[`${x.toLowerCase()}`] = {
				...this.state[`${x.toLowerCase()}`],
				content: this.state[`contentState${x}`] ? convertToRaw(this.state[`contentState${x}`].getCurrentContent()) : ''
			};
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
		/*if(this.state.banner_file){
			let formData = new FormData();
      		formData.append('BannerImagesPrivacy', this.state.banner_file);
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
					banner_url: _resImage.data.BannerImagesPrivacy[0].url,
					banner_file: false,
				});
			}
		}*/
		let _data = this.prepareDataBeforeCallApi();
		let _res;
		try{
			_res = await setOptionPageHowToUse({objectValue: _data});
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
	
	renderError = () => {
		return this.state.errorMes.map(x => {
			return(
				<p>{x}</p>
			)
		});
	}
	renderContentTabs = () => {
		const { t } = this.props;
		let _i = 0;
		let _state = this.state;
		return _list.map(x => {
			return (
				<div className={`tab ${_list.indexOf(x) === 0 ? 'active': ''}`} data-tab-id={`${_list.indexOf(x)}`}>
					<div className="row">
						<div className="col-12">
							<div className="submit-field">
								<h5>{t('Content')}</h5>
								<Editor
							        editorState={_state[`contentState${x}`]}
							        wrapperClassName="wrapperClassName"
							        editorClassName="editorClassName"
							        onEditorStateChange={editorState => this.onContentStateChange(`${x}`, editorState)}
							      />
							</div>
						</div>
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
								<h3>{_titlePage}</h3>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-12">
							<form ref={this.myRef} method="post" id="service-detail-form" onSubmit={this.handleSubmitForm}>

								<div className="tabs">
									<div className="tabs-header">
										<ul>
										{_list.map((x, index) => {
											return(
												<li key={`${index}`} className={index === 0 ? 'active' : ''}><a href="" data-tab-id={index}>{x.toUpperCase()}</a></li>
											);
										})}
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
							{this.state.isLoading && <button disabled className="button full-width button-sliding-icon ripple-effect margin-top-10" type="submit">{t('Updating')}<i className="icon-material-outline-arrow-right-alt"></i></button>}
							{!this.state.isLoading &&
								<button className="button full-width button-sliding-icon ripple-effect margin-top-10" type="submit" onClick={this.handleSubmitForm}>{t('Update')}<i className="icon-material-outline-arrow-right-alt"></i></button>
							}
						</div>
					</div>
				</div>
			</React.Fragment>
		);
	}
};
export default CmsHowToUse;
