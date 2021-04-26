import React, {useState, Component} from 'react';
import { connect } from 'react-redux';
import Loader from '../../components/effects/Loader';
import {runScript, numberWithCommas} from "../../libs/templateJs";
import PostDataCountries from '../../helpers/PostDataCountries';
import InfiniteScroll from "react-infinite-scroll-component";
import {getNationList} from "../../helpers/DataAccess";
import './style.scss';
import {
  actionGetListFavourite
} from '../../actions/actionFavourite'
const mapStateToProps = state => ({
  user: state.user,
  favourite: state.favourite,
  siteData: state.siteData
});
const $ = window.$;
const mapDispatchToProps = dispatch => ({
  onload: (params) => dispatch(actionGetListFavourite(params)),
});

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      size: 3,
      isLoadingMore: false
    }
  }
  componentDidMount(){
    this.props.onload({
      page: this.state.page,
      size: this.state.size
    });
    runScript();
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.favourite.isLoading && !this.props.favourite.isLoading) {
      window.starRating('.star-rating');
    }
  }
  getNation = (code) => {
    return getNationList().filter(x => x.countryId == code)[0]?.countryName;
  };
  render () {
    let { isLoading, favouriteList } = this.props.favourite;
    let { categories } = this.props.siteData;
    let { t } = this.props
    return (
      <div className="dashboard-content-container margin-bottom-20">
        {
          isLoading &&  <Loader/>
        }
        <div className="dashboard-content-inner" >

          <div className="dashboard-box margin-top-0">

            <div className="headline">
              <h3><i className="icon-material-outline-account-circle" />{t("Favourite List")}</h3>
            </div>

            <div className="content padding-bottom-0">
              <div className="row">

                <div className="col-xl-12">
                  <div className="freelancers-container freelancers-list-layout compact-list">
                    <InfiniteScroll
                      dataLength={10}
                      // next={props.handleFetchMoreData}
                      // hasMore={props.hasMore}
                      scrollableTarget={"compact-list"}
                    >
                      {
                        favouriteList.map(item => {
                          let avatar = "";
                          if (item.files && Object.keys(item.files).length !== 0) {
                            if (item.files.cani_avatar) {
                              avatar = item.files.cani_avatar[0].url
                            }
                          }
                          let serviceName = [];
                          for (let i of item.service) {
                            let idx = categories.map(function (item) {
                              return item.id
                            }).indexOf(i);
                            console.log(idx)
                            if (idx !== -1) {
                              serviceName.push(categories[idx].title)
                            }
                          }
                          serviceName = serviceName.join(" + ");
                          let na = this.getNation(item.national);
                          return <div className="freelancer">

                            <div className="freelancer-overview">
                              <div className="freelancer-overview-inner">
                                <span className="bookmark-icon"></span>

                                <div className="freelancer-avatar">
                                  {/*<div className="verified-badge"></div>*/}
                                  <a href=""><img src={avatar || "/images/user-avatar-big-01.jpg"} alt=""/></a>
                                </div>

                                <div className="freelancer-name">
                                  <h4><a href={`/users/${item.id}`}>{item.name}</a></h4>
                                  <span>{serviceName}</span>
                                  <div className="freelancer-rating">
                                    <div className="star-rating" data-rating="4.9"></div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="freelancer-details">
                              <div className="freelancer-details-list">
                                <ul>
                                  <li>Location <strong><i className="icon-material-outline-location-on"></i> {na}</strong></li>
                                  <li>Rate <strong>{numberWithCommas(item.price)} / hr</strong></li>
                                  <li>Job Success <strong>{item.finishedJob || 0}</strong></li>
                                </ul>
                              </div>
                              <div className="clear-both"/>

                              <a href={`/users/${item.id}`} className="button button-sliding-icon ripple-effect">{t('View Profile')} <i className="icon-material-outline-arrow-right-alt"></i></a>
                            </div>
                          </div>
                        })
                      }
                    </InfiniteScroll>

                    {
                      favouriteList.length === 0 &&  <div className="empty-div">
                        {t('No data')}
                      </div>
                    }
                  </div>
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
)(Profile);

