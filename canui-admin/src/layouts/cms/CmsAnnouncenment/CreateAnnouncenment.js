import React from 'react';
import langConst from '../../../libs/lang';
import Loader from '../../../components/effects/Loader';
import OtherServices from '../../../services/OtherServices';
import {Link} from 'react-router-dom';
import UrlPath from '../../../libs/UrlPath';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import '../CmsStaticPrivacy/style.scss';
import {ScriptTabs} from '../Scripts/ScriptTabs';
import {Languages, MaxSizeUpload} from '../../../helpers/DataAccess';
import { EditorState, convertToRaw, convertFromRaw, convertFromRawToDraftState} from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import MapGG from '../../../components/cms/googleMap/MapGG';
const maxSize = MaxSizeUpload;
const _list = Languages;
const _titlePage = 'Create Announcenment';
function createMarkup(content){
	return{__html: content};
}
class CmsNewAnnouncenment extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: {},
			members: [],
			total: 0,
			isLoading: false,
			errorMes: [],
			size: 10,
			page: 0,
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
		//this.setupParams();

	};
	componentDidUpdate(prevProps, prevState){
		ScriptTabs();
	};
	onContentStateChange = (_locale, contentState) => {
		let _state = this.state[`${_locale}`];
		_state.content = contentState;
		this.setState({
			[`${_locale}`]: _state
		});
	};
	
	setupParams = () => {
		//this.getOption();
	};
	calcState = (value) => {
		return value
	    ? EditorState.createWithContent(convertFromRaw(value))
	    : EditorState.createEmpty();
	};
	/*getOption = () => {
		this.setState({
			isLoading: true
		}, async () => {
			let _res = await getOptionPageTerms();
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
		
	};*/

	prepareDataBeforeCallApi = () => {
		let _dataPre = [];
		_list.map(x => {
			if(this.state[`${x.toLowerCase()}`] && this.state[`${x.toLowerCase()}`]?.title?.length > 0 && this.state[`${x.toLowerCase()}`]?.content){
				console.log(draftToHtml(convertToRaw(this.state[`${x.toLowerCase()}`]?.content.getCurrentContent())));
				_dataPre.push({
					title: this.state[`${x.toLowerCase()}`]?.title || '',
					content: this.state[`${x.toLowerCase()}`]?.content ? JSON.stringify(convertToRaw(this.state[`${x.toLowerCase()}`]?.content.getCurrentContent())) : '',
					locale: `${x.toLowerCase()}`,
				});
			}
		});
		//console.log(_dataPre);
		return _dataPre;
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

	callAPiUpdate = () => {
		if(this.isLoading){
			return false;
		}
		this.isLoading = true;
		
		let _data = this.prepareDataBeforeCallApi() || [];
		let _requestList = [];
		this.isLoading = false;
		if(_data.length > 0){
			_data.map(x => {
				_requestList.push(OtherServices.UpdatePost(x));
			})
			Promise.all([..._requestList])
				.then(res => {
					console.log(res);
					this.SuccessAlert('', 3000);
					this.isLoading = false;
					let _n = [];
					_list.map(x => {
						_n[`${x.toLowerCase()}`] = {};
					})
					this.setState({..._n});
					this.props.history.push(`${UrlPath.CmsPath.CmsAnnouncenment}`)
				})
				.catch(err => {
					console.log(err);
					this.FailAlert(err?.message || err || 'Fail on NetWork');
					this.isLoading = false;
				})
		}else{
			this.FailAlert('Please input content', 3000);
			this.isLoading = false;
		}
	};

	onChangeTitle = (_x, e) => {
		e.preventDefault();
		let _obj = this.state[_x.toLowerCase()];
		_obj.title = e.target.value;
		this.setState({
			[`${_x.toLowerCase()}`]: _obj
		})
	}

	handleSubmitForm = (e) => {
		e.preventDefault();
		this.callAPiUpdate();
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
								<h5>{t('Title')}</h5>
								<input className='with-border' defaultValue='' type="text" name={`title_${x.toLowerCase()}`} placeHolder='' onChange={e => this.onChangeTitle(`${x.toLowerCase()}`, e)} />
							</div>
							<div className="submit-field">
								<h5>{t('Content')}</h5>
								<Editor
							        wrapperClassName="wrapperClassName"
							        editorClassName="editorClassName"
							        onEditorStateChange={editorState => this.onContentStateChange(`${x.toLowerCase()}`, editorState)}
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
				{this.isLoading && <Loader />}
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
													<li key={`${x}${index}`} className={index === 0 ? 'active' : ''} ><a href="" data-tab-id={index}>{x}</a></li>
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
							{this.state.isLoading && <button disabled className="button full-width button-sliding-icon ripple-effect margin-top-10" type="submit">{t('Creating')}<i className="icon-material-outline-arrow-right-alt"></i></button>}
							{!this.state.isLoading &&
								<button className="button full-width button-sliding-icon ripple-effect margin-top-10" type="submit" onClick={this.handleSubmitForm}>{t('Create')}<i className="icon-material-outline-arrow-right-alt"></i></button>
							}
						</div>
					</div>
				</div>
			</React.Fragment>
		);
	}
};
export default CmsNewAnnouncenment;
