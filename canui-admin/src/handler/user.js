import { stores } from '../stores';
import {
  ACTION_REGISTRATION,
  ACTION_REGISTRATION_SUCCESS,
  ACTION_REGISTRATION_FAIL,
  ACTION_LOGIN,
  ACTION_LOGIN_SUCCESS,
  ACTION_LOGIN_FAIL,
  ACTION_LOGOUT,
  ACTION_LOGIN_SOCIAL, ACTION_GET_USER_PROFILE, ACTION_GET_USER_PROFILE_SUCCESS
} from '../libs/constActions';
import {
  register,
  login,
  loginSocial,
  getProfile
} from '../services/userService';
const userHandler = (type, params) => {
  switch (type) {
    case ACTION_REGISTRATION:
      registerHandler(params);
      break;
    case ACTION_LOGIN:
      loginHandler(params);
      break;
    case ACTION_LOGOUT:
      logoutHandler();
      break;
    case ACTION_LOGIN_SOCIAL:
      loginSocialHandler(params);
      break;
    case ACTION_GET_USER_PROFILE:
      getProfileHandler();
      break;
    default:
      break;
  }
};
const logoutHandler = () => {
  window.sessionStorage.removeItem('cms_access_token');
};

const getProfileHandler = async () => {
  let accessToken = window.sessionStorage.getItem('cms_access_token');
  let profile = {}

  if (window.sessionStorage.getItem(`profile-${accessToken}`)) {
    profile = JSON.parse(window.sessionStorage.getItem(`profile-${accessToken}`));
  }
  let response = await getProfile(accessToken);
  if (response.status) {
    stores.dispatch({
      type: ACTION_GET_USER_PROFILE_SUCCESS,
      profile: profile
    })
  }
};

const registerHandler = async (params) => {
  let response = await register(params);
  if (response.status) {
    window.sessionStorage.setItem('cms_access_token', response.data.token);
    stores.dispatch({
      type: ACTION_REGISTRATION_SUCCESS
    })
  } else {
    stores.dispatch({
      type: ACTION_REGISTRATION_FAIL,
      errorMessage: response.message
    })
  }
};

const loginHandler = async (params) => {
  let response = await login(params);
  if (response.status) {
    window.sessionStorage.setItem('cms_access_token', response.data.token);
    let profile = window.sessionStorage.getItem(`cms_profile-${response.data.token}`);
    if (!profile) {
      window.sessionStorage.setItem(`cms_profile-${response.data.token}`, JSON.stringify({}));
    }
    stores.dispatch({
      type: ACTION_LOGIN_SUCCESS,
      accessToken: response.data.token
    })
  } else {
    stores.dispatch({
      type: ACTION_LOGIN_FAIL,
      errorMessage: response.message
    })
  }
};

const loginSocialHandler = async (params) => {
  let response = await loginSocial(params);
  if (response.status) {
    window.sessionStorage.setItem('cms_access_token', response.data.access_token);
    let profile = window.sessionStorage.getItem(`cms_profile-${response.data.access_token}`);
    if (!profile) {
      window.sessionStorage.setItem(`cms_profile-${response.data.access_token}`, JSON.stringify({
        first_name: params.profile.firstName,
        last_name: params.profile.lastName,
        name: params.profile.name,
        avatar: params.profile.profilePicURL,
        email: params.profile.email,
        user_type: 'SOCIAL'
      }));
    }

    stores.dispatch({
      type: ACTION_LOGIN_SUCCESS,
      accessToken: response.data.access_token
    })
  } else {
    stores.dispatch({
      type: ACTION_LOGIN_FAIL,
      errorMessage: response.message
    })
  }
};
export default userHandler;
