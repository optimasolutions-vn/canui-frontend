import defaultFetch from './defaultFetch';
import UrlPath from '../libs/UrlPath'
export default{
	getListUser: async () => {
    let payLoad = {
      method: 'GET',
      url: UrlPath.API.GET_PARTICIPANT,
      payload: {}
    };
    let response = await defaultFetch.fetchData(payLoad);
    return response
	},
  getHistory: async (params) => {
    let payLoad = {
      method: 'GET',
      url: `${UrlPath.API.GET_CHAT_HISTORY}/${params.userId}?page=${params.page || 0}&size=${params.size || 10}&sort=createdAt,desc`,
      payload: {}
    };
    let response = await defaultFetch.fetchData(payLoad);
    return response
	},
  deleteConversation: async (params) => {
    let payLoad = {
        url: `${UrlPath.API.DELETE_CHAT_HISTORY}`,
        payload: params
    };
    let response = await defaultFetch.fetchData(payLoad);
    return response
	},
	getNotificationHistory: async(params) => {
    let payLoad = {
      method: 'GET',
      url: `${UrlPath.API.GET_NOTIFICATION_HISTORY}?page=${params.page || 0}&size=${params.size || 10}&isRead=false&sort=isRead,asc&sort=createdAt,desc`,
      payload: {}
    };
    let response = await defaultFetch.fetchData(payLoad);
    return response
  }
};
