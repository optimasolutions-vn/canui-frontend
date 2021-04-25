import React from 'react';
import { connect } from 'react-redux';
import PostDataCountries from '../../helpers/PostDataCountries';
import SelectPicker from "../../components/SelectPicker";
import Loader from '../../components/effects/Loader';
import KeyWord from '../../components/KeywordSuggest/KeyWord';
import {Currency, convertNumberToHaveCommas, getCitiesList, getNationList} from '../../helpers/DataAccess';
import {Alert} from '../Scripts/ManualScript';
import runScript from './runScript';
import {
	actionGetJobDetail,
	actionPostJob
} from '../../actions/actionJob';
import {
	uploadImage
} from '../../services/userService';
import './style.scss'
const mapStateToProps = state => ({
	user: state.user,
	job: state.job,
	siteData: state.siteData
});

const mapDispatchToProps = dispatch => ({
	onLoad: params => dispatch(actionGetJobDetail(params)),
	onPostJob: params => dispatch(actionPostJob(params)),
});
const $ = window.$;
const _minLengthTitle = 10;
const _maxLengthTitle = 120;
const _minLengthContent = 20;
const _maxLengthContent = 500;
class JobPost extends React.Component {
	constructor(props) {
		super(props);
    let country = getNationList();
    let city = getCitiesList(country[0].countryId);
		this.state = {
			country: country,
			city: city,
			national: country[0].countryId,
			area: city[0].countryName,
			service: '',
			errorMessage: [],
			description: '',
			price: 0,
			currency: 'USD',
			title: '',
			JobPosting: false,
			image: '',
			isLoadingPage: false,
			currencyList: Currency,
		};
		this.keyWordRef = React.createRef(null);
	};
	async componentDidMount(){
		runScript();
		$('.selectpicker').selectpicker();
	};
	componentDidUpdate(prevProps, prevState){
		if (prevProps.job.isPosting && !this.props.job.isPosting) {
			if (this.props.job.errorMessage) {
				Alert({
					title: this.props.job.errorMessage
				});
				this.setState({
					errorMessage: [this.props.job.errorMessage],
					JobPosting: false
				})
			} else {
				$('#btn-confirm').click()
			}
		}
		if (this.props.siteData.categories.length > 0 && !prevState.service) {
			this.setState({
				service: Number(this.props.siteData.categories[0].id)
			})
		}
	};
	handleChangeInput = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		})
	};
	handleChangePrice = (e) => {
		this.setState({
			[e.target.name]: convertNumberToHaveCommas(e.target.value)
		})
	}
	handleSendRequest = async (e) => {
		e.preventDefault();
		if(this.state.isLoadingPage){
			return;
		}
		let {t, onPostJob} = this.props;
		let {
			service,
			national,
			description,
			price,
			currency,
			title,
			area,
			imageFile,
			image,
		} = this.state;
		let errorMessage = [];
		if(!price || price === 0){
			errorMessage.push(t('Please input price'))
		}
		if (!service) {
			errorMessage.push(t('Please select service category'))
		}
		if (!national) {
			errorMessage.push(t('Please select your country'))
		}
		if (!area) {
			errorMessage.push(t('Please select a region'))
		}
		if (description.length < _minLengthContent || description.length > _maxLengthContent) {
			errorMessage.push(t(`Content from ${_minLengthContent} to ${_maxLengthContent} character`))
		}
		if (title.length < _minLengthTitle || title.length > _maxLengthTitle) {
			errorMessage.push(t(`Title from ${_minLengthTitle} to ${_maxLengthTitle} character`))
		}
		if (errorMessage.length > 0) {
			this.setState({
				errorMessage
			});
			return;
		}
		this.setState({
			isLoadingPage: true
		}, async () => {
			if (image) {
				const formData = new FormData();
				formData.append('job_image', imageFile);
				let res = await uploadImage(formData);
				if (res.status) {
					console.log(res.data);
					image = res.data.job_image[0].url;
				} else {
					this.setState({
						errorMessage: [t("Can not change avatar")],
						isLoading: false
					})
					return
				}
			}
			this.setState({
				isLoadingPage: false
			})
			if (errorMessage.length > 0) {
				this.setState({
					errorMessage
				});
				return;
			}
			let tag = [];
			let keyword = $('.keywords-list').find('.keyword-text')
			$(keyword).each(function (idx) {
				tag.push($(this).text());
			});
			this.setState({
				errorMessage: []
			});
			this.setState({
				JobPosting: true
			})
			onPostJob({
				"nation" : national,
				"city" : area,
				"service" : [Number(service)],
				"content" : description,
				"keyword" : tag,
				total: price.replace(/\,/g, ''),
				currency: currency,
				title: title,
				image: image,
				"status" : "PENDING"
			})
		})

	};
	handleClose = e => {
		$.magnificPopup.close();
		let {jobDetail} = this.props.job;
		let {history} = this.props;
		history.push(`/jobs/${jobDetail.id}`)
	};
	handleChangeNationalArea = (data) => {
		this.setState(data);
	};
	handleSelectImage = (e) => {
		let name  = e.target.name;
		let reader = new FileReader();
		let {canI} = this.props.user;
		let f = e.target.files[0];
		reader.readAsDataURL(e.target.files[0]);
		reader.onload = () => {
			this.setState({
				[name]: reader.result,
				imageFile: f,
			})
		};
		reader.onerror = function (error) {
			console.log('Error: ', error);
		};
	};
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
	render(){
		let { isPosting } = this.props.job;
		let { profile } = this.props.user;
		let { t, siteData } = this.props;
		let {
			area,
			national,
			service,
			description,
			errorMessage,
			price,
			currencyList,
			currency,
			title,
			image,
			isloadingPage
		} = this.state;
		let { isLoadedData } = this.props.siteData;
		return(
			<div className="container job-post-page">
				<div className="dashboard-content-inner" >
					{
						isloadingPage || !isLoadedData || isPosting ? <Loader /> : <div className="row">
						</div>
					}
					<div className="col-xl-12">
						<div className="dashboard-box margin-top-0 margin-bottom-20">
							<div className="headline">
								<h3><i className="icon-material-outline-face" />{t('Create Job')}</h3>
							</div>
							<div className="content">
								<ul className="fields-ul">
									<li>
										<div className="row">
											<div className="image-review col-xl-12 margin-bottom-20">
											<div className="wrapper-job-image">
												<img src={profile.avatar || "/images/user-avatar-placeholder.png"} alt="" />
											</div>
											</div>
											<div className="col-sm-12 select-container margin-bottom-10">
												<div className="title description">
													<span>{t('Title')}</span>
												</div>
												<input
													className="input-text"
													onChange={this.handleChangeInput}
													value={title}
													name="title"
												/>
											</div>
											<div className="col-sm-12 select-container margin-bottom-10">
												<div className="title description">
													<span>{t('Price')}</span>
												</div>
												<input
													type="text"
													min="0"
													className="input-text"
													onChange={this.handleChangePrice}
													value={price}
													name="price"
												/>
											</div>
											<div className="col-sm-12 select-container margin-bottom-10">
												<div className="title description">
													<span>{t('Currency')}</span>
												</div>
												<select
													className={`selectpicker services`}
													name='currency'
													value={currency}
													onChange={this.handleChangeInput}
													data-live-search="true"
												>
													{
														currencyList.map((item, index) => {
															return <option key={index} value={item}>{item}</option>
														})
													}
												</select>
											</div>
											<SelectPicker
												callback={this.handleChangeNationalArea}
												national={national}
												area={area}
												nationalName="national"
												areaName="area"
												nationalTitle={t('Nation')}
												areaTitle={t('Khu vực')}
												page="JOB_POST"
											/>
											<div className="col-sm-12 select-container margin-bottom-10">
												<div className="title description">
													<span>{t('Service category')}</span>
												</div>
												<select
													className={`selectpicker services`}
													name='service'
													value={service}
													onChange={this.handleChangeInput}
													data-live-search="true"
												>
													{
														siteData.categories.map((item, index) => {
															return <option key={index} value={item.id}>{item.title}</option>
														})
													}
												</select>
											</div>

											<div className="col-sm-12 margin-bottom-10">
												<span>{t('Service request description')}</span>
											</div>
											<div className="col-sm-12 select-container margin-bottom-10">

												<textarea
													value={description}
													cols="30"
													rows="5"
													className="with-border"
													name="description"
													onChange={this.handleChangeInput}
												/>
											</div>
											{
												image &&  <div className="image-review col-xl-12 margin-bottom-10">
													<div className="wrapper-job-image">
														<img src={image || "/images/user-avatar-placeholder.png"} alt="" />
													</div>
												</div>
											}

											<div className="uploadButton margin-top-0 col-xl-12 ">
												<input name="image" onChange={this.handleSelectImage} className="uploadButton-input" type="file" accept="image/*" id="upload-certificate"/>
												<label className="uploadButton-button ripple-effect" htmlFor="upload-certificate">{t('Image')}</label>
												<span className="uploadButton-file-name">Maximum file size: 2 MB</span>
											</div>
											<div className="col-sm-12 margin-bottom-30">
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
											{
												errorMessage.length > 0 &&  <div className="margin-top-20 col-xl-12">
													<div className="notification error ">
														{
															errorMessage.map(item => {
																return <p key={item}>{item}</p>
															})
														}
													</div>
												</div>
											}
											{!this.state.JobPosting && (
											<div className="col-8 offset-2 button-container margin-bottom-20">
												<a href="#" onClick={this.handleSendRequest} className="button ripple-effect big full-width btn-now">{t('Post job')}</a>
											</div>
											)}
										</div>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
				<div style={{display: 'none'}} className="add-note-button">
					<a id="btn-confirm" href="#small-dialog" className="popup-with-zoom-anim button full-width button-sliding-icon">Add Note <i className="icon-material-outline-arrow-right-alt"></i></a>
				</div>
				<div id="small-dialog" className="zoom-anim-dialog mfp-hide dialog-with-tabs">

					<div className="sign-in-form">


						<div className="popup-tabs-container">

							<div className="popup-tab-content" id="tab">
								<div className="welcome-text">
									<h3>{t('Create job successfully')}</h3>
								</div>
								<div className="text">
									{t("The job has been requested. Check notification information when sent by CanI candidates")}
								</div>
								<button onClick={this.handleClose} className="button full-width button-sliding-icon ripple-effect"> <i className="icon-material-outline-arrow-right-alt"/></button>

							</div>

						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(JobPost);
