import React, { Component, useState } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import ReCAPTCHA from "react-google-recaptcha";
import Validation from '../../../helpers/Validation';
import Loader from '../../../components/effects/Loader';
import {
  actionRegister,
  actionLogin,
  actionLoginSocial,
  actionGetUserProfile
} from '../../../actions/actionUser';
import {
  sendForgotPassword
} from '../../../services/userService';
import FaceBookButton from '../../socialButton/FacebookButton';
import GoogleButton from '../../socialButton/GoogleButton';
//import '../../assets/scss/header.scss';

// when handle some action need to call child-component, not call as direct

const mapStateToProps = state => ({
  login: state.login
});

const mapDispatchToProps = dispatch => ({
  onRegister: (params) => dispatch(actionRegister(params)),
  onLogin: (params) => dispatch(actionLogin(params)),
  onLoginSocial: (params) => dispatch(actionLoginSocial(params)),
  onGetProfile: () => dispatch(actionGetUserProfile())
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
  $('.mfp-gallery-container').each(function() { // the containers for all your galleries

    $(this).magnificPopup({
      type: 'image',
      delegate: 'a.mfp-gallery',

      fixedContentPos: true,
      fixedBgPos: true,

      overflowY: 'auto',

      closeBtnInside: false,
      preloader: true,

      removalDelay: 0,
      mainClass: 'mfp-fade',

      gallery:{enabled:true, tCounter: ''}
    });
  });

  $('.popup-with-zoom-anim').magnificPopup({
    type: 'inline',

    fixedContentPos: false,
    fixedBgPos: true,

    overflowY: 'auto',

    closeBtnInside: true,
    preloader: false,

    midClick: true,
    removalDelay: 300,
    mainClass: 'my-mfp-zoom-in',
  });

  $('.mfp-image').magnificPopup({
    type: 'image',
    closeOnContentClick: true,
    mainClass: 'mfp-fade',
    image: {
      verticalFit: true
    }
  });

  $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
    disableOn: 700,
    type: 'iframe',
    mainClass: 'mfp-fade',
    removalDelay: 160,
    preloader: false,

    fixedContentPos: false
  });
  var $tabsNav    = $('.popup-tabs-nav'),
    $tabsNavLis = $tabsNav.children('li');

  $tabsNav.each(function() {
    var $this = $(this);

    $this.next().children('.popup-tab-content').stop(true,true).hide().first().show();
    $this.children('li').first().addClass('active').stop(true,true).show();
  });

  $tabsNavLis.on('click', function(e) {
    var $this = $(this);

    $this.siblings().removeClass('active').end().addClass('active');

    $this.parent().next().children('.popup-tab-content').stop(true,true).hide()
      .siblings( $this.find('a').attr('href') ).fadeIn();

    e.preventDefault();
  });

  var hash = window.location.hash;
  var anchor = $('.tabs-nav a[href="' + hash + '"]');
  if (anchor.length === 0) {
    $(".popup-tabs-nav li:first").addClass("active").show(); //Activate first tab
    $(".popup-tab-content:first").show(); //Show first tab content
  } else {
    anchor.parent('li').click();
  }

  // Link to Register Tab
  $('.register-tab').on('click', function(event) {
    event.preventDefault();
    $(".popup-tab-content").hide();
    $("#register.popup-tab-content").show();
    $("body").find('.popup-tabs-nav a[href="#register"]').parent("li").click();
  });

  // Disable tabs if there's only one tab
  $('.popup-tabs-nav').each(function() {
    var listCount = $(this).find("li").length;
    if ( listCount < 2 ) {
      $(this).css({
        'pointer-events': 'none'
      });
    }
  });
};

class RightSideNoLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      emailLogin: '',
      passwordLogin: '',
      emailRegister: '',
      passwordRegister: '',
      confirmPasswordRegister: '',
      emailForgot: '',
      errorRegister: false,
      errorMessageRegister: [],
      errorMessageLogin: [],
      captcha: '',
      isRegisterSuccess: false,
      isLoginSuccess: false,
      isForgotPassword: false
    };
  }

  componentDidMount() {
    runScript();
    $.magnificPopup.instance.close =  () =>  {
      this.setState({
        emailLogin: '',
        passwordLogin: '',
        emailRegister: '',
        passwordRegister: '',
        confirmPasswordRegister: '',
        emailForgot: '',
        captcha: '',
      });
      $.magnificPopup.proto.close.call(this);
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.login.isRegisterSuccess && !prevState.isRegisterSuccess) {
      return {isRegisterSuccess: true}
    }
    if (nextProps.login.isLoginSuccess && !prevState.isLoginSuccess) {
      return {isLoginSuccess: true}
    }
    if (nextProps.login.errorMessageLogin) {
      return{
        errorMessageLogin: [nextProps.login.errorMessageLogin]
      }
    }
    if (nextProps.login.errorMessageRegister) {
      return{
        errorMessageRegister: [nextProps.login.errorMessageRegister]
      }
    }
    return {};
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('prevProps', prevProps);
    console.log('prevState', prevState);
    console.log('this.props', this.props);
    console.log('this.state', this.state);
    let {isRegisterSuccess, isLoginSuccess} = this.state;
    let {isRegistering, errorMessage} = this.props.login;
    if (isLoginSuccess && !prevState.isLoginSuccess) {
      this.setState({
        emailLogin: '',
        passwordLogin: ''
      });
      window.location.reload();
      // prevProps.setIsAuthenticated(true);
    }
    console.log(isRegistering, prevProps.login.isRegistering, errorMessage)
    if (!isRegistering && prevProps.login.isRegistering && errorMessage) {
      this.setState({
        errorMessage: [errorMessage]
      })
    }
    if(isRegisterSuccess && !prevState.isRegisterSuccess) {
      this.setState({
        emailRegister: '',
        passwordRegister: '',
        confirmPasswordRegister: '',
        captcha: ''
      });
      window.$('#login-href').click();
      window.Snackbar.show({
        text: prevProps.t('Register success'),
        pos: 'bottom-center',
        showAction: false,
        actionText: "Dismiss",
        duration: 2000,
        textColor: '#5f9025',
        backgroundColor: '#EBF6E0'
      });
      // setTimeout(() => {
      //   prevProps.setIsAuthenticated(true);
      //   prevProps.onGetProfile();
      // }, 500);
    }
  }

  handleChangeInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    if (name === 'emailRegister') {
      value = value.replace(/\s/g, '');
    }
    this.setState({
      [e.target.name]: value
    })
  };

  handleVerify = token => {
    this.setState({
      captcha: token
    })
  };

  handleRegister = (e) => {
    e.preventDefault();
    console.log('test handleRegister', e);
    const { t, onRegister } = this.props;
    let errorMessage = [];
    let {
      emailRegister,
      passwordRegister,
      confirmPasswordRegister,
      captcha
    } = this.state;
    if (!emailRegister || !Validation.test(emailRegister, 'email')) {
      errorMessage.push(t("The email is invalid"))
    }
    if (passwordRegister.length < 8) {
      errorMessage.push(t("The password must be least 8 character"));
    }
    if (passwordRegister !== confirmPasswordRegister) {
      errorMessage.push(t("The repeat password is different from password"));
    }
    if (!captcha) {
      errorMessage.push(t("The captcha is required"));
    }
    if (errorMessage.length > 0) {
      this.setState({
        errorMessageRegister: errorMessage,
        errorRegister: true
      })
    } else {
      this.setState({
        errorRegister: false,
        errorMessageRegister: errorMessage
      });
      onRegister({
        email: emailRegister,
        password: passwordRegister,
        captcha: captcha
      })
    }

  };
  handleSocialLogin = (user) => {
    let { onLoginSocial } = this.props;
    console.log(user);
    onLoginSocial({
      profile: user._profile,
      provider: user._provider,
      token: user._token
    })
  };

  handleSocialLoginFailure = (err) => {
    let { t } = this.props;
    this.setState({
      errorMessageLogin: [t("Cannot login by social network")]
    })
  };

  handleLogin = (e) => {
    e.preventDefault();
    console.log('test handleLogin', e);
    let { onLogin, t } = this.props;
    let errorMessage = [];
    let {
      emailLogin,
      passwordLogin
    } = this.state;
    if (!emailLogin || !Validation.test(emailLogin, 'email')) {
      errorMessage.push(t("The email is invalid"))
    }
    if (errorMessage.length > 0) {
      this.setState({
        errorMessageLogin: errorMessage,
        errorRegister: true
      })
    } else {
      this.setState({
        errorLogin: false,
        errorMessageLogin: errorMessage
      });
      onLogin({
        email: emailLogin,
        password: passwordLogin,
      })
    }

  };

  handleSubmitForgotPassword = async (e) => {
    e.preventDefault();
    let { onLogin, t } = this.props;
    let errorMessage = [];
    let {
      emailForgot
    } = this.state;
    if (!emailForgot || !Validation.test(emailForgot, 'email')) {
      errorMessage.push(t("The email is invalid"))
    }
    if (errorMessage.length > 0) {
      this.setState({
        errorMessageLogin: errorMessage,
        errorRegister: true
      })
    } else {
      this.setState({
        errorLogin: false,
        errorMessageLogin: errorMessage,
        isLoading: true
      });
      let res = await sendForgotPassword(emailForgot);
      if (res.status) {
        this.setState({
          isLoading: false,
          emailForgot: '',
          isForgotPassword: false
        });
        window.Snackbar.show({
          text: this.props.t('Vui lòng check email'),
          pos: 'bottom-center',
          showAction: false,
          actionText: "Dismiss",
          duration: 2000,
          textColor: '#5f9025',
          backgroundColor: '#EBF6E0'
        });
      } else {
        this.setState({
          isLoading: false,
          errorMessage: this.props.t('Cannot send email'),
        });
      }
      // onLogin({
      //   email: emailLogin,
      //   password: passwordLogin,
      // })
    }
    // window.Snackbar.show({
    //   text: "Tính năng đang được hoàn thiện",
    //   pos: 'bottom-center',
    //   showAction: false,
    //   actionText: "Dismiss",
    //   duration: 2000,
    //   textColor: '#fff',
    //   backgroundColor: '#dc4534'
    // });

  };

  handleForgotPassword = (e) => {
    e.preventDefault();
    this.setState({
      isForgotPassword: true,
      emailLogin: '',
      passwordLogin: ''
    })
  };
  handleCancel = (e) => {
    e.preventDefault();
    this.setState({
      isForgotPassword: false,
      emailForgot: ''
    })
  };
  renderLoginLayout = () => {
    let {
      isForgotPassword,
      errorMessageLogin,
      emailLogin,
      passwordLogin,
      emailForgot
    } = this.state;
    let { isLogin } = this.props.login;
    let { t } = this.props;

    if (isForgotPassword) {
      return (
        <div className="popup-tab-content" id="login">

          {
            errorMessageLogin.length > 0 &&  <div className="notification error">
              {
                errorMessageLogin.map(item => {
                  return <p key={item}>{item}</p>
                })
              }
            </div>
          }
          <form method="post" id="login-form" autocomplete="false" onSubmit={this.handleSubmitForgotPassword}>
            <div className="input-with-icon-left">
              <i className="icon-material-baseline-mail-outline"/>
              <input
                type="text"
                className="input-text with-border"
                name="emailForgot"
                id="email-forgot"
                placeholder={t('Email Address')}
                required
                value={emailForgot}
                onChange={this.handleChangeInput}
              />
            </div>
          </form>
          <button
            className="button full-width button-sliding-icon ripple-effect"
            type="submit"
            form="login-form">
            {t('Submit')}
            <i className="icon-material-outline-arrow-right-alt"  />
          </button>
          <button
            onClick={this.handleCancel}
            className="button full-width gray"
           >
            {t('Cancel')}
          </button>

        </div>
      )
    } else {
      return (<div className="popup-tab-content" id="login">

        <div className="welcome-text">
          <h3>{t("We're glad to see you again!")}</h3>
          <span>{t('Don\'t have an account?')} <a href="#" className="register-tab">{t("Sign Up!")}</a></span>
        </div>
        {
          errorMessageLogin.length > 0 &&  <div className="notification error">
            {
              errorMessageLogin.map(item => {
                return <p key={item}>{item}</p>
              })
            }
          </div>
        }
        <form method="post" id="login-form" onSubmit={this.handleLogin}>
          <div className="input-with-icon-left">
            <i className="icon-material-baseline-mail-outline"/>
            <input
              type="text"
              className="input-text with-border"
              name="emailLogin"
              id="emailaddress"
              placeholder={t('Email Address')}
              required
              value={emailLogin}
              onChange={this.handleChangeInput}
            />
          </div>

          <div className="input-with-icon-left">
            <i className="icon-material-outline-lock" />
            <input
              type="password"
              className="input-text with-border"
              name="passwordLogin"
              id="password"
              placeholder={t("Password")}
              required
              autocomplete="new-password"
              value={passwordLogin}
              onChange={this.handleChangeInput}
            />
          </div>
          <a href="" onClick={this.handleForgotPassword} className="forgot-password">{t("Forgot Password?")}</a>
        </form>
        {
          isLogin ? <div className="margin-top-10 ">
            <Loader/>
          </div> : <button
            className="button full-width button-sliding-icon ripple-effect"
            type="submit"
            form="login-form">
            {t('Log In')}
            <i className="icon-material-outline-arrow-right-alt"  />
          </button>
        }
        {
          !isLogin && <div>
            <div className="social-login-separator"><span>or</span></div>
            <div className="social-login-buttons">
              <FaceBookButton
                provider='facebook'
                appId='904341883643115'
                onLoginSuccess={this.handleSocialLogin}
                onLoginFailure={this.handleSocialLoginFailure}
              >
                <i className="icon-brand-facebook-f" />
                {t("Log In via Facebook")}
              </FaceBookButton>
              <GoogleButton
                provider='google'
                appId='276684518040-m7mil8nsg9fi0ds7ppor5603963t5vd8.apps.googleusercontent.com'
                onLoginSuccess={this.handleSocialLogin}
                onLoginFailure={this.handleSocialLoginFailure}
              >
                <i className="icon-brand-google-plus-g" />
                {t("Log In via Google+")}
              </GoogleButton>
            </div>
          </div>
        }

      </div>)
    }
  }
  render() {
    let { t, config } = this.props;
    let {
      isRegistering,
      isLogin
    } = this.props.login;
    let {
      emailLogin,
      passwordLogin,
      emailRegister,
      confirmPasswordRegister,
      passwordRegister,
      errorMessageRegister,
      errorMessageLogin,
      isForgotPassword,
      isLoading
    } = this.state;
    return <>
      <React.Fragment>
        <div className="header-widget">
          <a href="#sign-in-dialog" className="popup-with-zoom-anim log-in-button">
            <i className="icon-feather-log-in" />
            <span>{t("Log In / Register")}</span>
          </a>
        </div>
      </React.Fragment>
      <div id="sign-in-dialog" className="zoom-anim-dialog mfp-hide dialog-with-tabs">

        <div className="sign-in-form">
          {
            isLoading &&  <Loader/>
          }
          <ul className="popup-tabs-nav">
            <li><a id="login-href" href="#login">{!isForgotPassword ? t('Log In') : t('Forgot Password')}</a></li>
            <li><a id="register-href" href="#register">{t('Register')}</a></li>
          </ul>

          <div className="popup-tabs-container">
            {
              this.renderLoginLayout()
            }
            <div className="popup-tab-content" id="register">

              <div className="welcome-text">
                <h3>{t("Let's create your account!")}</h3>
              </div>
              {
                errorMessageRegister.length > 0 &&  <div className="notification error">
                  {
                    errorMessageRegister.map(item => {
                      return <p key={item}>{item}</p>
                    })
                  }
                </div>
              }

              <form method="post" id="register-account-form" onSubmit={e => this.handleRegister(e)}>
                <div className="input-with-icon-left">
                  <i className="icon-material-baseline-mail-outline"></i>
                  <input
                    type="text"
                    className="input-text with-border"
                    name="emailRegister"
                    value={emailRegister}
                    onChange={this.handleChangeInput}
                    id="emailaddress-register"
                    placeholder={t("Email Address")}
                    required
                  />
                </div>

                <div
                  className="input-with-icon-left"
                  title="Should be at least 8 characters long"
                  data-tippy-placement="bottom"
                >
                  <i className="icon-material-outline-lock" />
                  <input
                    type="password"
                    className="input-text with-border"
                    id="password-register"
                    placeholder={t("Password")}
                    name="passwordRegister"
                    value={passwordRegister}
                    onChange={this.handleChangeInput}
                    required/>
                </div>

                <div className="input-with-icon-left">
                  <i className="icon-material-outline-lock" />
                  <input
                    type="password"
                    className="input-text with-border"
                    id="password-repeat-register"
                    placeholder={t("Repeat Password")}
                    name="confirmPasswordRegister"
                    value={confirmPasswordRegister}
                    onChange={this.handleChangeInput}
                    required />
                </div>
              </form>
              <ReCAPTCHA
                sitekey={config.ReCaptcha.siteKey}
                onChange={this.handleVerify}
              />
              {
                isRegistering ? <div className="margin-top-10 ">
                  <Loader/>
                </div> : <button
                  className="margin-top-10 button full-width button-sliding-icon ripple-effect"
                  type="submit"
                  form="register-account-form">
                  {t("Register")}
                  <i className="icon-material-outline-arrow-right-alt" />
                </button>
              }
            </div>

          </div>
        </div>
      </div>
    </>
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RightSideNoLogin);

