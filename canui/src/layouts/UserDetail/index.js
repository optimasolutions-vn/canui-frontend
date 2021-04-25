import React from 'react';
import { connect } from 'react-redux';
import Loader from '../../components/effects/Loader';
import PostDataCountries from '../../helpers/PostDataCountries';
import { Popup, Alert} from '../Scripts/ManualScript';
import {
  actionGetUserDetail
} from '../../actions/actionUser';
import {
  actioncFavourite
} from '../../actions/actionFavourite';
import './style.scss'
import {runScript} from "../../libs/templateJs";
import {checkAuthenticated} from "../../helpers";
import {convertNumberToHaveCommas, getCitiesList, getNationList} from "../../helpers/DataAccess";
import NoImageUser from '../../assets/images/no-image-user.png';
const $ = window.$;
const mapStateToProps = state => ({
  user: state.user,
  siteData: state.siteData,
  job: state.job
});

const mapDispatchToProps = dispatch => ({
  onLoad: params => dispatch(actionGetUserDetail(params)),
  onFavourite: params => dispatch(actioncFavourite(params))
});
class JobDetail extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: {},
      isShowList: false,
      isFavourite: false,
      page: 1,
      reviewList: [],
      totalPage: 0,
      pages: []
		};
	};
	componentDidMount(){
		let userId = this.props.match.params.userId;
		let {onLoad} = this.props;
		onLoad({
      userId: userId
		});
		this.setState({
      userId
    })
	};
	componentDidUpdate(prevProps, prevState){
	  if (prevProps.user.isLoadingUserDetail && !this.props.user.isLoadingUserDetail) {
	    console.log(1245);
	    let arr = [];
	    let totalPage = Math.ceil(this.props.user.reviewList.length / 10);
	    for (let i = 1; i <= totalPage; i++) {
	      if (arr.length < 3) {
          arr.push(i)
        }
      }

      let reviewList = this.props.user.reviewList.slice((this.state.page -1 ) * 10,this.state.page * 10);
	    this.setState({
        totalPage: totalPage,
        reviewList: reviewList,
        originReviewList: this.props.user.reviewList,
        pages: arr
      }, () => {
        window.starRating('.star-rating');
      });
	    if (this.props.user.userDetail.isFavorite){
	      this.setState({
          isFavourite: true
        })
      }
	    runScript();
    }
	};

  goToChat = (e) => {
    e.preventDefault();
    let { history } = this.props;
    let { jobDetail } = this.props.job;
    history.push('/message/'+jobDetail.creationUser)
  };
  goToChat2 = (e) => {
    e.preventDefault();
    if (!checkAuthenticated()) {
      Alert({
        title: "You don't login yet",
        status: 'fail'
      })
      return;
    }
    let { history } = this.props;
    let { userId } = this.state;
    history.push('/messages/'+userId);
  };
  handleFavourite = (e) => {
    if (!checkAuthenticated()) {
      Alert({
        title: "You don't login yet",
        status: 'fail'
      })
      return;
    }
    let {isFavourite, userId} = this.state;
    let {onFavourite} = this.props;
    onFavourite({
      userId: userId
    });
    this.setState({
      isFavourite: !isFavourite
    })
  };
  getNation = (code) => {
    return getNationList().filter(x => x.countryId == code)[0]?.countryName;
  };
  getCity = (nation, code) => {
    let city = getCitiesList(nation);
    if (!city) {
      return ''
    }
    return city.filter(x => x.id == code)[0]?.countryName;
  };
  handlePagination = (e) => {
    let { page, originReviewList } = this.state;
    e.preventDefault();
    let p = e.currentTarget.getAttribute('data-page');
    if (p !== page) {
      page = page +  1;
      let reviewList = originReviewList.slice((page -1 ) * 10, page * 10);
      this.setState({
        page: page,
        reviewList
      })
    }

  };
	render(){
	  let { isLoadingUserDetail, userDetail, profile } = this.props.user;
    let { t, history } = this.props;
    let { isFavourite, userId, totalPage, page, reviewList, pages } = this.state;
    let { categories } = this.props.siteData;
		if (isLoadingUserDetail) {
		  return <Loader/>
    } else if(!!userDetail){
		  let avatar = NoImageUser;
		  if (userDetail?.files?.cani_avatar?.length > 0) {
		    avatar = userDetail?.files?.cani_avatar[userDetail.files?.cani_avatar?.length - 1]?.url;
      }else if(userDetail?.files?.avatar?.length > 0){
        avatar =  userDetail?.files?.avatar[userDetail?.files?.avatar?.length - 1]?.url;
      }else if(userDetail?.files?.canu_avatar?.length > 0){
          avatar =  userDetail?.files?.canu_avatar[userDetail?.files?.canu_avatar?.length - 1]?.url;
      }
      let serviceName = [];
		  for (let i of userDetail.service) {
		    let idx = categories.map(function (item) {
          return item.id
        }).indexOf(i);
		    console.log(idx)
        if (idx !== -1) {
		      serviceName.push(categories[idx].title)
        }
      }
      console.log(serviceName)
      serviceName = serviceName.join(" + ");
		  let name = userDetail.name || `${userDetail.firstName || ""} ${userDetail.lastName || ""}`;
      let na = this.getNation(userDetail.nationalService);
      let area = userDetail.areaService;
		  return <div className="user-detail-page">
        <div className="single-page-header freelancer-header" data-background-image="/images/single-freelancer.jpg">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="single-page-header-inner">
                  <div className="left-side">
                    <div className="header-image freelancer-avatar">
                      <img src={avatar || NoImageUser } alt="" />
                    </div>
                    <div className="header-details">
                      <h3>{name}</h3>
                      <ul>
                        <li><div className="star-rating" data-rating={userDetail.rating || 0} /></li>
                        <li>{na}</li>
                        <li><div className="verified-badge-with-title">Verified</div></li>
                      </ul>
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
                <h3 className="margin-bottom-25">{userDetail.title}</h3>
                <p className="policy">{userDetail.description}</p>
              </div>
              <div className="boxed-list margin-bottom-60">
                <div className="boxed-list-headline">
                  <h3><i className="icon-material-outline-thumb-up"></i> Work History and Feedback</h3>
                </div>
                <ul className="boxed-list-ul">
                  {
                    reviewList.map((item, index) => {
                      return <li key={"review-"+index}>
                        <div className="boxed-list-item">
                          <div className="item-content">
                            <h4>{item.jobTitle}<span><img style={{ width: '20px' }} src={item.avatar} /> {item.name}</span></h4>
                            <div className="item-details margin-top-10">
                              <div className="star-rating" data-rating={item.rating}></div>
                            </div>
                            <div className="item-description">
                              <p>{item.content}</p>
                            </div>
                          </div>
                        </div>
                      </li>
                    })
                  }
                </ul>

                <div className="clearfix"></div>
                <div className="pagination-container margin-top-40 margin-bottom-10">
                  <nav className="pagination">
                    <ul>
                      {
                        page > 1 ?  <li className="pagination-arrow"><a href="#" className="ripple-effect"><i className="icon-material-outline-keyboard-arrow-left"></i></a></li> : null
                      }
                      {
                        pages.map((item, index) => {
                          return  <li key={"page-"+index}>
                            <a data-page={item} onClick={this.handlePagination} className={item === page ? "ripple-effect current-page" : "ripple-effect"}>{item}</a>
                          </li>
                        })
                      }
                      {
                        pages.length > 3 ?  <li className="pagination-arrow"><a href="#" className="ripple-effect"><i className="icon-material-outline-keyboard-arrow-right"></i></a></li> : null
                      }
                    </ul>
                  </nav>
                </div>
                <div className="clearfix"></div>

              </div>
              {/*<div className="boxed-list margin-bottom-60">*/}
                {/*<div className="boxed-list-headline">*/}
                  {/*<h3><i className="icon-material-outline-business"></i> Employment History</h3>*/}
                {/*</div>*/}
                {/*<ul className="boxed-list-ul">*/}
                  {/*<li>*/}
                    {/*<div className="boxed-list-item">*/}
                      {/*<div className="item-image">*/}
                        {/*<img src="images/browse-companies-03.png" alt=""/>*/}
                      {/*</div>*/}

                      {/*<div className="item-content">*/}
                        {/*<h4>Development Team Leader</h4>*/}
                        {/*<div className="item-details margin-top-7">*/}
                          {/*<div className="detail-item"><a href="#"><i className="icon-material-outline-business"></i> Acodia</a></div>*/}
                          {/*<div className="detail-item"><i className="icon-material-outline-date-range"></i> May 2019 - Present</div>*/}
                        {/*</div>*/}
                        {/*<div className="item-description">*/}
                          {/*<p>Focus the team on the tasks at hand or the internal and external customer requirements.</p>*/}
                        {/*</div>*/}
                      {/*</div>*/}
                    {/*</div>*/}
                  {/*</li>*/}
                  {/*<li>*/}
                    {/*<div className="boxed-list-item">*/}
                      {/*<div className="item-image">*/}
                        {/*<img src="images/browse-companies-04.png" alt="" />*/}
                      {/*</div>*/}

                      {/*<div className="item-content">*/}
                        {/*<h4><a href="#">Lead UX/UI Designer</a></h4>*/}
                        {/*<div className="item-details margin-top-7">*/}
                          {/*<div className="detail-item"><a href="#"><i className="icon-material-outline-business"></i> Acorta</a></div>*/}
                          {/*<div className="detail-item"><i className="icon-material-outline-date-range"></i> April 2014 - May 2019</div>*/}
                        {/*</div>*/}
                        {/*<div className="item-description">*/}
                          {/*<p>I designed and implemented 10+ custom web-based CRMs, workflow systems, payment solutions and mobile apps.</p>*/}
                        {/*</div>*/}
                      {/*</div>*/}
                    {/*</div>*/}
                  {/*</li>*/}
                {/*</ul>*/}
              {/*</div>*/}

            </div>

            <div className="col-xl-4 col-lg-4">
              <div className="sidebar-container">
                <div className="profile-overview">
                  <div className="overview-item"><span> {t('Price')}</span><strong>{convertNumberToHaveCommas(userDetail?.price)} {userDetail.currency}</strong></div>
                  <div className="overview-item"><span>Job complete</span><strong>{userDetail.finishedJob || 0 }</strong></div>
                  <div className="overview-item"><span>Location</span><strong>({na}, {area})</strong></div>
                </div>

                <div className="button-container margin-bottom-20">
                  <a href="" onClick={this.goToChat2} className="apply-now-button">
                    Chat <i className="icon-material-outline-arrow-right-alt"/>
                  </a>
                  {
                    userId != profile.id && <span>
                     {
                       isFavourite ? <i onClick={this.handleFavourite} className="active btn-icon icon-line-awesome-heart"/> :  <i onClick={this.handleFavourite} className="btn-icon icon-line-awesome-heart-o"/>
                     }
                  </span>
                  }

                </div>

                <div className="sidebar-widget">
                  <div className="freelancer-indicators">
                    <div className="indicator">
                      <strong>88%</strong>
                      <div className="indicator-bar" data-indicator-percentage="88"><span></span></div>
                      <span>Job Success</span>
                    </div>
                    <div className="indicator">
                      <strong>100%</strong>
                      <div className="indicator-bar" data-indicator-percentage="100"><span></span></div>
                      <span>Satisfaction</span>
                    </div>
                    <div className="indicator">
                      <strong>90%</strong>
                      <div className="indicator-bar" data-indicator-percentage="90"><span></span></div>
                      <span>On Time</span>
                    </div>
                  </div>
                </div>
                <div className="sidebar-widget">
                  <h3>﻿Regulations about cancellation & refund</h3>
                  <div className=" margin-top-25">
                    <p className="policy">{userDetail.policy}</p>
                  </div>
                </div>
                <div className="sidebar-widget">
                  <h3>Service</h3>
                  <div className="task-tags">
                    {userDetail.service.map(item => {
                      let idxSN = categories.map(function (sv) {
                        return sv.id
                      }).indexOf(item);
                      if (idxSN !== -1) {
                        return <span>{categories[idxSN].title}</span>
                      }

                    })}
                  </div>
                </div>


              </div>
            </div>

          </div>
        </div>
      </div>
    }
	}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(JobDetail);
