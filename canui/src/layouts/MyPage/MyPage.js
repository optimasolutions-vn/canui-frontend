import React from 'react';
import ReactDOM from "react-dom"
import { connect } from 'react-redux';
import langConst from '../../libs/lang';
import '../../assets/scss/customStyleInMyPage.scss';
import { runScript } from './runScript';
import {Link} from 'react-router-dom';
import UrlPath from '../../libs/UrlPath';
import CommingSoon from './CommingSoon';
import Messages from '../Message'
import Notification from '../NotificationList'
import Favourite from '../Favourite'
import {checkIsCanIState, swapIsCanIState} from '../../helpers';
import MainTest from './MainTest';
import JobPost from '../JobPost';
import JobList from './JobList';
import Review from '../Review';
import Checkout from '../Checkout';
import { Popup, Alert} from '../Scripts/ManualScript';
import otherServices from '../../services/otherServices';
import Loader from '../../components/effects/Loader';
import Profile from '../Profile';
const _t = {
    cani: {
        btn: 'Switch To CanI',
        title: 'CanU'
    },
    canu: {
        btn: 'Switch To CanU',
        title: 'CanI'
    }
};
const _timeDelay = 2000;
const mapStateToProps = state => ({
    user: state.user,
    siteData: state.siteData,
    totalUnread: state.notification.totalUnread,
    notificationUnread: state.notification.notificationUnread,
});
class MyPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            currentPage: false,
            isLoadingJob: true,
            currentUserIsCanI: checkIsCanIState(),
            TextCurCan: !!checkIsCanIState() ? _t.canu.btn : _t.cani.btn,
            TextCurCanTitle: !!checkIsCanIState() ? _t.canu.title : _t.cani.title,
            JobsByCanUI: false,
            ratingCriteria: []
        };
        this.timeNow = Date.now();
    };
    async componentDidMount(){
        runScript();
        this.getParams();
        this.getJobsByFilter(this.state.currentUserIsCanI);
        await this.getRatingCriteria();
    };
    getParams = () => {
        let _slug = this.props.match?.params?.slug || '';
        this.setState({
            currentPage: _slug
        })
    }
    componentDidUpdate(prevProps, prevState){
        if(prevProps.match?.params?.slug !== this.props.match?.params?.slug){
            this.getParams();
        }
    };
    renderContentPage = (_currentPage) => {
        let comp;
        switch(_currentPage){
            case 'PostRequest':
                comp = <div><JobPost {...this.props} /></div>;
                break;
            case 'JobsPosting':
                comp = <div>{this.renderComponentJobList('pending', this.state.JobsByCanUI, 'Jobs Posting')}</div>;
                break;
            case 'JobsInProgress':
                comp = <div>{this.renderComponentJobList('processing', this.state.JobsByCanUI, 'Jobs In Process')}</div>;
                break;
            case 'JobsCompleted':
                comp = <div>{this.renderComponentJobList('completed', this.state.JobsByCanUI, 'Jobs Completed')}</div>;
                break;
            case 'Jobs':
                comp = <div><MainTest {...this.props} /></div>;
                break;
            case 'Message':
                comp = <div><Messages {...this.props} /></div>;
                break;
            case 'Favourite':
                comp = <div><Favourite {...this.props} /></div>;
                break;
            case 'Notification':
                comp = <div><Notification {...this.props} /></div>;
                break;
            case 'Settings':
                comp = <div><Profile {...this.props} /></div>;
                break;
            case 'Review':
                comp = <div><Review {...this.props} /></div>;
                break;
            case 'Payment':
                comp = <div><Checkout {...this.props} /></div>;
                break;
            default:
                comp = <div><CommingSoon {...this.props} /></div>;
                break;
        }
        return comp;
    }

    renderComponentJobList = (_status, _listData, _title) => {
        if(!_listData || _listData?.length <= 0 || !_status || !_title){
            return null;
        }

        let _data = {};
        _data.content = _listData.filter(x => x?.status?.toLowerCase() === _status);
        _data.status =  _status;
        _data.isCanIJob = this.state.currentUserIsCanI;
        return (
            <div>
                <JobList
                    ratingCriteria={this.state.ratingCriteria}
                    JobsData={_data}
                    JobsStatus={_status}
                    PageTitle={_title}
                    callBackUpdateJobs={res => this.handleMinusJobs(res)}
                    {...this.props}
                    />
            </div>
        );
    }

    handleMinusJobs = (res) => {
        let _curt = checkIsCanIState();
        this.setState({
            isLoadingJob: true,
        }, () => {
            this.getJobsByFilter(_curt);
        })
    }

    handleSwapCanUI = (e) => {
        e.preventDefault();
        if(!this.state.currentUserIsCanI && !this.props?.user?.profile?.caniId){
            this.props.history.push({
                pathname: `${UrlPath.RegisterCanI}`,
            })
            return;
        }
        if((Date.now() - this.timeNow) < _timeDelay || this.state.isLoadingJob){
            Alert({
                title: `You act too quickly !!!`
            })
            return false;
        }

        this.timeNow = Date.now();
        let _curt = swapIsCanIState();
        this.props.history.push({
            pathname: `${UrlPath.MyPageDashboard}`,
        })
        this.setState({
            isLoadingJob: true,
        }, () => {
            this.getJobsByFilter(_curt);
        })
    }
    getJobsByFilter = async (_isCanI) => {
        let _list;
        let _op = {
            page: 0,
            size: 1000,
            sort: 'createdAt,desc',
        };

        if(_isCanI){
            _op.pickupUserId = this.props?.user?.profile?.id;
        }else{
            _op.owner = this.props?.user?.profile?.id;
        }

        _list = await otherServices.getJobsList(_op);
        this.setState({
            currentUserIsCanI: _isCanI,
            TextCurCan: _isCanI ? _t.canu.btn : _t.cani.btn,
            TextCurCanTitle: _isCanI ? _t.canu.title : _t.cani.title,
            isLoadingJob: false,
            JobsByCanUI: _list?.data?.content || false,
        })

    }
    getRatingCriteria = async () => {
      let response = await otherServices.getRatingCriteria();
      if (response && response.status) {
          this.setState({
            ratingCriteria: response.data
          })
      }
    };
    CountJobWithStatus = (_list, _status) => {
        if(!_list || !_status){
            return 0;
        }
        return _list.reduce((x, y) => (y.status === _status ? x+1 : x), 0);
    }
    handleToggleList = (e) => {
        e.preventDefault();
        console.log()
    };
    renderTitle = () => {
      let {t} = this.props;
      let isCanI = sessionStorage.getItem('IsCanIState');
      if (!isCanI) {
          return t('Job posting')
      } else {
          return t('Job applying')
      }
    };
    render(){
        const {t, totalUnread, notificationUnread} = this.props;
        return(
            <div className="dashboard-container">
                <div className="dashboard-sidebar">
                    <div className="dashboard-sidebar-inner" data-simplebar>
                        <div className="dashboard-nav-container">
                            <Link to={`#`} className="dashboard-responsive-nav-trigger">
                                <span className="hamburger hamburger--collapse" >
                                    <span className="hamburger-box">
                                        <span className="hamburger-inner"></span>
                                    </span>
                                </span>
                                <span className="trigger-title">Dashboard Navigation</span>
                            </Link>
                            <div className="dashboard-nav">
                                <div className="dashboard-nav-inner">
                                    <ul data-submenu-title="Start">
                                        <li><Link to={`${UrlPath.MyPageDashboard}`}><i className="icon-material-outline-dashboard"></i> {t('Dashboard')}</Link></li>
                                        <li><Link to={`${UrlPath.MyPageNotification}`}><i className="icon-feather-bell"></i> {t('Notification')} {notificationUnread > 0 ? <span className="nav-tag">{notificationUnread}</span> : null}</Link></li>
                                        <li><Link to={`${UrlPath.MyPageMessage}`}><i className="icon-material-outline-question-answer"></i> {t('Messages')} {totalUnread > 0 ? <span className="nav-tag">{totalUnread}</span> : null}</Link></li>
                                        <li><Link to={`${UrlPath.MyPageReferFriend}`}><i className="icon-material-outline-group"></i> {t('Refer a friend')}</Link></li>
                                        <li><Link to={`${UrlPath.MyPageReview}`}><i className="icon-material-outline-rate-review"></i> {t('Reviews')}</Link></li>
                                        <li><Link to={`${UrlPath.MyPageCouponAds}`}><i className="icon-line-awesome-ticket"></i> {t('Coupon / Ads')}</Link></li>
                                    </ul>
                                    <ul data-submenu-title={t(`${this.state.TextCurCanTitle}`)}>
                                        {this.state.currentUserIsCanI && (
                                            <li><Link to={`${UrlPath.RegisterCanI}`}><i className="icon-line-awesome-registered"></i> {t('Register CanI')}</Link></li>
                                        )}
                                        {!this.state.currentUserIsCanI && (
                                            <>
                                            <li><Link to={`${UrlPath.MyPageFavourite}`}><i className="icon-material-outline-favorite-border"></i> {t('Favourite list')}</Link></li>
                                            <li><Link to={`${UrlPath.MyPagePostRequest}`}><i className="icon-feather-folder-plus"></i> {t('Post request')}</Link></li>
                                            </>
                                        )}
                                    </ul>
                                    {!this.state.isLoadingJob && this.state.JobsByCanUI?.length > 0 && (
                                        <ul data-submenu-title={t('My Jobs')}>
                                            <li className={this.props.location.pathname === `${UrlPath.MyPageJobsPosting}` ? 'active' : ''}><Link to={`${UrlPath.MyPageJobsPosting}`}>{this.renderTitle()} <span className="nav-tag">{this.CountJobWithStatus(this.state.JobsByCanUI, 'PENDING')}</span></Link></li>
                                            <li className={this.props.location.pathname === `${UrlPath.MyPageJobsInProgress}` ? 'active' : ''}><Link to={`${UrlPath.MyPageJobsInProgress}`}>{t('Jobs in process')} <span className="nav-tag">{this.CountJobWithStatus(this.state.JobsByCanUI, 'PROCESSING')}</span></Link></li>
                                            <li className={this.props.location.pathname === `${UrlPath.MyPageJobsCompleted}` ? 'active' : ''}><Link to={`${UrlPath.MyPageJobsCompleted}`}>{t('Jobs completed')} <span className="nav-tag">{this.CountJobWithStatus(this.state.JobsByCanUI, 'COMPLETED')}</span></Link></li>

                                        </ul>
                                    )}
                                    <ul data-submenu-title={t('Payment')}>
                                        {this.state.currentUserIsCanI && (
                                            <>
                                            <li><Link to={`${UrlPath.MyPagePayment}`}><i className="icon-material-outline-history"></i> {t('Payment History')}</Link></li>
                                            </>
                                        )}
                                        {!this.state.currentUserIsCanI && (
                                            <>
                                            <li><Link to={`${UrlPath.MyPagePayment}`}><i className="icon-material-outline-account-balance-wallet"></i> {t('Checkout / Refund')}</Link></li>
                                            <li><a href="#"><i className="icon-material-outline-input"></i> {t('Deposit')}</a></li>
                                            </>

                                        )}
                                    </ul>

                                    <div className="btn-in-sidebar">
                                        <a onClick={this.handleSwapCanUI} href="#" className="button small ripple-effect button-sliding-icon">{t(`${this.state.TextCurCan}`)}<i class="icon-feather-arrow-right"></i></a>
                                    </div>
                                    <ul data-submenu-title="Account">
                                        <li className={this.props.location.pathname === `${UrlPath.MyPageSettings}` ? 'active' : ''}><Link to={`${UrlPath.MyPageSettings}`}><i className="icon-material-outline-settings"></i> {t('Settings')}</Link></li>
                                        <li><a href="#"><i className="icon-material-outline-power-settings-new"></i> {t('Logout')}</a></li>
                                    </ul>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="dashboard-content-container customstyle" data-simplebar>
                {this.renderContentPage(this.state.currentPage)}
                </div>
                {this.state.isLoadingJob && <Loader />}
            </div>
        );
    }
};

export default connect(
    mapStateToProps
)(MyPage);
