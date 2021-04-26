import {
  ACTION_NOTIFICATION_GET_DETAIL, ACTION_NOTIFICATION_GET_LIST,
} from '../libs/constActions';
export const actionGetNotificationDetail = (params) => {
  return {
    type: ACTION_NOTIFICATION_GET_DETAIL,
    params: params
  }
};
export const actionGetListNotification = (params) => {
  return {
    type: ACTION_NOTIFICATION_GET_LIST,
    params
  }
};
