import React from 'react';
import langConst from '../../libs/lang';
import '../../assets/scss/customStyleInMyPage.scss';
import { starRating, runScript } from './runScript';
import {Link} from 'react-router-dom';
import UrlPath from '../../libs/UrlPath';
import {convertDateTimeToLocaleString} from '../../helpers/convert';
import otherServices from '../../services/otherServices';
import {Popup, Alert} from '../Scripts/ManualScript';
import { encodeData, getNationList } from '../../helpers/DataAccess';
import Loader from '../../components/effects/Loader';
import NoImageUser from '../../assets/images/no-image-user.png';
import NoImageJob from '../../assets/images/no-image-job.png';
import {numberWithCommas} from "../../libs/templateJs";
import {checkIsCanIState} from "../../helpers/index";

import './job.scss'

const _constLength = 20;
const $ = window.$;

export default class JobList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: {},
			currentPage: '',
			currentItemDelete: false,
			currentJobGetListCani: false,
			reasonDelete: '',
			errorMesDelete: '',
			isLoading: false,
			jobSelected: {},
      isReviewingPlatform: false,
			userRating: props.ratingCriteria || [],
			oldUserRating: props.ratingCriteria || [],
      errorMessage: [],
			isDisableButton: false,
			isReviewingUser: false
		};
		this.myRef = React.createRef(null);
		this.myRefListCani = React.createRef(null);
	};
	componentDidMount(){
		runScript();
		starRating();
		//this.getParams();
		Popup();
    $.magnificPopup.instance.close =  () =>  {
      this.handleClearPlatformState();
      this.handleClearUserState();
      $.magnificPopup.proto.close.call(this);
    };
    let {userRating} = this.state;
    for (let i in userRating) {
      let item = userRating[i];
      $("input[name='rating-"+ item.key +"']").each(function() {
        if ($(this).attr('value') == 6 - item.value) {
          $(this).prop('checked', true);
        }
      });
    }
	};
	componentDidUpdate(prevProps, prevState){
		window.starRating('.star-rating');
		if(prevProps.JobsStatus !== this.props.JobsStatus
			|| prevProps.JobsData.isCanIJob !== this.props.JobsData.isCanIJob){
			console.log(this.props);
		}
	};
	handleClickBtnRefresh = (e, x) => {
		e.preventDefault();
		this.props?.callBackUpdateJobs(this.state.currentItemDelete.id);
	}
	handleClickOnListPickUp = (e, x) => {
		e.preventDefault();
		e.preventDefault();
		this.setState({
			currentJobGetListCani: x,
		}, () => {
			this.myRefListCani.current.click();
		})
	}
	handleClickBtnEdit = (e) => {
		e.preventDefault();
	}
	handleClickBtnDelete = (e, x) => {
		e.preventDefault();
		this.setState({
			currentItemDelete: x,
			reasonDelete: '',
			errorMesDelete: ''
		}, () => {
			this.myRef.current.click();

		})
	}
	callApiDelete = async () => {
		if(this.state.isLoading){
			return;
		}
		this.setState({
			isLoading: true
		})
		if(this.state.currentItemDelete){
			let _res;
			let _payload = {
				id: this.state.currentItemDelete.id,
				reason: encodeData(this.state.reasonDelete)
			};

			try{
				_res = await otherServices.deleteJob(_payload);
			}catch(err){
				console.log(err);
			}

			if(_res?.status){
				Alert({
					title: `Job is deleted !`,
					status: 'success'
				});
				this.props?.callBackUpdateJobs(this.state.currentItemDelete.id);
				this.setState({
					currentItemDelete: false,
					isLoading: false
				})
			}else{
				this.setState({
					isLoading: false
				})
				Alert({
					title: _res?.message || `Sorry, you can not delete this Job!`,
					status: false
				});
			}
		}
	};

	handleConfirmDialog = (e, _res) => {
		e.preventDefault();
		if(_res === 'ok'){
			if(this.state?.reasonDelete?.length < _constLength){
				this.setState({
					errorMesDelete: 'Please input the reason !'
				});
			}else{
				this.callApiDelete();
				window.$('.mfp-close').click();
			}
		}else{
			this.setState({
				reasonDelete: '',
				errorMesDelete: ''
			});
			window.$('.mfp-close').click();
		}
	}

	handleChangeInput = (e) => {
		e.persist();
		this.setState({
			reasonDelete: e.target.value
		});
	}
	handleGoToDetail = (e) => {
		e.preventDefault();
		window.$('.mfp-close').click();
		this.props.history.push({
			pathname: `${UrlPath.UserDetail}/${e.target.id}`
		})
	}
	renderNation = (x) => {
		let _nt = getNationList();
		return _nt.filter(z => z.countryId === x)[0].countryName;
	}
	renderPopupListCanI = () => {
		const {t} = this.props;
		return (
			<>
			<div className='popup-confirm'>
				<div style={{display: 'none'}} className="add-note-button">
		          	<a ref={this.myRefListCani} href="#small-dialog-1" className="popup-with-zoom-anim button full-width button-sliding-icon">Add Note <i className="icon-material-outline-arrow-right-alt"></i></a>
		        </div>
		        <div id="small-dialog-1" className="zoom-anim-dialog mfp-hide dialog-with-tabs pp-listcani">
					<div className="sign-in-form">
						<div className="popup-tabs-container">
							<div className="popup-tab-content" id="tab">
								<div className="welcome-text">
									<h3>{t('List CanI Pickup for:')} <strong>{this.state?.currentJobGetListCani?.title}</strong></h3>
								</div>
								<div className="freelancers-container freelancers-list-layout compact-list">
				                    {
				                      this.state?.currentJobGetListCani?.pickupCanI ? this.state?.currentJobGetListCani?.pickupCanI.map(item => {

				                        return <div key={item.id} className="freelancer">
				                          <div className="freelancer-overview">
				                            <div className="freelancer-overview-inner">
				                              <span className="bookmark-icon" />
				                              <div className="freelancer-avatar">
				                                <div className="verified-badge"></div>
				                                <img src={ item.avatar || NoImageUser} alt={item.name}/>
				                              </div>
				                              <div className="freelancer-name">
				                                <h4>{item.name}</h4>
				                                <span/>
				                                <div className="freelancer-rating">
				                                  <div className="star-rating" data-rating={item.rating || 4.9}/>
				                                </div>
				                              </div>
				                            </div>
				                          </div>
				                          <div className="freelancer-details">
				                            <div className="freelancer-details-list">
				                              <ul>
				                                <li>Location <strong><i className="icon-material-outline-location-on" /> {this.renderNation(item.nation)}</strong></li>
				                                <li>Price <strong>{item.price ? numberWithCommas(item.price) : 0} {item.currency || 'VND'}</strong></li>
				                                <li>Job Success <strong>{item.jobSuccess || 0}%</strong></li>
				                              </ul>
				                            </div>
				                            <a href="" id={item.id} onClick={this.handleGoToDetail} className="button btn button-sliding-icon ripple-effect">View Profile <i className="icon-material-outline-arrow-right-alt"></i></a>
				                          </div>
				                        </div>
				                      }) : <div>
				                        {t("Chưa có CanI đăng ký")}
				                      </div>
				                    }
				                  </div>

							</div>
						</div>
		          	</div>
		        </div>
	        </div>
	        </>
		);
	}
	renderPopupConfirmDelete = () => {
		const {t} = this.props;
		return(
			<div className='popup-confirm'>
				<div style={{display: 'none'}} className="add-note-button">
		          	<a ref={this.myRef} href="#small-dialog" className="popup-with-zoom-anim button full-width button-sliding-icon">Add Note <i className="icon-material-outline-arrow-right-alt"></i></a>
		        </div>
		        <div id="small-dialog" className="zoom-anim-dialog mfp-hide dialog-with-tabs">
					<div className="sign-in-form">
						<div className="popup-tabs-container">
							<div className="popup-tab-content" id="tab">
								<div className="welcome-text">
									<h3>{t('Do you want to remove job ?')}</h3>
								</div>
								<div className="text">
									Id: <strong>{this.state?.currentItemDelete?.id}</strong>
								</div>
								<div className="text">
									Title: <strong>{this.state?.currentItemDelete?.title}</strong>
								</div>
								<div className="text">
									Created By: <strong>{`(${this.state?.currentItemDelete?.creationUser?.id}) ${this.state?.currentItemDelete?.creationUser?.name}`}</strong>
								</div>
								<div className="text">
									City: <strong>{this.state?.currentItemDelete?.city}</strong>
								</div>
								<div className="text">
									Cani Requested: <strong>{this.state?.currentItemDelete?.requestedCani?.name}</strong>
								</div>
								<div className="text">
									Value: <strong>{this.state?.currentItemDelete?.total} {this.state?.currentItemDelete?.currency}</strong>
								</div>
								<div className="text">
									Status: <strong>{this.state?.currentItemDelete?.status}</strong>
								</div>
								<div className='text'>
									<div className="submit-field">
		                              <div className="section-headline">
		                                <h5>{t("Why do you want to remove ?")}</h5>
		                              </div>
		                              <textarea
		                                value={this.state.reasonDelete || ''}
		                                cols="30"
		                                rows="5"
		                                className="with-border"
		                                name="description"
		                                onChange={this.handleChangeInput}
		                              />
		                              {this.state?.errorMesDelete?.length > 0 && (
		                              	<div className="notification error">{this.state.errorMesDelete}</div>
		                              )}
		                            </div>
								</div>
								<div className="row">
									<div className="col-6">
										<button onClick={e => this.handleConfirmDialog(e, 'cancel')} className="button gray ripple-effect-dark">Cancel</button>
									</div>
									<div className="col-6">
										<button onClick={e => this.handleConfirmDialog(e, 'ok')} className="button gray ripple-effect-dark">Ok</button>
									</div>
								</div>
							</div>
						</div>
		          	</div>
		        </div>
	        </div>
		);
	};
  handleCompleteJob = async (e) => {
  	e.preventDefault();
  	let _res;
    try{
			_res = await otherServices.completeJob({
        jobId: parseInt(e.currentTarget.id),
				type: checkIsCanIState() ? 'CANI' : 'CANU'
			});
      this.setState({
        isLoading: true
      })
    }catch(err){
      console.log(err);
    }
    if(_res?.status){
      Alert({
        title: `Job is completed !`,
        status: 'success'
      });
      this.props?.callBackUpdateJobs(e.currentTarget.id);
      this.setState({
        isLoading: false
      })
    }else{
      this.setState({
        isLoading: false
      })
      Alert({
        title: _res?.message || `Sorry, you can not complete this Job!`,
        status: false
    });
    }
  };
  selectJob = (job) => {
  	let rating = 0;
  	let content = '';
  	if (job.id !== this.state.jobSelected.id) {
      if (this.props.user.profile.id === job.creationUser.id) {
        rating = job.canu_review ? job.canu_review.rating : 0;
        content = job.canu_review ? job.canu_review.content : '';
        $("input[name='rating-canui']").each(function() {
          if ($(this).attr('value') == 6 - rating) {
            $(this).prop('checked', true);
          } else {
            $(this).prop('checked', false);
          }
        });
      } else {
        rating = job.cani_review ? job.cani_review.rating : 0;
        content = job.cani_review ? job.cani_review.content : '';
        $("input[name='rating-canui']").each(function() {
          if ($(this).attr('value') == 6 - rating) {
            $(this).prop('checked', true);
          } else {
            $(this).prop('checked', false);
          }
        });
      }
      this.setState({
        jobSelected: job,
        content,
        rating
      })
    }
  };
  handleReviewPlatform = async () => {
  	let {userRating, oldUserRating} = this.state;
  	for (let item of userRating) {
  		let rate = $("input[name='rating-"+ item.key +"']:checked").val();
  		if (rate) {
  			item.value = 6 - rate
      } else {
  			item.value = 0
      }
    }
    this.setState({
			isReviewingPlatform: true
		});
		let response = await otherServices.updateUserRating(userRating);
		this.setState({
      isReviewingPlatform: false
		});
		if (response.status) {
      Alert({
        title: `Thank you for your review!`,
        status: 'success'
      });
    } else {
  		Alert({
        title: `Cannot review!`,
        status: 'fail'
			});
    }
  };
  handleReviewUser = async () => {
  	let {userRating, jobSelected, oldUserRating} = this.state;
  	let {t} = this.props;
  	let errorMessage = []
    let rate = $("input[name='rating-canui']:checked").val();
    let value = 0;
    if (rate) {
      value = 6 - rate;
    }
    if (!value) {
      errorMessage.push(t('Please click to rating'))
    }
    if (!$('#message2').val()) {
      errorMessage.push(t('Please input your feedback'))
    }
    if (errorMessage.length > 0) {
    	this.setState({
				errorMessage
			});
    	return;
    }
    this.setState({
			isReviewingUser: true
		});
		let response = await otherServices.reviewUser({
			jobId: jobSelected.id,
			value: value,
			content: $('#message2').val(),
			isCanI: checkIsCanIState()
		});
		this.setState({
      isReviewingUser: false
		});
		if (response.status) {
      Alert({
        title: `Thank you for your review!`,
        status: 'success'
      });
      if (checkIsCanIState()) {
      	jobSelected.canu_review = {
      		rating: value,
					content: $('#message2').val()
        }
      } else {
        jobSelected.cani_review = {
          rating: value,
          content: $('#message2').val()
        }
      }
      this.setState({
				content: $('#message2').val(),
				rating: value
			}, () => {
        window.starRating('.star-rating');
			})
    } else {
  		Alert({
        title: `Can not review!`,
        status: 'fail'
			});
  		this.setState({
				userRating: oldUserRating
			})
    }
  };
  handleClearPlatformState = () => {
  	let {userRating, oldUserRating} = this.state;
  	for (let i in userRating) {
  		let item = userRating[i];
  		let oldItem = oldUserRating[i]
      $("input[name='rating-"+ item.key +"']").each(function() {
        if ($(this).attr('value') == 6 - item.value) {
          $(this).prop('checked', true);
        } else {
          $(this).prop('checked', false);
        }
			});
  	}
  }
  ;
  handleClearUserState = () => {
  	$('#message2').val('');
  	$("input[name='rating-canui']").prop('checked', false);
  };
	render(){
		const {t} = this.props;
		let { rating, content, jobSelected, userRating, isReviewingPlatform, errorMessage, isReviewingUser } = this.state;
		return(
			<div className="dashboard-content-inner" >
				<div className="dashboard-headline">
					<h3>{this.props.PageTitle}</h3>
				</div>
				<div className="row">
					<div className="col-xl-12">
						{this.props?.JobsData?.content?.length <= 0 && <div className="have-no-data">{t('Have no Job !!')}</div>}
						{this.props?.JobsData?.content?.length > 0 && (
						<div className="dashboard-box margin-top-0">
							<div className="headline">
								<h3><i className="icon-material-outline-business-center"></i> {t('My Job Listings')}</h3>
							</div>
							<div className="content">
								<ul className="dashboard-box-list">
									{this.props?.JobsData?.content?.length > 0 && this.props?.JobsData?.content.map(x => {
									return(
										<li key={`job-sg-${x.id}`}>
											<div className="job-listing">
												<div className="job-listing-details">
													<div className="job-sg-img">
														<div className="job-sg-img-wrap"><img src={x.image || NoImageJob} alt={x.title} /></div>
													</div>
													<div className="job-sg-info">
														<div className="job-listing-description">
															<h3 className="job-listing-title">
																<Link to={`${UrlPath.JobDetail}/${x?.id}`}>{x?.title}</Link>
															</h3>
															<div className="job-listing-footer">
																<ul>
																	<li><i className="icon-material-outline-date-range"></i> {`Posted on ${convertDateTimeToLocaleString(x.createdAt)}`}</li>
																</ul>
															</div>
														</div>
													</div>
												</div>
											</div>
											<div className="buttons-to-right always-visible">
												{this.props.JobsStatus === 'pending' && x?.creationUser?.id === this.props?.user?.profile?.id && (
													<>
													<a href="#" onClick={e => this.handleClickOnListPickUp(e, x)} className="button ripple-effect"><i className="icon-material-outline-supervisor-account"></i> {t('CanI Pickup')} <span className="button-info">{x?.pickupCanI?.length || '0'}</span></a>
													<a href="#" onClick={e => this.handleClickBtnRefresh(e, x)} className="button dark ripple-effect"><i className="icon-feather-rotate-ccw"></i> Refresh</a>
													</>
												)}
												{this.props.JobsStatus !== 'pending' && (
													<a href="#" onClick={e => this.handleClickOnRequested} className="button ripple-effect"><i className="icon-material-outline-face"></i> {t('Requested CanI')}</a>
												)}
												{this.props.JobsStatus === 'processing' && x.requestedUser && (
													<a id={x.id} href="" onClick={this.handleCompleteJob} className="button green ripple-effect">{t(!checkIsCanIState() ? 'Approve Complete' : 'Request Complete')}</a>
												)}
                    		{this.props.JobsStatus === 'completed' && (
													<a id={x.id} href="#sign-in-dialog" onClick={() => this.selectJob(x) } className="popup-with-zoom-anim button green ripple-effect">{t('Review')}</a>
                    		)}
												{!this.props?.JobsData?.isCanIJob && (
													<a href="#" onClick={e => this.handleClickBtnDelete(e, x)} className="button gray ripple-effect ico" title="Remove" data-tippy-placement="top"><i className="icon-feather-trash-2"></i></a>
												)}
											</div>
										</li>
									)
									})}
								</ul>
							</div>
						</div>
						)}
					</div>
				</div>
				<div className="dashboard-footer-spacer"></div>
				{this.renderPopupConfirmDelete()}
				{this.renderPopupListCanI()}
				{this.isLoading && <Loader />}
				<div id="sign-in-dialog" className="zoom-anim-dialog mfp-hide dialog-with-tabs">

					<div className="sign-in-form">
						<ul className="popup-tabs-nav">
							<li><a onClick={this.handleClearUserState} id="login-href" href="#login">{ t('Platform')}</a></li>
							<li><a onClick={this.handleClearPlatformState} id="register-href" href="#register">{t('User')}</a></li>
						</ul>

						<div className="popup-tabs-container">
							<div className="popup-tab-content" id="login">
								<div className="text-container">
									<span className="text-title"><b>{t('Job title')}</b>:</span>
									<span > {jobSelected.title}</span>
								</div>
								<div className="text-container">
									<span className="text-title"><b>{t('Service')}</b>:</span>
									<span > {jobSelected.service ? jobSelected.service[0].title : null}</span>
								</div>
								<div className="text-container">
									<span className="text-title"><b>{t('location')}</b>:</span>
									<span > {jobSelected.city}, {jobSelected.nation}</span>
								</div>
								<div className="rating-container">
                  {
                    userRating.map((item) => {
                      return <div key={item.key} className="feedback-yes-no">
												<p>{item.property}</p>
												<div className="leave-rating">
													<input type="radio" name={"rating-" + item.key} id={"rating-" + item.key +'-1'} value="1"  />
													<label htmlFor={"rating-" + item.key +'-1'} className="icon-material-outline-star"></label>
													<input type="radio" name={"rating-" + item.key}  id={"rating-" + item.key +'-2'} value="2"/>
													<label htmlFor={"rating-" + item.key +'-2'} className="icon-material-outline-star"></label>
													<input type="radio" name={"rating-" + item.key}  id={"rating-" + item.key +'-3'} value="3"/>
													<label htmlFor={"rating-" + item.key +'-3'} className="icon-material-outline-star"></label>
													<input type="radio" name={"rating-" + item.key}  id={"rating-" + item.key +'-4'} value="4"/>
													<label htmlFor={"rating-" + item.key +'-4'} className="icon-material-outline-star"></label>
													<input type="radio" name={"rating-" + item.key}  id={"rating-" + item.key +'-5'} value="5"/>
													<label htmlFor={"rating-" + item.key +'-5'} className="icon-material-outline-star"></label>
												</div>
												<div className="clearfix"/>
											</div>
                    })
                  }
								</div>


                {
                  isReviewingPlatform ? <div className="margin-top-10 ">
										<Loader/>
									</div> :<button
										onClick={this.handleReviewPlatform}
										className="button full-width button-sliding-icon ripple-effect"
									>
                    {t('Submit')}
										<i className="icon-material-outline-arrow-right-alt"  />
									</button>
                }
							</div>
							<div className="popup-tab-content" id="register">
                {
                  errorMessage.length > 0 &&  <div className="notification error">
                    {
                      errorMessage.map(item => {
                        return <p key={item}>{item}</p>
                      })
                    }
									</div>
                }
								<div className="text-container">
									<span className="text-title"><b>{t('Job title')}</b>:</span>
									<span > {jobSelected.title}</span>
								</div>
								<div className="text-container">
									<span className="text-title"><b>{t('Service')}</b>:</span>
									<span > {jobSelected.service ? jobSelected.service[0].title : null}</span>
								</div>
								<div className="text-container">
									<span className="text-title"><b>{t('location')}</b>:</span>
									<span > {jobSelected.city}, {jobSelected.nation}</span>
								</div>
								<div className="rating-container">
									<div className="feedback-yes-no">
										<p>Rating</p>
										{
											content ?  <div className="star-rating" data-rating={rating}></div> : <div className="leave-rating">
												<input type="radio" name={"rating-canui"} id={"rating-canui-1"} value="1" />
												<label htmlFor={"rating-canui-1"} className="icon-material-outline-star"></label>
												<input type="radio" name={"rating-canui"}  id={"rating-canui-2"} value="2"/>
												<label htmlFor={"rating-canui-2"} className="icon-material-outline-star"></label>
												<input type="radio" name={"rating-canui"}  id={"rating-canui-3"} value="3"/>
												<label htmlFor={"rating-canui-3"} className="icon-material-outline-star"></label>
												<input type="radio" name={"rating-canui"}  id={"rating-canui-4"} value="4"/>
												<label htmlFor={"rating-canui-4"} className="icon-material-outline-star"></label>
												<input type="radio" name={"rating-canui"}  id={"rating-canui-5"} value="5"/>
												<label htmlFor={"rating-canui-5"} className="icon-material-outline-star"></label>
											</div>
										}
										<div className="clearfix"/>
									</div>
									{
                    content ? <div className="review-content">{content}</div> : 	<textarea className="with-border" placeholder="Comment" name="message2" id="message2" cols="7" />
									}
								</div>
                {
                  isReviewingUser ? <div className="margin-top-10 ">
										<Loader/>
									</div> : !content ? <button
										onClick={this.handleReviewUser}
										className="margin-top-10 button full-width button-sliding-icon ripple-effect"
									>
                    {t("Submit")}
										<i className="icon-material-outline-arrow-right-alt" />
									</button> : null
                }

							</div>

						</div>
					</div>
				</div>
			</div>
		);
	}
};
