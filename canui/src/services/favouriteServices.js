import defaultFetch from './defaultFetch';
import UrlPath from '../libs/UrlPath'
export default{
  getFavourite: async (params) => {
    let payLoad = {
      method: 'GET',
      url: `${UrlPath.API.GET_FAVOURITE}?page=${params.page}&size=${params.size}`
    };
    let response = await defaultFetch.fetchData(payLoad);
    if (response.status) {
      return {
        status: true,
        data: response.data
      }
    } else {
      return {
        status: false,
        message: response.message,
        data: {}
      }
    }
	},
	postFavourite: async (params) => {
    let payLoad = {
      method: 'GET',
      url: UrlPath.API.POST_FAVOURITE+'/'+params.userId,
    };
    let response = await defaultFetch.fetchData(payLoad);
    if (response.status) {
      return {
        status: true,
        data: response.data
      }
    } else {
      return {
        status: false,
        message: response.message,
        data: {}
      }
    }
  }
};
