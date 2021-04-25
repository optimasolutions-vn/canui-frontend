import React from 'react';
import langConst from '../../../libs/lang';
import Loader from '../../../components/effects/Loader';
import {
	getOptionPageHome,
	setOptionPageHome
} from '../../../services/optionsPagesServices';
import CategoriesServices from '../../../services/CategoriesServices';
import {Link} from 'react-router-dom';
import UrlPath from '../../../libs/UrlPath';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import './style.scss';
import {ScriptTabs} from '../Scripts/ScriptTabs';
import {Languages, MaxSizeUpload} from '../../../helpers/DataAccess';
import { EditorState, convertToRaw, convertFromRaw, convertFromRawToDraftState} from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
// import draftToHtml from 'draftjs-to-html';
// import htmlToDraft from 'html-to-draftjs';

//const content = {"entityMap":{},"blocks":[{"key":"637gr","text":"Initialized from content state.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}]};
const maxSize = MaxSizeUpload;
class CmsStaticHome extends React.Component {
	constructor(props) {
		super(props);
		//const contentStateEN = convertFromRaw(content);
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
				popular_job_title: '',
				featured_job_title: '',
				featured_cities_title: '',
				hightest_rated_title: ''
			},
			vn:{
				popular_job_title: '',
				featured_job_title: '',
				featured_cities_title: '',
				hightest_rated_title: ''
			},
			kr:{
				popular_job_title: '',
				featured_job_title: '',
				featured_cities_title: '',
				hightest_rated_title: ''
			},
			jp:{
				popular_job_title: '',
				featured_job_title: '',
				featured_cities_title: '',
				hightest_rated_title: ''
			},
			cn:{
				popular_job_title: '',
				featured_job_title: '',
				featured_cities_title: '',
				hightest_rated_title: ''
			},
		};
		this.myRef = React.createRef();
	};
	componentDidMount(){
		ScriptTabs();
		console.log('test');
		this.setupParams();

	};
	componentDidUpdate(prevProps, prevState){
		ScriptTabs();
	};
	onContentStateChangeEN = (contentStateEN) => {
		console.log(contentStateEN.getCurrentContent());
		this.setState({
			contentStateEN: contentStateEN,
		});
	};
	onContentStateChangeVN = (contentStateVN) => {
		this.setState({
			contentStateVN: contentStateVN,
		});
	};
	onContentStateChangeKR = (contentStateKR) => {
		this.setState({
			contentStateKR: contentStateKR,
		});
	};
	onContentStateChangeJP = (contentStateJP) => {
		this.setState({
			contentStateJP: contentStateJP,
		});
	};
	onContentStateChangeCN = (contentStateCN) => {
		this.setState({
			contentStateCN: contentStateCN,
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
		_new[`${_preLocale}`] = _currentState[`${_preLocale}`];
		_currentState[`${_preLocale}`][`${e.target?.name.replace(`_${_preLocale}`, '')}`] = _val;
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
			let _res = await getOptionPageHome();
			if(_res.status){
				if(_res?.data[0]?.value){
					
					this.setState({
						banner_url: _res.data[0].value?.banner_url || '',
						en: _res.data[0].value?.en || {},
						vn: _res.data[0].value?.vn || {},
						kr: _res.data[0].value?.kr || {},
						jp: _res.data[0].value?.jp || {},
						cn: _res.data[0].value?.cn || {},
						contentStateEN: this.calcState(_res.data[0].value?.en?.text_line),
						contentStateVN: this.calcState(_res.data[0].value?.vn?.text_line),
						contentStateKR: this.calcState(_res.data[0].value?.kr?.text_line),
						contentStateJP: this.calcState(_res.data[0].value?.jp?.text_line),
						contentStateCN: this.calcState(_res.data[0].value?.cn?.text_line),
					});
				}
				console.log(_res);
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
		return{
			"banner_url": this.state.banner_url,
			"en": {
				...this.state.en,
				text_line: convertToRaw(this.state.contentStateEN.getCurrentContent()),
			},
			"vn": {
				...this.state.vn,
				text_line: convertToRaw(this.state.contentStateVN.getCurrentContent()),
			},
			"kr": {
				...this.state.kr,
				text_line: convertToRaw(this.state.contentStateKR.getCurrentContent()),
			},
			"jp": {
				...this.state.jp,
				text_line: convertToRaw(this.state.contentStateJP.getCurrentContent()),
			},
			"cn": {
				...this.state.jp,
				text_line: convertToRaw(this.state.contentStateCN.getCurrentContent()),
			},
		}
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
      		formData.append('BannerImages', this.state.banner_file);
			let _resImage = await CategoriesServices.uploadImage(formData);
			console.log(_resImage);
			if(_resImage.status && _resImage.data){
				this.setState({
					banner_url: _resImage.data.BannerImages[0].url,
					banner_file: false,
				});
			}
		}
		let _data = this.prepareDataBeforeCallApi();
		let _res = await setOptionPageHome({objectValue: _data});
		if(_res.status){
			window.Snackbar.show({
		      text: "Content has updated",
		      pos: 'bottom-center',
		      showAction: false,
		      actionText: "Dismiss",
		      duration: 1000,
		      textColor: '#5f9025',
		      backgroundColor: '#EBF6E0'
		    });
		}else{
			window.Snackbar.show({
		      text: "Something wrong!",
		      pos: 'bottom-center',
		      showAction: false,
		      actionText: "Dismiss",
		      duration: 1000,
		      textColor: '#de5959',
		      backgroundColor: '#ffe9e9'
		    });
		}
		console.log(_res);
		this.setState({
			isLoading: false
		})
	};

	handleSubmitForm = (e) => {
		e.preventDefault();
		/*console.log(this.state);
		const rawDraftContentStateEN =JSON.stringify(this.state.contentStateEN);// JSON.stringify( convertToRaw(this.state.editorState.getCurrentContent()) );
		const rawDraftContentStateVN =JSON.stringify(this.state.contentStateVN);// JSON.stringify( convertToRaw(this.state.editorState.getCurrentContent()) );
		const rawDraftContentStateKR =JSON.stringify(this.state.contentStateKR);// JSON.stringify( convertToRaw(this.state.editorState.getCurrentContent()) );
		const rawDraftContentStateJP =JSON.stringify(this.state.contentStateJP);// JSON.stringify( convertToRaw(this.state.editorState.getCurrentContent()) );
		// convert the raw state back to a useable ContentState object
		//const contentState = convertFromRaw( JSON.parse( rawDraftContentStateEN) );
		//this.state.editorState.getCurrentContent()
		console.log(rawDraftContentStateEN);*/
		//console.log(contentState);
		this.callAPiUpdateProperties();
	}

	handleChangeBanner = (e) => {
		let _mes = `Size of banner can not more than 2mb`;
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
			console.log('Error: ', error);
		};
	}
	
	renderError = () => {
		return this.state.errorMes.map(x => {
			return(
				<p>{x}</p>
			)
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
								<h3>Home Page Config</h3>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-12">
							<form ref={this.myRef} method="post" id="service-detail-form" onSubmit={this.handleSubmitForm}>
								<div className="row">
									<div className="col-12">
										<div className="submit-field">
											<h5>{t('Banner Image')}</h5>
											<div><img src={this.state.banner || this.state.banner_url} alt={this.state.data.title} /></div>
											<div className="uploadButton">
												<input onChange={this.handleChangeBanner} name="icon_url" className="uploadButton-input" type="file" accept="image/*" id="upload"/>
												<label className="uploadButton-button ripple-effect" for="upload">Change Banner</label>
											</div>
										</div>
									</div>
								</div>

								<div className="tabs">
									<div className="tabs-header">
										<ul>
											<li className="active"><a href="" data-tab-id="1">EN</a></li>
											<li><a href="" data-tab-id="2">VN</a></li>
											<li><a href="" data-tab-id="3">KR</a></li>
											<li><a href="" data-tab-id="4">JP</a></li>
											<li><a href="" data-tab-id="5">CN</a></li>
										</ul>
										<div className="tab-hover"></div>
										<nav className="tabs-nav">
											<span className="tab-prev"><i className="icon-material-outline-keyboard-arrow-left"></i></span>
											<span className="tab-next"><i className="icon-material-outline-keyboard-arrow-right"></i></span>
										</nav>
									</div>
									<div className="tabs-content">
										<div className="tab active" data-tab-id="1">
											<div className="row">
												<div className="col-12">
													<div className="submit-field">
														<h5>{t('Text line')}</h5>
														{this.state.contentStateEN && (
														<Editor
															editorState={this.state.contentStateEN}
													        wrapperClassName="wrapperClassName"
													        editorClassName="editorClassName"
													        onEditorStateChange={this.onContentStateChangeEN}
													        toolbar={{
														      options: ['inline', 'fontSize'],
														      inline: {
														        options: ['bold', 'italic', 'underline', 'strikethrough'],
														        bold: { className: 'bordered-option-classname' },
														        italic: { className: 'bordered-option-classname' },
														        underline: { className: 'bordered-option-classname' },
														        strikethrough: { className: 'bordered-option-classname' },
														      },
														      fontSize: {
														        className: 'bordered-option-classname',
														      },
														    }}
													      />
													    )}
													</div>
												</div>
												<div className="col-12">
													<div className="submit-field">
														<h5>{t('Popular Job Categories title')}</h5>
														<input title={t('Popular Job Categories')} name="popular_job_title_en" onChange={this.handleChangeField} value={this.state.en.popular_job_title} type="text"  className="input-text with-border" autoComplete="new-field" placeholder={t('Popular Job Categories')}/>
													</div>
												</div>
												<div className="col-12">
													<div className="submit-field">
														<h5>{t('Featured Jobs title')}</h5>
														<input title={t('Featured Jobs')} name="featured_job_title_en" onChange={this.handleChangeField} value={this.state.en.featured_job_title} type="text"  className="input-text with-border" autoComplete="new-field" placeholder={t('Featured Jobs')}/>
													</div>
												</div>
												<div className="col-12">
													<div className="submit-field">
														<h5>{t('Featured Cities title')}</h5>
														<input title={t('Featured Cities Title')} name="featured_cities_title_en" onChange={this.handleChangeField} value={this.state.en.featured_cities_title} type="text"  className="input-text with-border" autoComplete="new-field" placeholder={t('Featured Cities Title')}/>
													</div>
												</div>
												<div className="col-12">
													<div className="submit-field">
														<h5>{t('Highest Rated Freelancers title')}</h5>
														<input title={t('Highest Rated Freelancers')} name="hightest_rated_title_en" onChange={this.handleChangeField} value={this.state.en.hightest_rated_title} type="text"  className="input-text with-border" autoComplete="new-field" placeholder={t('Highest Rated Freelancers')}/>
													</div>
												</div>
											</div>

										</div>
										<div className="tab" data-tab-id="2">
											<div className="row">
												<div className="col-12">
													<div className="submit-field">
														<h5>{t('Text line')}</h5>
														<Editor
													        editorState={this.state.contentStateVN}
													        wrapperClassName="wrapperClassName"
													        editorClassName="editorClassName"
													        onEditorStateChange={this.onContentStateChangeVN}
													        toolbar={{
														      options: ['inline', 'fontSize'],
														      inline: {
														        options: ['bold', 'italic', 'underline', 'strikethrough'],
														        bold: { className: 'bordered-option-classname' },
														        italic: { className: 'bordered-option-classname' },
														        underline: { className: 'bordered-option-classname' },
														        strikethrough: { className: 'bordered-option-classname' },
														      },
														      fontSize: {
														        className: 'bordered-option-classname',
														      },
														    }}
													      />
													</div>
												</div>
												<div className="col-12">
													<div className="submit-field">
														<h5>{t('Popular Job Categories title')}</h5>
														<input title={t('Popular Job Categories')} name="popular_job_title_vn" onChange={this.handleChangeField} value={this.state.vn.popular_job_title} type="text"  className="input-text with-border" autoComplete="new-field" placeholder={t('Popular Job Categories')}/>
													</div>
												</div>
												<div className="col-12">
													<div className="submit-field">
														<h5>{t('Featured Jobs title')}</h5>
														<input title={t('Featured Jobs')} name="featured_job_title_vn" onChange={this.handleChangeField} value={this.state.vn.featured_job_title} type="text"  className="input-text with-border" autoComplete="new-field" placeholder={t('Featured Jobs')}/>
													</div>
												</div>
												<div className="col-12">
													<div className="submit-field">
														<h5>{t('Featured Cities title')}</h5>
														<input title={t('Featured Cities Title')} name="featured_cities_title_vn" onChange={this.handleChangeField} value={this.state.vn.featured_cities_title} type="text"  className="input-text with-border" autoComplete="new-field" placeholder={t('Featured Cities Title')}/>
													</div>
												</div>
												<div className="col-12">
													<div className="submit-field">
														<h5>{t('Highest Rated Freelancers title')}</h5>
														<input title={t('Highest Rated Freelancers')} name="hightest_rated_title_vn" onChange={this.handleChangeField} value={this.state.vn.hightest_rated_title} type="text"  className="input-text with-border" autoComplete="new-field" placeholder={t('Highest Rated Freelancers')}/>
													</div>
												</div>
											</div>
										</div>
										<div className="tab" data-tab-id="3">
											<div className="row">
												<div className="col-12">
													<div className="submit-field">
														<h5>{t('Text line')}</h5>
														<Editor
													        editorState={this.state.contentStateKR}
													        wrapperClassName="wrapperClassName"
													        editorClassName="editorClassName"
													        onEditorStateChange={this.onContentStateChangeKR}
													        toolbar={{
														      options: ['inline', 'fontSize'],
														      inline: {
														        options: ['bold', 'italic', 'underline', 'strikethrough'],
														        bold: { className: 'bordered-option-classname' },
														        italic: { className: 'bordered-option-classname' },
														        underline: { className: 'bordered-option-classname' },
														        strikethrough: { className: 'bordered-option-classname' },
														      },
														      fontSize: {
														        className: 'bordered-option-classname',
														      },
														    }}
													      />
													</div>
												</div>
												<div className="col-12">
													<div className="submit-field">
														<h5>{t('Popular Job Categories title')}</h5>
														<input title={t('Popular Job Categories')} name="popular_job_title_kr" onChange={this.handleChangeField} value={this.state.kr.popular_job_title} type="text"  className="input-text with-border" autoComplete="new-field" placeholder={t('Popular Job Categories')}/>
													</div>
												</div>
												<div className="col-12">
													<div className="submit-field">
														<h5>{t('Featured Jobs title')}</h5>
														<input title={t('Featured Jobs')} name="featured_job_title_kr" onChange={this.handleChangeField} value={this.state.kr.featured_job_title} type="text"  className="input-text with-border" autoComplete="new-field" placeholder={t('Featured Jobs')}/>
													</div>
												</div>
												<div className="col-12">
													<div className="submit-field">
														<h5>{t('Featured Cities title')}</h5>
														<input title={t('Featured Cities Title')} name="featured_cities_title_kr" onChange={this.handleChangeField} value={this.state.kr.featured_cities_title} type="text"  className="input-text with-border" autoComplete="new-field" placeholder={t('Featured Cities Title')}/>
													</div>
												</div>
												<div className="col-12">
													<div className="submit-field">
														<h5>{t('Highest Rated Freelancers title')}</h5>
														<input title={t('Highest Rated Freelancers')} name="hightest_rated_title_kr" onChange={this.handleChangeField} value={this.state.kr.hightest_rated_title} type="text"  className="input-text with-border" autoComplete="new-field" placeholder={t('Highest Rated Freelancers')}/>
													</div>
												</div>
											</div>
										</div>
										<div className="tab" data-tab-id="4">
											<div className="row">
												<div className="col-12">
													<div className="submit-field">
														<h5>{t('Text line')}</h5>
														<Editor
													        editorState={this.state.contentStateJP}
													        wrapperClassName="wrapperClassName"
													        editorClassName="editorClassName"
													        onEditorStateChange={this.onContentStateChangeJP}
													        toolbar={{
														      options: ['inline', 'fontSize'],
														      inline: {
														        options: ['bold', 'italic', 'underline', 'strikethrough'],
														        bold: { className: 'bordered-option-classname' },
														        italic: { className: 'bordered-option-classname' },
														        underline: { className: 'bordered-option-classname' },
														        strikethrough: { className: 'bordered-option-classname' },
														      },
														      fontSize: {
														        className: 'bordered-option-classname',
														      },
														    }}
													      />
													</div>
												</div>
												<div className="col-12">
													<div className="submit-field">
														<h5>{t('Popular Job Categories title')}</h5>
														<input title={t('Popular Job Categories')} name="popular_job_title_jp" onChange={this.handleChangeField} value={this.state.jp.popular_job_title} type="text"  className="input-text with-border" autoComplete="new-field" placeholder={t('Popular Job Categories')}/>
													</div>
												</div>
												<div className="col-12">
													<div className="submit-field">
														<h5>{t('Featured Jobs title')}</h5>
														<input title={t('Featured Jobs')} name="featured_job_title_jp" onChange={this.handleChangeField} value={this.state.jp.featured_job_title} type="text"  className="input-text with-border" autoComplete="new-field" placeholder={t('Featured Jobs')}/>
													</div>
												</div>
												<div className="col-12">
													<div className="submit-field">
														<h5>{t('Featured Cities title')}</h5>
														<input title={t('Featured Cities Title')} name="featured_cities_title_jp" onChange={this.handleChangeField} value={this.state.jp.featured_cities_title} type="text"  className="input-text with-border" autoComplete="new-field" placeholder={t('Featured Cities Title')}/>
													</div>
												</div>
												<div className="col-12">
													<div className="submit-field">
														<h5>{t('Highest Rated Freelancers title')}</h5>
														<input title={t('Highest Rated Freelancers')} name="hightest_rated_title_jp" onChange={this.handleChangeField} value={this.state.jp.hightest_rated_title} type="text"  className="input-text with-border" autoComplete="new-field" placeholder={t('Highest Rated Freelancers')}/>
													</div>
												</div>
											</div>
										</div>
										<div className="tab" data-tab-id="5">
											<div className="row">
												<div className="col-12">
													<div className="submit-field">
														<h5>{t('Text line')}</h5>
														<Editor
													        editorState={this.state.contentStateCN}
													        wrapperClassName="wrapperClassName"
													        editorClassName="editorClassName"
													        onEditorStateChange={this.onContentStateChangeCN}
													        toolbar={{
														      options: ['inline', 'fontSize'],
														      inline: {
														        options: ['bold', 'italic', 'underline', 'strikethrough'],
														        bold: { className: 'bordered-option-classname' },
														        italic: { className: 'bordered-option-classname' },
														        underline: { className: 'bordered-option-classname' },
														        strikethrough: { className: 'bordered-option-classname' },
														      },
														      fontSize: {
														        className: 'bordered-option-classname',
														      },
														    }}
													      />
													</div>
												</div>
												<div className="col-12">
													<div className="submit-field">
														<h5>{t('Popular Job Categories title')}</h5>
														<input title={t('Popular Job Categories')} name="popular_job_title_cn" onChange={this.handleChangeField} value={this.state.cn.popular_job_title} type="text"  className="input-text with-border" autoComplete="new-field" placeholder={t('Popular Job Categories')}/>
													</div>
												</div>
												<div className="col-12">
													<div className="submit-field">
														<h5>{t('Featured Jobs title')}</h5>
														<input title={t('Featured Jobs')} name="featured_job_title_cn" onChange={this.handleChangeField} value={this.state.cn.featured_job_title} type="text"  className="input-text with-border" autoComplete="new-field" placeholder={t('Featured Jobs')}/>
													</div>
												</div>
												<div className="col-12">
													<div className="submit-field">
														<h5>{t('Featured Cities title')}</h5>
														<input title={t('Featured Cities Title')} name="featured_cities_title_cn" onChange={this.handleChangeField} value={this.state.cn.featured_cities_title} type="text"  className="input-text with-border" autoComplete="new-field" placeholder={t('Featured Cities Title')}/>
													</div>
												</div>
												<div className="col-12">
													<div className="submit-field">
														<h5>{t('Highest Rated Freelancers title')}</h5>
														<input title={t('Highest Rated Freelancers')} name="hightest_rated_title_cn" onChange={this.handleChangeField} value={this.state.cn.hightest_rated_title} type="text"  className="input-text with-border" autoComplete="new-field" placeholder={t('Highest Rated Freelancers')}/>
													</div>
												</div>
											</div>
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
			</React.Fragment>
		);
	}
};
export default CmsStaticHome;
