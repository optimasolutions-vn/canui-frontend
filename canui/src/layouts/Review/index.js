import React, {useState, Component} from 'react';
import { connect } from 'react-redux';
import Loader from '../../components/effects/Loader';
import {runScript} from "../../libs/templateJs";
import PostDataCountries from '../../helpers/PostDataCountries';
import {getNationList} from "../../helpers/DataAccess";
import ReviewService from "../../services/reviewServices"
import InfiniteScroll from "react-infinite-scroll-component";
import {checkIsCanIState} from "../../helpers"
import './style.scss';
import {
  actionGetListReview
} from '../../actions/actionReview'
const mapStateToProps = state => ({
  user: state.user,
  review: state.review,
  siteData: state.siteData
});
const $ = window.$;
const mapDispatchToProps = dispatch => ({
  onLoad: (params) => dispatch(actionGetListReview(params)),
});

class Review extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      reviewList: [],
      size: 10,
      hasLoadMore: true
    }
  }
  componentDidMount(){
    this.props.onLoad({
      userId: this.props.user.profile.id,
      page: this.state.page,
      size: this.state.size,
      isCanI: checkIsCanIState()
    });
    runScript();
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.review.isLoading && !this.props.review.isLoading) {
     this.setState({
       reviewList: this.props.review.reviewList
     }, () => {
       window.starRating('.star-rating');
     })
    }
  }
  handleLoadMore = async () => {
    let {isLoadingMore, hasLoadMore, page, size, reviewList} = this.state;
    if (!isLoadingMore && hasLoadMore) {
      page += 1;
      this.setState({
        isLoadingMore: true,
        page
      });
      let res = await ReviewService.getReviewList({
        page,
        size,
        isCanI: checkIsCanIState()
      });
      if (res.status) {
        reviewList =  reviewList.concat(res.data.content);
        this.setState({
          isLoadingMore: false,
          reviewList,
          hasLoadMore: res.data.content.length === size
        })
      } else {
        this.setState({
          isLoadingMore: false
        })
      }
    }
  }
  render () {
    let { isLoading } = this.props.review;
    let { reviewList } = this.state;
    let { categories } = this.props.siteData;
    return (
      <div className="dashboard-content-container margin-bottom-20">
        {
          isLoading &&  <Loader/>
        }
        <div className="dashboard-content-inner" >

          <div className="dashboard-box margin-top-0">

            <div className="headline">
              <h3><i className="icon-material-outline-account-circle" /> Reviewed List</h3>
            </div>

            <div className="content padding-bottom-0">
              <div className="row">

                <div className="col-xl-12 boxed-list">
                  <InfiniteScroll
                    dataLength={reviewList.length}
                    next={this.handleLoadMore}
                    hasMore={this.state.hasLoadMore}
                    scrollableTarget={"dashboard-content-inner"}
                  >
                  <ul className="boxed-list-ul">
                    {
                      reviewList.map((item, index) => {
                        return <li key={index}>
                          <div className="boxed-list-item">
                            <div className="item-content">
                              <h4>{item.jobTitle}<span><img style={{ width: '20px' }} src={item.avatar} /> {item.name}</span></h4>
                              <div className="item-details margin-top-10">
                                <div className="star-rating" data-rating="5.0"></div>
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
                  </InfiniteScroll>
                  {
                    reviewList.length === 0 &&  <div className="empty-div">
                      No data
                    </div>
                  }
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
)(Review);

