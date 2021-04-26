import { stores } from '../stores';
import * as constActions from '../libs/constActions';
import notificationServices from '../services/notificationServices'
const notificationHandler = async (type, params) => {
  switch (type) {
    case constActions.ACTION_NOTIFICATION_GET_DETAIL:
      await getNotificationDetail(params);
      break;
    case constActions.ACTION_NOTIFICATION_GET_LIST:
      await getNotificationList(params);
      break;
    default:
      break;
  }
};


const getNotificationDetail = async (params) => {
  let response = await notificationServices.getNotificationDetail(params);
  if (response.status) {
    stores.dispatch({
      type: constActions.ACTION_NOTIFICATION_GET_DETAIL_SUCCESS,
      notification: response.data
    });
  } else {
    window.location.href = '/404';
  }
};

const getNotificationList = async (params) => {
  let response = await notificationServices.getNotificationHistory(params);
  let notifications = [];
  if (response.status) {
    notifications = response.data.detail;
  }
  stores.dispatch({
    type: constActions.ACTION_NOTIFICATION_GET_LIST_SUCCESS,
    notifications: notifications
  })
  // } else {
  //   window.location.href = '/404';
  // }
};

export default notificationHandler;
