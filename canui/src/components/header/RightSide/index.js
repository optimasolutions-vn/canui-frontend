import React, {useState, Component} from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import UrlPath from '../../../libs/UrlPath';
import { useTranslation } from "react-i18next";
import {checkIsCanIState, swapIsCanIState} from '../../../helpers';
import NotificationMessage from '../NotificationMessage';
import {
  actionLogout,
  actionGetUserProfile
} from '../../../actions/actionUser';
import './style.scss';

const mapStateToProps = state => ({
  login: state.login,
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  onLogout: () => dispatch(actionLogout()),
  onLoad: () => dispatch(actionGetUserProfile())
});
const $ = window.$;

function runScript(){
  $("a.close").removeAttr("href").on('click', function(){
    function slideFade(elem) {
      var fadeOut = { opacity: 0, transition: 'opacity 0.5s' };
      elem.css(fadeOut).slideUp();
    }
    slideFade($(this).parent());
  });

  /*--------------------------------------------------*/
  /*  Notification Dropdowns
  /*--------------------------------------------------*/
  $(".header-notifications").each(function() {
    var userMenu = $(this);
    var userMenuTrigger = $(this).find('.header-notifications-trigger a');

    $(userMenuTrigger).on('click', function(event) {
      event.preventDefault();

      if ( $(this).closest(".header-notifications").is(".active") ) {
        close_user_dropdown();
      } else {
        close_user_dropdown();
        userMenu.addClass('active');
      }
    });
  });

  // Closing function
  function close_user_dropdown() {
    $('.header-notifications').removeClass("active");
  }

  // Closes notification dropdown on click outside the conatainer
  var mouse_is_inside = false;

  $( ".header-notifications" ).on( "mouseenter", function() {
    mouse_is_inside=true;
  });
  $( ".header-notifications" ).on( "mouseleave", function() {
    mouse_is_inside=false;
  });

  $("body").mouseup(function(){
    if(! mouse_is_inside) close_user_dropdown();
  });

  // Close with ESC
  $(document).keyup(function(e) {
    if (e.keyCode == 27) {
      close_user_dropdown();
    }
  });
  if ($('.status-switch label.user-invisible').hasClass('current-status')) {
    $('.status-indicator').addClass('right');
  }

  $('.status-switch label.user-invisible').on('click', function(){
    $('.status-indicator').addClass('right');
    $('.status-switch label').removeClass('current-status');
    $('.user-invisible').addClass('current-status');
  });

  $('.status-switch label.user-online').on('click', function(){
    $('.status-indicator').removeClass('right');
    $('.status-switch label').removeClass('current-status');
    $('.user-online').addClass('current-status');
  });
};

class RightSide extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    let { onLoad } = this.props;
    runScript();
    onLoad();
  }
  handleLogout = (e) => {
    e.preventDefault();
    let {onLogout, setIsAuthenticated, history} = this.props;
    onLogout();
    history.push({
      pathname: `${UrlPath.Home}`,
      search: '',
      state: ''
    });
    setTimeout(() => {
      setIsAuthenticated(false)
    }, 500);
    //window.location.reload();
  };
  redirectToPage = (page, e ) =>{
    console.log(e, page)
    e.preventDefault();
    let {history} = this.props;
    window.location.href = '/profiles'
  };
  handleSwitchUserType = () => {
    let currentStatus = checkIsCanIState();
    let status = swapIsCanIState();
    if (status !== currentStatus) {
      window.location.reload();
    }
  }
  render () {
    let {t} = this.props;
    let { profile, totalUnread } = this.props.user;
    let name = '';
    if (profile.firstName || profile.lastName) {
      name = `${profile.firstName + ' ' + profile.lastName}`
    }
    return (
    <React.Fragment>
      <NotificationMessage />
      <div className="header-widget">


        <div className="header-notifications user-menu">
          <div className="header-notifications-trigger">
            <a href="#">
              <div className="user-avatar status-online">
                <img src={profile.avatar || "/images/user-avatar-small-01.jpg"} alt="" />
              </div>
            </a>
          </div>


          <div className="header-notifications-dropdown">


            <div className="user-status">


              <div className="user-details">
                <div className="user-avatar status-online">
                  <img src={profile.avatar || "/images/user-avatar-small-01.jpg"} alt="" />
                </div>
                <div className="user-name">
                  {name || "Anonymous"} <span>Users</span>
                </div>
              </div>


              <div className="status-switch" id="snackbar-user-status">
                <label onClick={this.handleSwitchUserType} className={!checkIsCanIState() ? "user-online current-status" : "user-online"}>CanU</label>
                <label onClick={this.handleSwitchUserType} className={checkIsCanIState() ? "user-invisible current-status" : "user-invisible"}>CanI</label>
                <span className="status-indicator" aria-hidden="true" />
              </div>
            </div>

            <ul className="user-menu-small-nav">
              <li>
                <Link to={`${UrlPath.CanI}`}>
                  <i className="icon-material-outline-dashboard" />
                  CanI
                </Link>
              </li>
              <li>
                <Link to={`${UrlPath.MyPageSettings}`} >
                  <i className="icon-material-outline-settings"/>
                  {t("Settings")}
                </Link>
              </li>
              <li>
                <Link to={`${UrlPath.MyPage}`} >
                  <i className="icon-material-outline-settings"/>
                  {t("MyPage")}
                </Link>
              </li>
              <li>
                <a href="" onClick={this.handleLogout}>
                  <i className="icon-material-outline-power-settings-new" />
                  Logout
                </a>
              </li>
            </ul>

          </div>
        </div>

      </div>

    </React.Fragment>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RightSide);

