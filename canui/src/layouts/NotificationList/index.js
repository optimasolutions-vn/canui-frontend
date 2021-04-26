import React, {useState, Component} from 'react';
import { connect } from 'react-redux';
import Loader from '../../components/effects/Loader';
import {runScript, numberWithCommas} from "../../libs/templateJs";
import PostDataCountries from '../../helpers/PostDataCountries';
import {getNationList} from "../../helpers/DataAccess";
import NotifiactionService from '../../services/notificationServices';
import InfiniteScroll from "react-infinite-scroll-component";
import UrlPath from '../../libs/UrlPath';
import './style.scss';
import {
  actionGetListNotification
} from '../../actions/actionNotification';
function createMarkup(_html) {
  return {__html: `${_html}`};
}
const mapStateToProps = state => ({
  user: state.user,
  siteData: state.siteData,
  notificationList: state.notification.notificationList,
  isLoadingNotificationList: state.notification.isLoadingNotificationList
});
const $ = window.$;
const mapDispatchToProps = dispatch => ({
  onGetNotificationList: (params) => dispatch(actionGetListNotification(params)),
});

class NotificationList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      size: 10,
      notificationList: [],
      hasLoadMore: true
    }
  }
  componentDidMount(){
    this.props.onGetNotificationList({
      page: this.state.page,
      size: this.state.size
    });
    runScript();
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.isLoadingNotificationList && !this.props.isLoadingNotificationList) {
      this.setState({
        notificationList: this.props.notificationList
      })
    }
  }
  handleOnClick = (e, item) => {
    e.preventDefault();
    this.props.history.push({
      pathname: `${UrlPath.Notification}/${item.detailId}`,
      search:''
    })
  };
  handleLoadMore = async () => {
    let {isLoadingMore, hasLoadMore, page, size, notificationList} = this.state;
    if (!isLoadingMore && hasLoadMore) {
      page += 1;
      this.setState({
        isLoadingMore: true,
        page
      });
      let res = await NotifiactionService.getNotificationHistory({
        page,
        size
      });
      console.log(res.status, 124);
      if (res.status) {
        notificationList =  notificationList.concat(res.data.detail);
        console.log(notificationList)
       this.setState({
         isLoadingMore: false,
         notificationList,
         hasLoadMore: res.data.detail.length === size
       })
      } else {
        this.setState({
          isLoadingMore: false
        })
      }
    }
  }
  render () {
    let { isLoadingNotificationList } = this.props;
    let { notificationList } = this.state;
    return (
      <div className="dashboard-content-container margin-bottom-20">
        {
          isLoadingNotificationList &&  <Loader/>
        }
        <div className="dashboard-content-inner" >

          <div className="dashboard-box margin-top-0">

            <div className="headline">
              <h3><i className="icon-material-outline-account-circle" /> Notification List</h3>
            </div>

            <div className="content padding-bottom-0">
              <div className="row">

                <div className="col-xl-12">
                  <InfiniteScroll
                    dataLength={notificationList.length}
                    next={this.handleLoadMore}
                    hasMore={this.state.hasLoadMore}
                    scrollableTarget={"dashboard-content-inner"}
                  >
                  <div className="freelancers-container freelancers-list-layout compact-list">

                      {
                        notificationList.map(item => {
                          return <div className="freelancer">
                            <div className="freelancer-overview" onClick={e => this.handleOnClick(e, item)}>
                              <div className="freelancer-overview-inner">
                                <div className="freelancer-name" dangerouslySetInnerHTML={createMarkup(item.description)}/>
                              </div>
                            </div>
                          </div>
                        })
                      }

                    {
                      notificationList.length === 0 &&  <div className="empty-div">
                        No data
                      </div>
                    }
                  </div>
                  </InfiniteScroll>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NotificationList);

