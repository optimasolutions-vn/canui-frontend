import {
  ACTION_GET_USER_PROFILE,
  ACTION_GET_USER_PROFILE_SUCCESS,
  ACTION_UPDATE_USER_PROFILE,
  ACTION_GET_USER_PROFILE_CAN_I,
  ACTION_GET_USER_PROFILE_CAN_I_SUCCESS,
  ACTION_UPDATE_USER_PROFILE_CAN_I,
  ACTION_UPDATE_USER_PROFILE_SUCCESS,
  ACTION_UPDATE_USER_PROFILE_FAIL,
  ACTION_UPDATE_USER_PROFILE_CAN_I_FAIL, ACTION_UPDATE_USER_PROFILE_CAN_I_SUCCESS, ACTION_GET_USER_DETAIL,
  ACTION_GET_USER_DETAIL_SUCCESS, ACTION_MESSAGE_GET_LIST_SUCCESS, ACTION_GET_NOTIFICATION_SUCCESS,
  ACTION_NOTIFICATION_GET_DETAIL, ACTION_NOTIFICATION_GET_DETAIL_SUCCESS, ACTION_NOTIFICATION_GET_LIST,
  ACTION_NOTIFICATION_GET_LIST_SUCCESS
} from '../libs/constActions';

const stateDefault = {
  messages: [],
  notifications: [],
  totalUnread: 0,
  notificationUnread: 0,
  isLoadedNotification: false,
  isLoadingDetail: true,
  userId: 0,
  notification: {},
  notificationList: [],
  isLoadingNotificationList: true,
  isLoadingMoreNotificationList: false
};
const notificationReducer = (state = stateDefault, action) => {
  switch(action.type){
    case ACTION_GET_USER_PROFILE_SUCCESS:
      return {
        ...state,
        isLoadedNotification: true,
        totalUnread: action.totalUnread,
        messages: action.messages,
        notifications: action.notifications,
        userId: action.profile.id,
        notificationUnread: action.notificationUnread
      };
    case ACTION_GET_USER_PROFILE:
      return {
        ...state,
        isLoadedNotification: false,
        userId: 0,
      };
    case ACTION_GET_NOTIFICATION_SUCCESS:
      return{
        ...state,
        totalUnread: action.totalUnread,
        messages: action.messages,
        notifications: action.notifications,
        notificationUnread: action.notificationUnread
      };
    case ACTION_NOTIFICATION_GET_DETAIL:
      return{
        ...state,
        isLoadingDetail: true
      };
    case ACTION_NOTIFICATION_GET_DETAIL_SUCCESS:
      return {
        ...state,
        notification: action.notification,
        isLoadingDetail: false
      }
    case ACTION_NOTIFICATION_GET_LIST:
      return{
        ...state,
        isLoadingNotificationList: true
      };
    case ACTION_NOTIFICATION_GET_LIST_SUCCESS:
      return {
        ...state,
        notificationList: action.notifications,
        isLoadingNotificationList: false
      }
    default:
      return state;
  }
};
export default notificationReducer;
