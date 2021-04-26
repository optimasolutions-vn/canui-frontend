import React from 'react';
import { connect } from 'react-redux';
import Loader from '../../components/effects/Loader';
import PostDataCountries from '../../helpers/PostDataCountries';
import NoImage from "../../assets/images/no-image-job.png";
import moment from 'moment';
import {Alert} from '../Scripts/ManualScript';
import {getNationList, getCitiesList} from '../../helpers/DataAccess';
import {
  actionGetJobDetail,
  actionPickJob
} from '../../actions/actionJob';
import './style.scss';
import {runScript, numberWithCommas} from "../../libs/templateJs";
import {checkAuthenticated} from '../../helpers';
import UrlPath from '../../libs/UrlPath';
const $ = window.$;

const mapStateToProps = state => ({
  user: state.user,
  siteData: state.siteData,
  job: state.job
});

const mapDispatchToProps = dispatch => ({
  onLoad: params => dispatch(actionGetJobDetail(params)),
  onPickJob: params => dispatch(actionPickJob(params))
});
class JobDetail extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: {},
      isShowList: false
		};
	};
	componentDidMount(){
		let jobId = this.props.match.params.jobId;
		let {onLoad} = this.props;
		this.setState({
      jobId: jobId
    });
		runScript();
		onLoad({
			jobId: jobId
		});
	};
	componentDidUpdate(prevProps, prevState){
	  if (prevProps.job.isLoading && !this.props.job.isLoading) {
      let country = getNationList();
      let nationIdx = country.map(item => {
        return item.countryId
      }).indexOf(this.props.job.jobDetail.nation);
      if (nationIdx !== -1) {
        this.setState({
          nation: country[nationIdx].countryName
        })
      }
      window.starRating('.star-rating');
      var single_map =  document.getElementById('singleListingMap');
      if (typeof(single_map) != 'undefined' && single_map != null) {
        window.singleListingMap()
      }
      $('.popup-with-zoom-anim').magnificPopup({
        type: 'inline',

        fixedContentPos: false,
        fixedBgPos: true,

        overflowY: 'scroll',

        closeBtnInside: true,
        preloader: false,

        midClick: true,
        closeOnContentClick: false,
        closeOnBgClick: true,
        showCloseBtn: true,
        removalDelay: 300,
        mainClass: 'my-mfp-zoom-in',
      });
    }
    if (prevProps.job.isPicking && !this.props.job.isPicking) {
	    if (this.props.job.errorMessage) {
        Alert({
          title: `${this.props.errorMessage}`,
        })
      } else {
        Alert({
          title: this.props.t("Message can be performed from the requester"),
          status: 'success'
        })
        this.props.history.push(`${UrlPath.Home}`)
      }

    }
	};

  goToChat = (e) => {
    e.preventDefault();
    if(!this.props?.user?.profile?.caniId){
      Alert({
        title: this.props.t("Please Register CanI first !!!"),
      })
      return;
    }
    let { history } = this.props;
    let { jobDetail } = this.props.job;
    history.push('/messages/'+jobDetail.creationUser.id)
  };

  handleSendRequest = (e) => {
    e.preventDefault();
    if(!this.props?.user?.profile?.caniId){
      Alert({
        title: this.props.t("Please Register CanI first !!!"),
      })
      return;
    }
    let { jobId } = this.state;
    let {t, onPickJob} = this.props;
    onPickJob({
      id: jobId
    });
  };

  showList = () => {
    this.setState({
      isShowList: true
    }, function () {
      $('html,body').animate({
        scrollTop: $("#cani-list").offset().top
      }, 'slow');
    });

  };
  handleGoToDetail = (e) => {
    e.preventDefault();
    $('.mfp-close').click();
    let {history} = this.props;
    console.log(e.target.id)
    history.push(`/users/${e.target.id}`)
  };
  getNation = (code) => {
    return getNationList().filter(x => x.countryId === code)[0]?.countryName;
  };
  getCity = (nation, code) => {
    let city = getCitiesList(nation)
    if (!city) {
      return '';
    }
    return city.filter(x => x.id == code)[0]?.countryName;
  };
  handleShowAlertNeedLogin = (e) => {
    e.preventDefault();
    if(!checkAuthenticated()){
      Alert({
        title: this.props.t("Please Login !!!"),
      })
    }else if((this.props?.user?.profile?.id !== this.props?.job?.jobDetail?.creationUser?.id) && checkAuthenticated()){
      Alert({
        title: this.props.t("You don't have permission !!!"),
      })
    }
  }
  checkStateToview = () => {
    if(!checkAuthenticated()){
      return false;
    }else{
      if(this.props?.user?.profile?.id
        && this.props?.job?.jobDetail?.status === 'PENDING'
        && this.props?.job?.jobDetail?.creationUser?.id
        && (this.props?.user?.profile?.id !== this.props?.job?.jobDetail?.creationUser?.id)){
          return true;
      }else{
        return false;
      }
    }
  }
  renderBiding = () => {
    if(checkAuthenticated() && (this.props?.user?.profile?.id === this.props?.job?.jobDetail?.creationUser?.id)){
      return (
        <>
          <a href="#small-dialog" className="popup-with-zoom-anim">
            <div className="btn-cani">
              {this.props.t('Until now')} {this.props.job.jobDetail.pickupCanI?.length} {this.props.t('bidding')}
            </div>
          </a>
        </>
      );
    }else{
      return null;
    }
  }
	render(){
	  let { isLoading, jobDetail, isPicking } = this.props.job;
	  let { profile } = this.props.user;
	  let { categories } = this.props;
    let { t } = this.props;
    let { isShowList, nation } = this.state;
    if (isLoading) {
      return <Loader/>
    } else {
      return(
        <div className="job-detail-page">
          <div className="single-page-header" data-background-image="images/single-job.jpg">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <div className="single-page-header-inner">
                    <div className="left-side">
                      <div className="header-image"><img src={jobDetail.image || NoImage} alt="" /></div>
                      <div className="header-details">
                        <h3>{jobDetail.title}</h3>
                        <h5>{jobDetail.service[0].title}</h5>
                        <ul>
                          <li><i className="icon-material-outline-business" /></li>
                          {
                            jobDetail.creationUser.rating ?  <li><div className="star-rating" data-rating={jobDetail.creationUser.rating}/></li>:null
                          }

                          <li>{this.getNation(jobDetail.nation)}</li>
                          <li><div className="verified-badge-with-title">{this.props.t(jobDetail.status)}</div></li>
                        </ul>
                      </div>
                    </div>
                    <div className="right-side">
                      <div className="salary-box">
                        <div className="salary-type">{t('Price')}</div>
                        <div className="salary-amount">{jobDetail?.total ? numberWithCommas(jobDetail.total) : 0} {jobDetail.currency}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="row">

              <div className="col-xl-8 col-lg-8 content-right-offset">

                <div className="single-page-section">
                  <h3 className="margin-bottom-25">{t('Content')}</h3>
                  <div className="content-description">
                  {jobDetail.content}
                  </div>
                </div>

                <div className="single-page-section">
                  <h3 className="margin-bottom-30">{t('Location')}</h3>
                  <div id="single-job-map-container">
                    <div id="singleListingMap" data-latitude="51.507717" data-longitude="-0.131095" data-map-icon="im im-icon-Hamburger"></div>
                  </div>
                </div>

                {/*<div className="single-page-section">
                  <h3 className="margin-bottom-25">Similar Jobs</h3>

                  <div className="listings-container grid-layout">

                    <a href="#" className="job-listing">

                      <div className="job-listing-details">
                        <div className="job-listing-company-logo">
                          <img src="images/company-logo-02.png" alt="" />
                        </div>

                        <div className="job-listing-description">
                          <h4 className="job-listing-company">Coffee</h4>
                          <h3 className="job-listing-title">Barista and Cashier</h3>
                        </div>
                      </div>

                      <div className="job-listing-footer">
                        <ul>
                          <li><i className="icon-material-outline-location-on"></i> San Francisco</li>
                          <li><i className="icon-material-outline-business-center"></i> Full Time</li>
                          <li><i className="icon-material-outline-account-balance-wallet"></i> $35000-$38000</li>
                          <li><i className="icon-material-outline-access-time"></i> 2 days ago</li>
                        </ul>
                      </div>
                    </a>

                    <a href="#" className="job-listing">

                      <div className="job-listing-details">
                        <div className="job-listing-company-logo">
                          <img src="images/company-logo-03.png" alt="" />
                        </div>

                        <div className="job-listing-description">
                          <h4 className="job-listing-company">King <span className="verified-badge" title="Verified Employer" data-tippy-placement="top"></span></h4>
                          <h3 className="job-listing-title">Restaurant Manager</h3>
                        </div>
                      </div>

                      <div className="job-listing-footer">
                        <ul>
                          <li><i className="icon-material-outline-location-on"></i> San Francisco</li>
                          <li><i className="icon-material-outline-business-center"></i> Full Time</li>
                          <li><i className="icon-material-outline-account-balance-wallet"></i> $35000-$38000</li>
                          <li><i className="icon-material-outline-access-time"></i> 2 days ago</li>
                        </ul>
                      </div>
                    </a>
                  </div>

                </div>*/}
              </div>

              <div className="col-xl-4 col-lg-4">
                <div className="sidebar-container">
                  {this.checkStateToview() && (
                  <div className="button-container">
                    <a href="" onClick={this.handleSendRequest} className="apply-now-button popup-with-zoom-anim">
                      {t("Apply Now")}
                      <i className="icon-material-outline-arrow-right-alt" />
                    </a>
                    <a href="" onClick={this.goToChat} className="apply-now-button popup-with-zoom-anim">
                      Chat
                      <i className="icon-material-outline-arrow-right-alt" />
                    </a>
                  </div>
                  )}
                  <div className="sidebar-widget">
                    <div className="job-overview">
                      <div className="job-overview-headline">{t("Job Summary")}</div>
                      <div className="job-overview-inner">
                        <ul>
                          <li>
                            <i className="icon-material-outline-location-on" />
                            <span>{t("Location")}</span>
                            <h5>{this.getNation(jobDetail.nation)}, {jobDetail.city}</h5>
                          </li>
                          <li>
                            <i className="icon-material-outline-business-center"/>
                            <span>Service type</span>
                            <h5>{jobDetail.service[0].title}</h5>
                          </li>
                          <li>
                            <i className="icon-material-outline-local-atm" />
                            <span>{t('Price')}</span>
                            <h5>{jobDetail?.total ? numberWithCommas(jobDetail.total) : 0} {jobDetail?.currency}</h5>
                          </li>
                          <li>
                            <i className="icon-material-outline-access-time" />
                            <span>{t('Created date')}</span>
                            <h5>{moment(jobDetail.createdAt).fromNow()}</h5>
                          </li>
                          <li className="no-padding">
                            {this.renderBiding()}
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div id="small-dialog" className="zoom-anim-dialog mfp-hide dialog-with-tabs">

            <div className="sign-in-form job-detail">
              <ul className="popup-tabs-nav">
                <h3>{t('List of cani registration')}</h3>
              </ul>

              <div className="popup-tabs-container">
                <div className="popup-tab-content" id="tab">
                  <div>{jobDetail.pickupCanI ? jobDetail.pickupCanI.length : 0} Can I</div>
                  <div className="freelancers-container freelancers-list-layout compact-list pickup-list">
                    {
                      jobDetail.pickupCanI ? jobDetail.pickupCanI.map(item => {
                        let na = this.getNation(item.nationalService);
                        return <div key={item.id} className="freelancer">
                          <div className="freelancer-overview">
                            <div className="freelancer-overview-inner">
                              <span className="bookmark-icon" />
                              <div className="freelancer-avatar">
                                <div className="verified-badge"></div>
                                <img src={ item.avatar || "/images/user-avatar-big-01.jpg"} alt=""/>
                              </div>
                              <div className="freelancer-name">
                                <h4>{item.name}</h4>
                                <span/>
                                <div className="freelancer-rating">
                                  <div className="star-rating" data-rating="4.9"/>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="freelancer-details">
                            <div className="freelancer-details-list">
                              <ul>
                                <li>{t("Location")} <strong><i className="icon-material-outline-location-on" /> {na}</strong></li>
                                <li>{t("Rate")} <strong>{item.price ? numberWithCommas(item.price) : 0} {item.currency || 'VND'} / hr</strong></li>
                                {/*<li>Job Success <strong>95%</strong></li>*/}
                              </ul>
                            </div>
                            <a href="" id={item.id} onClick={this.handleGoToDetail} className="button button-sliding-icon ripple-effect">View Profile <i className="icon-material-outline-arrow-right-alt"></i></a>
                          </div>
                        </div>
                      }) : <div>
                        {t("No registered CanI")}
                      </div>
                    }
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      );
    }

	}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(JobDetail);
