import React, {useState, Component} from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import { useTranslation } from "react-i18next";
import UrlPath from '../../libs/UrlPath';
import Loader from '../../components/effects/Loader';
import {
  actionGetUserProfile,
  actionLogout,
  actionUpdateUserProfile
} from '../../actions/actionUser';
import {
  uploadImage,
  changePassword
} from '../../services/userService';

import './style.scss';

const mapStateToProps = state => ({
 user: state.user
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
  onload: () => dispatch(actionGetUserProfile()),
  onUpdateProfile: (profile) => dispatch(actionUpdateUserProfile(profile))
});

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: {},
      currentPassword: '',
      repeatPassword: '',
      password: '',
      firstName: '',
      lastName: '',
      userType: '',
      errorMessage: []
    }
  }
  componentDidMount(){
    this.props.onload();
    runScript();
  }
  handleChangeInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  };
  componentDidUpdate(prevProps, prevState, snapshot) {
    let { profile, isLoadedProfile } = this.props.user;
    if (!prevProps.user.isLoadedProfile && isLoadedProfile) {
      this.setState({
        firstName: profile.first_name || '',
        lastName: profile.last_name || '',
        name: profile.name || '',
        avatar: profile.avatar || '',
        userType: profile.user_type || ''
      })
    }
  }
  handleSelectAvatar = (e) => {
    this.setState({
      avatarUpload: e.target.files[0],
    })
  };
  handleUpdateProfile = async (e) => {
    e.preventDefault();
    let {
      firstName,
      lastName,
      currentPassword,
      repeatPassword,
      password,
      avatar,
      avatarUpload,
      userType
    } = this.state;
    let errorMessage = [];
    let { t, onUpdateProfile } = this.props;
    if (!firstName) {
      errorMessage.push(t("The first name is required"));
    }
    if (!lastName) {
      errorMessage.push(t("The last name is required"));
    }
    if (currentPassword || (repeatPassword !== password)) {
      if (password.length < 8) {
        errorMessage.push(t("The password must be least 8 character"));
      }
      if (repeatPassword !== password) {
        errorMessage.push(t("The repeat password is different from password"));
      }
    }
    if (errorMessage.length > 0) {
      this.setState({
        errorMessage: errorMessage
      });
      return;
    }
    this.setState({
      errorMessage: errorMessage,
      isLoading: true
    });
    if (avatarUpload) {
      const formData = new FormData();
      formData.append('image', avatarUpload);
      let res = await uploadImage(formData);
      if (res.status) {
        console.log(res.data);
        avatar = `${UrlPath.API.SERVER}/api${res.data}`
      } else {
        this.setState({
          errorMessage: [t("Can not change avatar")],
          isLoading: false
        })
        return
      }
    }
    if (currentPassword && userType !== 'SOCIAL') {
      let res = await changePassword({
        "oldPassword" : currentPassword,
        "newPassword" : password
      });
      if (!res.status) {
        this.setState({
          errorMessage: [res.message],
          isLoading: false
        });
        return
      }
    }
    let token = localStorage.getItem('cms_access_token');
    let info = {
      first_name: firstName,
      last_name: lastName,
      avatar: avatar,
      name: `${firstName} ${lastName}`,
    };
    localStorage.setItem(`cms_profile-${token}`, JSON.stringify(info));
    window.Snackbar.show({
      text: "Success",
      pos: 'bottom-center',
      showAction: false,
      actionText: "Dismiss",
      duration: 2000,
      textColor: '#5f9025',
      backgroundColor: '#EBF6E0'
    });
    this.setState({
      isLoading: false,
      errorMessage: []
    });
    onUpdateProfile(info)

  };
  render () {
    let {
      firstName,
      lastName,
      currentPassword,
      repeatPassword,
      password,
      errorMessage,
      avatar,
      isLoading,
      userType
    } = this.state;
    return (
      <div className="dashboard-content-container">
        {
          isLoading &&  <Loader/>
        }
        <div className="dashboard-content-inner" >


          <div className="row">

            <div className="col-xl-12">
              <div className="dashboard-box margin-top-0">

                <div className="headline">
                  <h3><i className="icon-material-outline-account-circle" /> My Account</h3>
                </div>

                <div className="content with-padding padding-bottom-0">

                  <div className="row">

                    <div className="col-auto">
                      <div className="avatar-wrapper" data-tippy-placement="bottom" title="Change Avatar">
                        <img className="profile-pic" src={avatar || "/images/user-avatar-placeholder.png"} alt="" />
                        <div className="upload-button" />
                        <input onChange={this.handleSelectAvatar} className="file-upload" type="file" accept="image/*"/>
                      </div>
                    </div>

                    <div className="col">
                      <div className="row">

                        <div className="col-xl-6">
                          <div className="submit-field">
                            <h5>First Name</h5>
                            <input onChange={this.handleChangeInput} name="firstName" type="text" className="with-border" value={firstName} />
                          </div>
                        </div>

                        <div className="col-xl-6">
                          <div className="submit-field">
                            <h5>Last Name</h5>
                            <input onChange={this.handleChangeInput} name="lastName" type="text" className="with-border" value={lastName}/>
                          </div>
                        </div>


                        <div className="col-xl-12 btn-cani-container margin-bottom-10">
                          <a href="/profiles/can-i" className="button ripple-effect small margin-top-10 float-right">CanI</a>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
            <div className="col-xl-12">
              <div id="test1" className="dashboard-box">


                <div className="headline">
                  <h3><i className="icon-material-outline-lock"/> Password & Security</h3>
                </div>

                <div className="content with-padding">
                  <div className="row">
                    <div className="col-xl-4">
                      <div className="submit-field">
                        <h5>Current Password</h5>
                        <input onChange={this.handleChangeInput} value={currentPassword} autocomplete="new-password" name={`currentPassword-${Math.random()}`} autocomplete="false" type="password" className="with-border"/>
                      </div>
                    </div>

                    <div className="col-xl-4">
                      <div className="submit-field">
                        <h5>New Password</h5>
                        <input onChange={this.handleChangeInput} value={password} name="password" autocomplete="new-password" type="password" className="with-border"/>
                      </div>
                    </div>

                    <div className="col-xl-4">
                      <div className="submit-field">
                        <h5>Repeat New Password</h5>
                        <input onChange={this.handleChangeInput} value={repeatPassword} autocomplete="new-password" name="repeatPassword" type="password" className="with-border"/>
                      </div>
                    </div>


                  </div>
                </div>
              </div>
            </div>

            {
              errorMessage.length > 0 &&  <div className="margin-top-20 col-xl-12">
                <div className="notification error ">
                  {
                    errorMessage.map(item => {
                      return <p key={item}>{item}</p>
                    })
                  }
                </div>
              </div>
            }

            <div className="col-xl-12">
              <a href="" onClick={this.handleUpdateProfile} className="button ripple-effect big margin-top-20 margin-bottom-20">Save Changes</a>
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

