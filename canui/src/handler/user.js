import { stores } from '../stores';
import {
  ACTION_REGISTRATION,
  ACTION_REGISTRATION_SUCCESS,
  ACTION_REGISTRATION_FAIL,
  ACTION_LOGIN,
  ACTION_LOGIN_SUCCESS,
  ACTION_LOGIN_FAIL,
  ACTION_LOGOUT,
  ACTION_LOGIN_SOCIAL, ACTION_GET_USER_PROFILE, ACTION_GET_USER_PROFILE_SUCCESS, ACTION_GET_USER_PROFILE_CAN_I,
  ACTION_GET_USER_PROFILE_CAN_I_SUCCESS, ACTION_UPDATE_USER_PROFILE_CAN_I,
  ACTION_UPDATE_USER_PROFILE_CAN_I_FAIL, ACTION_UPDATE_USER_PROFILE_CAN_I_SUCCESS,
  ACTION_UPDATE_USER_PROFILE,
  ACTION_UPDATE_USER_PROFILE_FAIL,
  ACTION_UPDATE_USER_PROFILE_SUCCESS, ACTION_GET_USER_DETAIL, ACTION_GET_USER_DETAIL_SUCCESS,
  ACTION_GET_USER_DETAIL_FAIL,
  ACTION_GET_NOTIFICATION, ACTION_GET_NOTIFICATION_SUCCESS
} from '../libs/constActions';
import {
  register,
  login,
  loginSocial,
  getProfile,
  getProfileCanI,
  updateProfileCanI,
  updateProfile,
  getProfileUserDetail
} from '../services/userService';
import reviewService from '../services/reviewServices'
import messageServices from '../services/messageServices';
const userHandler = (type, params) => {
  switch (type) {
    case ACTION_GET_NOTIFICATION:
      getNotificationHandler(params);
      break;
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
    case ACTION_GET_USER_PROFILE_CAN_I:
      getProfileCanIHandler();
      break;
    case ACTION_UPDATE_USER_PROFILE_CAN_I:
      updateProfileCanIHandler(params);
      break;
    case ACTION_UPDATE_USER_PROFILE:
      updateProfileHandler(params);
      break;
    case ACTION_GET_USER_DETAIL:
      getUserDetail(params);
      break;
    default:
      break;
  }
};
const logoutHandler = () => {
  localStorage.removeItem('access_token');
};

const getProfileHandler = async () => {
  let accessToken = localStorage.getItem('access_token');
  let response = await getProfile(accessToken);
  let responseMessage = await messageServices.getListUser();
  let responseNotificationHistory = await messageServices.getNotificationHistory({});
  let totalUnread = 0;
  let notificationUnread = 0;
  let messages = [];
  let notifications = [];
  if (responseNotificationHistory.status) {
    notifications = responseNotificationHistory.data.detail;
    notificationUnread = responseNotificationHistory.data.unreadCount
  }
  if (responseMessage.status) {
    let mes = responseMessage.data.filter(item => item.unreadCount);
    totalUnread = mes ? mes.length : 0;
    messages = mes ? mes : []
  }
  if (response.status) {
    let profile = response.data.profile;
    stores.dispatch({
      type: ACTION_GET_USER_PROFILE_SUCCESS,
      profile: profile,
      totalUnread: totalUnread,
      notifications: notifications,
      notificationUnread: notificationUnread,
      messages: messages
    })
  }
};

const getNotificationHandler = async () => {
  let responseMessage = await messageServices.getListUser();
  let responseNotificationHistory = await messageServices.getNotificationHistory({});
  let totalUnread = 0;
  let notificationUnread = 0;
  let messages = [];
  let notifications = [];
  if (responseNotificationHistory.status) {
    notifications = responseNotificationHistory.data.detail;
    notificationUnread = responseNotificationHistory.data.unreadCount
  }
  if (responseMessage.status) {
    let mes = responseMessage.data.filter(item => item.unreadCount);
    totalUnread = mes ? mes.length : 0;
    messages = mes ? mes : []
  }
  stores.dispatch({
    type: ACTION_GET_NOTIFICATION_SUCCESS,
    totalUnread: totalUnread,
    notifications: notifications,
    notificationUnread: notificationUnread,
    messages: messages
  })
};

