import React from 'react';
import Loader from '../../../components/effects/Loader';
import JobsServices from '../../../services/JobsServices';
import {Link} from 'react-router-dom';
import UrlPath from '../../../libs/UrlPath';
import MessageConst from '../../../libs/MessageConst';
import { Popup, Alert} from '../Scripts/Popup';
import {JobStatus} from '../../../helpers/DataAccess';
import KeyWord from '../../../components/cms/KeywordSuggest/KeyWord';
import '../Styles/style.scss';
function runScript(){
	setTimeout(() => {
		window.$('.selectpicker').selectpicker('val', 'PENDING');
	}, 1000);
	
}

const _minLengthTitle = 10;
const _maxLengthTitle = 120;
const _minLengthContent = 20;
const _maxLengthContent = 500;
const _keyImageUpload = 'job_image';
const _maxSizeImage = 204800;

class CmsJobDetail extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: {},
			showSuggestion: true
		};
		this.keyWordRef = React.createRef(null);
	};
	componentDidMount(){
		runScript();
		if(this.props?.match?.params?.id){
			this.getJobDetail();
		}
	};
	componentDidUpdate(prevProps, prevState){};
	getJobDetail = () => {
		if(this.state.isLoading || !this.props?.match?.params?.id){
			return;
		}
		this.setState({
			isLoading: true
		}, async () => {
			let _res = await JobsServices.getJobDetail({id: this.props.match.params.id});
			if(_res?.data){
				let _n = _res.data;
				this.setState({
					Detail: _res.data,
					formField:  _n,
				});
			}else{
				Alert({
					title: _res?.message || `${MessageConst.MessStatic.Get_Job_Detail_Fail}`
				})
			}
			this.setState({
				isLoading: false
			})
		})
	};
	handleChangeService = (e) => {
		let _n = this.state.formField;
		_n.service = [Number(e.target.value)];
		this.setState({
			formField: _n
		})
	}
	handleChangeJobStatus = (e) => {
		let _n = this.state.formField;
		_n.status = e.target.value;
		this.setState({
			formField: _n
		})	
	}
	handleChangeInput = (e) => {
		let _n = this.state.formField;
		_n.content = e.target.value;
		this.setState({
			formField : _n
		})
	}
	renderPickupCani = () => {
		return this.state?.formField?.pickupCanI?.map(x => {
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
		let _n = this.state.formField;
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
	updateJobDetail = async (payload) => {
		if(this.state.isLoading || !this.props?.match?.params?.id){
			return;
		}
		this.setState({
			isLoading: true
		}, async () => {
			let _res = await JobsServices.updateJobDetail(payload);
			if(_res?.status){
				Alert({
					title: _res?.message || `${MessageConst.MessStatic.Update_Job_Detail_Success}`,
					status: 'success'
				})
			}else{
				Alert({
					title: _res?.message || `${MessageConst.MessStatic.Get_Job_Detail_Fail}`
				})
			}
			this.setState({
				isLoading: false
			})
		})
	};
	validationForm = (_data) => {
		let _errors = [];
		
		if(!_data?.total){
			_errors.push('Price is required!');
		}
		
		if(!_data?.content){
			_errors.push('Content is required!');
		}else if(_data?.content?.length > _maxLengthContent){
			_errors.push(`Content can not more than ${_maxLengthContent} characters`);
		}else if(_data?.content?.length < _minLengthContent){
			_errors.push(`Content can not less than ${_minLengthContent} characters`);
		}
		if(!_data?.keyword || _data?.keyword?.length === 0){
			_errors.push('KeyWords is required!');
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
	handleSubmitForm = (e) => {
		e.preventDefault();
		let _n = this.state.formField;
		let _obj = {
			id: _n.id,
			content: _n.content,
			keyword: _n.keyword,
			total: _n.total
		}
		if(this.validationForm(_obj)){
			this.updateJobDetail(_obj);
		}
	}
	renderJobStatus = () => {
		return JobStatus.map(x => {
			return <option key={`status${x}`} value={x}>{x}</option>
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
							<h3>Job Detail</h3>
						</div>
					</div>
				</div>
				{this.state.Detail.status === 'CANCEL' && (
				<div className="row">
					<div className="col-12">
						<div className="notification error">{'Job cancelled'}</div>
					</div>
				</div>
				)}
				<div className="row">
					<div className="col-12">
						<form ref={this.myRef} method="post" id="service-detail-form">
							<div className="row">
								<div className="col-6">
									<div className="submit-field">
										<h5>{t('Id')}</h5>
										<input className="input-text with-border" disabled defaultValue={this.state?.Detail?.id}/>
									</div>
								</div>
								<div className="col-6">
									<div className="submit-field">
										<h5>{t('Image')}</h5>
										{this.state?.Detail?.image && (
										<div className="img-job-icon"><img src={this.state?.Detail?.image} alt={this.state?.Detail?.title}/></div>
										)}
									</div>
								</div>
								<div className="col-6">
									<div className="submit-field">
										<h5>{t('Title')}</h5>
										<input className="input-text with-border" disabled defaultValue={this.state?.Detail?.title}/>
									</div>
								</div>
								<div className="col-6">
									<div className="submit-field">
										<h5>{t('Status')}</h5>
										<input className="input-text with-border" disabled defaultValue={this.state?.Detail?.status}/>
										
									</div>
								</div>
								<div className="col-6">
									<div className="submit-field">
										<h5>{t('Value')}</h5>
										<input className="input-text with-border" disabled defaultValue={this.state?.Detail?.total ? `${parseInt((this.state?.Detail?.total.toString()).replace(/\D/g,''),10).toLocaleString({locale: 'fr-FR'})} ${!!this.state?.Detail?.currency ? this.state?.Detail?.currency : ''}` : ''}/>
									</div>
								</div>
								
								<div className="col-6">
									<div className="submit-field">
										<h5>{t('Created By')}</h5>
										<div>
											<div className="user-image-wrap">
												{this.state?.Detail?.creationUser?.avatar && (
													<img className="user-imgage-content" src={this.state?.Detail?.creationUser?.avatar} alt={this.state?.Detail?.creationUser?.name || ''} />
												)}
											</div>
											<div><Link to={`${UrlPath.CmsPath.CmsMembersDetail}/${this.state?.Detail?.creationUser?.id}`}>{`(${this.state?.Detail?.creationUser?.id}) ${this.state?.Detail?.creationUser?.name}`}</Link></div>
										</div>
									</div>
								</div>
								<div className="col-6">
									<div className="submit-field">
										<h5>{t('Nation')}</h5>
										<input title={t('Nation')} disabled name="nation" type="text" defaultValue={this.state?.Detail?.nation} className="input-text with-border" autoComplete="new-field" placeholder={t('nation')}/>
									</div>
								</div>
								<div className="col-6">
									<div className="submit-field">
										<h5>{t('City')}</h5>
										<input title={t('City')} disabled name="city" type="text" defaultValue={this.state?.Detail?.city} className="input-text with-border" autoComplete="new-field" placeholder={t('city')}/>
									</div>
								</div>
								<div className="col-6">
									<div className="submit-field">
										<h5>{t('Service')}</h5>
										<input title={t('Service')} disabled name="service" type="text" defaultValue={(this.state?.Detail?.service)[0]?.title} className="input-text with-border" autoComplete="new-field" placeholder={t('service')}/>
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
												{this.state?.formField?.keyword.map(x => {
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
			                                onChange={this.handleChangeInput}
											value={this.state?.Detail?.content || ''}
											/>
									</div>
								</div>
								
								<div className="col-12">
									<div className="submit-field">
										<h5>{t('Pickup CanI')}{` (${this.state.Detail?.pickupCanI?.length ? this.state.Detail?.pickupCanI?.length : '0'})`}</h5>
										{this.renderPickupCani()}
									</div>
								</div>
								<div className="col-12">
									<div className="submit-field">
										<h5>{t('Requested CanI')}{` (${this.state.Detail.requestedUser ? '1' : '0'})`}</h5>
										{this.renderRequestedUser()}
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
					{this.state?.Detail?.status !== 'CANCEL' && (
						<>
						{this.state.isLoading && <button disabled className="button full-width button-sliding-icon ripple-effect margin-top-10" type="submit">{t('Updating')}<i className="icon-material-outline-arrow-right-alt"></i></button>}
						{!this.state.isLoading &&
							<button className="button full-width button-sliding-icon ripple-effect margin-top-10" type="submit" onClick={this.handleSubmitForm} form="service-detail-form">{t('Update')}<i className="icon-material-outline-arrow-right-alt"></i></button>
						}
						</>
					)}
					</div>
				</div>
				{this.state.Detail.status === 'CANCEL' && (
				<div className="row">
					<div className="col-12">
						<div className="notification error">{'Job cancelled'}</div>
					</div>
				</div>
				)}
			</div>
		)
	};

	render(){
		return(
			<>
			{this.state?.Detail?.id && this.renderContentMain()}
			{!this.state.isLoading && !this.state?.Detail?.id && <div className="nodatafound">No Data Found</div>}
			{this.state.isLoading && <Loader />}
			</>
		);
	}
};
export default CmsJobDetail;
