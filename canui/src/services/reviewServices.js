import defaultFetch from './defaultFetch';
import UrlPath from '../libs/UrlPath'
export default{
  getReviewList: async (params) => {
    let url = `${UrlPath.API.GET_CANU_REVIEW_LIST}?isCanI=${params.isCanI}&userId=${params.userId}&page=${params.page}&size=${params.size}&sort=createdAt,desc`;
    // if (params.isCanI) {
    //   url = `${UrlPath.API.GET_CANI_REVIEW_LIST}?isCanI=true&page=${params.page}&size=${params.size}&sort=createdAt,desc`
    // } else {
    //   url = `${UrlPath.API.GET_CANU_REVIEW_LIST}?userId=${params.userId}&page=${params.page}&size=${params.size}&sort=createdAt,desc`
    // }
    let payLoad = {
      method: 'GET',
      url: url,
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
  getReviewCanIList: async (params) => {
    let url = `${UrlPath.API.GET_CANU_REVIEW_LIST}?isCanI=true&userId=${params.userId}&page=${params.page}&size=${params.size}&sort=createdAt,desc`;
    let payLoad = {
      method: 'GET',
      url: url,
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
