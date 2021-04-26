import defaultFetch from './defaultFetch';
import UrlPath from '../libs/UrlPath'
export default{
	getNotificationDetail: async (params) => {
    let payLoad = {
      method: 'GET',
      url: UrlPath.API.GET_NOTIFICATION_DETAIl + '/' +params.notificationId,
      payload: {}
    };
    let response = await defaultFetch.fetchData(payLoad);
    return response
	},
  getNotificationHistory: async(params) => {
    let payLoad = {
      method: 'GET',
      url: `${UrlPath.API.GET_NOTIFICATION_HISTORY}?page=${params.page || 0}&size=${params.size || 10}&sort=isRead,asc&sort=createdAt,desc`,
      payload: {}
    };
    let response = await defaultFetch.fetchData(payLoad);
    return response
  }
};
