import defaultFetch from './defaultFetch';
import UrlPath from '../libs/UrlPath'
export default{
  createTraction: async (params) => {
    let payLoad = {
      url: `${UrlPath.API.CREATE_TRANSACTION}`,
      payload: params
    };
    let response = await defaultFetch.fetchData(payLoad);
    return response
	},
  completePayment: async (params) => {
    let payLoad = {
      url: `${UrlPath.API.COMPLETE_TRANSACTION}`,
      payload: params
    };
    let response = await defaultFetch.fetchData(payLoad);
    return response
	},
  getCoupon: async (params) => {
    let payLoad = {
      url: `${UrlPath.API.GET_COUPON}?userId=${params.userId}&size=10000&page=0&sort=createdAt,desc`,
      payload: params,
      method: 'GET'
    };
    let response = await defaultFetch.fetchData(payLoad);
    return response
	}
};
