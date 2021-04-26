import React, {useState, Component} from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import UrlPath from '../../../libs/UrlPath';
import { useTranslation } from "react-i18next";
import {
  actionLogout,
  actionGetUserProfile
} from '../../../actions/actionUser';
import './style.scss';

const mapStateToProps = state => ({
  login: state.login,
  user: state.user
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
  render () {
    let {t} = this.props;
    let { profile } = this.props.user;
    console.log(profile)
    return (
    <React.Fragment>
      <div className="header-widget hide-on-mobile">
        <div className="header-notifications">
          <div className="header-notifications-trigger">
            <a><i className="icon-feather-bell" />
              <span>4</span>
            </a>
          </div>
          <div className="header-notifications-dropdown">
            <div className="header-notifications-headline">
              <h4>Notifications</h4>
              <button className="mark-as-read ripple-effect-dark" title="Mark all as read" data-tippy-placement="left">
                <i className="icon-feather-check-square"/>
              </button>
            </div>

            <div className="header-notifications-content">
              <div className="header-notifications-scroll" data-simplebar>
                <ul>

                  <li className="notifications-not-read">
                    <a href="dashboard-manage-candidates.html">
                      <span className="notification-icon">
                        <i className="icon-material-outline-group"/>
                      </span>
                      <span className="notification-text">
															<strong>Michael Shannah</strong> applied for a job <span className="color">Full Stack Software Engineer</span>
														</span>
                    </a>
                  </li>


                  <li>
                    <a href="dashboard-manage-bidders.html">
                      <span className="notification-icon">
                        <i className=" icon-material-outline-gavel"/>
                      </span>
                      <span className="notification-text">
															<strong>Gilbert Allanis</strong> placed a bid on your <span className="color">iOS App Development</span> project
														</span>
                    </a>
                  </li>


                  <li>
                    <a href="dashboard-manage-jobs.html">
                      <span className="notification-icon">
                        <i className="icon-material-outline-autorenew"/>
                      </span>
                      <span className="notification-text">
															Your job listing <span className="color">Full Stack PHP Developer</span> is expiring.
														</span>
                    </a>
                  </li>


                  <li>
                    <a href="dashboard-manage-candidates.html">
                      <span className="notification-icon">
                        <i className="icon-material-outline-group"/></span>
                      <span className="notification-text">
															<strong>Sindy Forrest</strong> applied for a job <span className="color">Full Stack Software Engineer</span>
														</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>

          </div>

        </div>


        <div className="header-notifications">
          <div className="header-notifications-trigger">
            <a>
              <i className="icon-feather-mail"/>
              <span>3</span>
            </a>
          </div>


          <div className="header-notifications-dropdown">

            <div className="header-notifications-headline">
              <h4>Messages</h4>
              <button className="mark-as-read ripple-effect-dark" title="Mark all as read" data-tippy-placement="left">
                <i className="icon-feather-check-square" />
              </button>
            </div>

            <div className="header-notifications-content">
              <div className="header-notifications-scroll" data-simplebar>
                <ul>

                  <li className="notifications-not-read">
                    <a href="dashboard-messages.html">
                      <span className="notification-avatar status-online">
                        <img src="/images/user-avatar-small-03.jpg" alt="" />
                      </span>
                      <div className="notification-text">
                        <strong>David Peterson</strong>
                        <p className="notification-msg-text">Thanks for reaching out. I'm quite busy right now on many...</p>
                        <span className="color">4 hours ago</span>
                      </div>
                    </a>
                  </li>


                  <li className="notifications-not-read">
                    <a href="dashboard-messages.html">
                      <span className="notification-avatar status-offline">
                        <img src="/images/user-avatar-small-02.jpg" alt="" />
                      </span>
                      <div className="notification-text">
                        <strong>Sindy Forest</strong>
                        <p className="notification-msg-text">Hi Tom! Hate to break it to you, but I'm actually on vacation until...</p>
                        <span className="color">Yesterday</span>
                      </div>
                    </a>
                  </li>


                  <li className="notifications-not-read">
                    <a href="dashboard-messages.html">
                      <span className="notification-avatar status-online">
                        <img src="/images/user-avatar-placeholder.png" alt="" />
                      </span>
                      <div className="notification-text">
                        <strong>Marcin Kowalski</strong>
                        <p className="notification-msg-text">I received payment. Thanks for cooperation!</p>
                        <span className="color">Yesterday</span>
                      </div>
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <a href="dashboard-messages.html" className="header-notifications-button ripple-effect button-sliding-icon">View All Messages<i className="icon-material-outline-arrow-right-alt"></i></a>
          </div>
        </div>

      </div>

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
                  {profile.name || "Anonymous"} <span>Users</span>
                </div>
              </div>


              <div className="status-switch" id="snackbar-user-status">
                <label className="user-online current-status">Online</label>
                <label className="user-invisible">Invisible</label>
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
                <Link to={`${UrlPath.Profile}`} >
                  <i className="icon-material-outline-settings"/>
                  {t("Profile")}
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

