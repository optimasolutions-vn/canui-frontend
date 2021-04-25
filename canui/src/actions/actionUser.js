import {
  ACTION_LOGIN, ACTION_LOGOUT,
  ACTION_REGISTRATION,
  ACTION_LOGIN_SOCIAL,
  ACTION_GET_USER_PROFILE,
  ACTION_UPDATE_USER_PROFILE,
  ACTION_GET_USER_PROFILE_CAN_I,
  ACTION_UPDATE_USER_PROFILE_CAN_I, ACTION_GET_USER_DETAIL,
  ACTION_GET_NOTIFICATION

} from '../libs/constActions';
export const actionRegister = (params) => {
  return {
    type: ACTION_REGISTRATION,
    params: params
  }
};
export const actionLogin = (params) => {
  return {
    type: ACTION_LOGIN,
    params: params
  }
};

export const actionLogout = () => {
  return {
    type: ACTION_LOGOUT,
  }
};

export const actionLoginSocial = (params) => {
  return {
    type: ACTION_LOGIN_SOCIAL,
    params: params
  }
};

export const actionGetUserProfile = () => {
  return {
    type: ACTION_GET_USER_PROFILE
  }
};

export const actionGetNotification = (params) => {
  return {
    type: ACTION_GET_NOTIFICATION,
    params
  }
};

export const actionGetUserProfileCanI = () => {
  return {
    type: ACTION_GET_USER_PROFILE_CAN_I
  }
};

export const actionUpdateProfileCanI = (params) => {
  return {
    type: ACTION_UPDATE_USER_PROFILE_CAN_I,
    params: params
  }
};


export const actionUpdateUserProfile = (profile) => {
  return {
    type: ACTION_UPDATE_USER_PROFILE,
    params: profile
  }
};

export const actionGetUserDetail = (profile) => {
  return {
    type: ACTION_GET_USER_DETAIL,
    params: profile
  }
};