const getUserDetail = async (params) => {
  let accessToken = localStorage.getItem('access_token');
  let response = await getProfileUserDetail(params);
  let responseReview = await reviewService.getReviewCanIList({
    page: 0,
    size: 100,
    userId: params.userId
  });
  let reviewList = [];
  let totalPage = 0;
  let isFirstPage = true;
  let isLastPage = true;
  if (responseReview.status) {
    reviewList = responseReview.data.content;
    totalPage = responseReview.data.totalPages;
    isFirstPage = responseReview.data.first;
    isLastPage = responseReview.data.last;
  }
  if (response.status) {
    let profile = {};
    if (response.data.content && response.data.content[0].cani ) {
      profile =  response.data.content[0].cani;
      profile.firstName =  response.data.content[0].firstName;
      profile.lastName =  response.data.content[0].lastName;
      profile.userId =  response.data.content[0].userId;
      profile.finishedJob =  response.data.content[0].finishedJob;
      profile.favoriteCount =  response.data.content[0].favoriteCount;
      profile.isFavorite =  response.data.content[0].isFavorite;
    }
    if (Object.keys(profile).length === 0 && profile.constructor === Object) {
      window.location.href = '/404'
    }
    stores.dispatch({
      type: ACTION_GET_USER_DETAIL_SUCCESS,
      profile: profile,
      reviewList,
      totalPage,
      isFirstPage,
      isLastPage,
    })
  } else {
    stores.dispatch({
      type: ACTION_GET_USER_DETAIL_FAIL,
      profile: {},
      reviewList,
      totalPage,
      isFirstPage,
      isLastPage,
    })
  }
};

const getProfileCanIHandler = async () => {
  let response = await getProfileCanI();
  let profile = {};
  if (response.status) {
    profile = response.data
  } else {
    let res = await getProfile();
    if (res.status && res.data && res.data.profile) {
      profile.email = res.data.profile.email
    }
  }
  stores.dispatch({
    type: ACTION_GET_USER_PROFILE_CAN_I_SUCCESS,
    canI: profile
  })
};

const registerHandler = async (params) => {
  let response = await register(params);
  if (response.status) {
    // localStorage.setItem('access_token', response.data.token);
    stores.dispatch({
      type: ACTION_REGISTRATION_SUCCESS
    })
  } else {
    stores.dispatch({
      type: ACTION_REGISTRATION_FAIL,
      errorMessage: "The email is exist"
    })
  }
};

const updateProfileCanIHandler = async (params) => {
  let response = await updateProfileCanI(params);
  if (response.status) {
    stores.dispatch({
      type: ACTION_UPDATE_USER_PROFILE_CAN_I_SUCCESS,
      profile: response.data
    })
  } else {
    stores.dispatch({
      type: ACTION_UPDATE_USER_PROFILE_CAN_I_FAIL,
      errorMessage: response.message || 'Can not update profile'
    })
  }
};

const updateProfileHandler = async (params) => {
  let response = await updateProfile(params);
  if (response.status) {
    stores.dispatch({
      type: ACTION_UPDATE_USER_PROFILE_SUCCESS,
      profile: response.data
    })
  } else {
    stores.dispatch({
      type: ACTION_UPDATE_USER_PROFILE_FAIL,
      errorMessage: response.message || 'Can not update profile'
    })
  }
};

const loginHandler = async (params) => {
  let response = await login(params);
  if (response.status) {
    localStorage.setItem('access_token', response.data.token);
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
    localStorage.setItem('access_token', response.data.access_token);
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
