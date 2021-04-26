import React, {useState, Component} from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import { useTranslation } from "react-i18next";
import UrlPath from '../../libs/UrlPath';
import Loader from '../../components/effects/Loader';
import { actionGetNotificationDetail } from '../../actions/actionNotification';

import './style.scss';

const mapStateToProps = state => ({
 user: state.user,
  isLoadingDetail: state.notification.isLoadingDetail,
  notification: state.notification.notification
});
const $ = window.$;
const runScript = () => {
  function avatarSwitcher() {
    var readURL = function(input) {
      if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
          $('.profile-pic').attr('src', e.target.result);
        };

        reader.readAsDataURL(input.files[0]);
      }
    };

    $(".file-upload").on('change', function(){
      readURL(this);
    });

    $(".upload-button").on('click', function() {
      $(".file-upload").click();
    });
  } avatarSwitcher();
}
const mapDispatchToProps = dispatch => ({
  onLoad: (params) => dispatch(actionGetNotificationDetail(params)),
});

class NotificationDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notificationId: this.props?.match?.params?.id || false
    }
  }
  componentDidMount(){
    runScript();
    this.firstLoad();
  }
  componentDidUpdate(prevState, prevProps){
    if(this.state.notificationId !== this.props.match.params.id){
      this.setState({
        notificationId: this.props?.match?.params?.id
      }, () => {
        this.firstLoad()
      });
    } 
  }
  firstLoad = () => {
    let {onLoad} = this.props;
    onLoad({
      notificationId: this.state.notificationId
    });
  }
  renderContent = (noti) => {
    return <div dangerouslySetInnerHTML={{__html: noti.data}}></div>
  }
  render () {
    let { isLoadingDetail, notification } = this.props;
    return (
      <div className="dashboard-content-container">
        
        <div className="dashboard-content-inner" >


          <div className="row">

            <div className="col-xl-12">
              <div className="dashboard-box margin-top-0">

                <div className="headline">
                  <h3><i className="icon-material-outline-account-circle" />{notification.title}</h3>
                </div>

                <div className="content with-padding padding-bottom-30">
                  {
                    notification.data ? this.renderContent(notification) : "No data"
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
)(NotificationDetail);

