import defaultFetch from './defaultFetch';
import UrlPath from '../libs/UrlPath'
export default{
	postJob: async(params) => {
    let payLoad = {
      url: UrlPath.API.JOB_POST,
      payload: params
    };
    let response = await defaultFetch.fetchData(payLoad);
    if (response.status) {
      return {
        status: true,
        message: 'Completed',
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
  confirmPrice: async(params) => {
    let payLoad = {
      url: UrlPath.API.CONFIRM_PRICE,
      payload: params
    };
    let response = await defaultFetch.fetchData(payLoad);
    if (response.status) {
      return {
        status: true,
        message: 'Completed',
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
  pickJob: async(params) => {
    let payLoad = {
      url: UrlPath.API.PICK_JOB,
      payload: params
    };
    let response = await defaultFetch.fetchData(payLoad);
    if (response.status) {
      return {
        status: true,
        message: 'Completed',
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
  getJobList: async (params) => {
    let payLoad = {
      method: 'GET',
      url: UrlPath.API.JOB_LIST + '?' + params.query,
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
	getJobDetail: async (params) => {
    let payLoad = {
      method: 'GET',
      url: UrlPath.API.JOB_DETAIL+'/'+params.jobId,
    };
    let response = await defaultFetch.fetchData(payLoad);
    console.log(response);
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
		// return {
     //  canu: {
		// 		avatar: '',
		// 		id: 12,
		// 	},
		// 	cani: {
		// 		avatar: '',
		// 		id: 13
		// 	},
		// 	caniList: [
		// 		{
		// 			id: 1,
		// 			avatar: '',
		// 			description: 'new description',
		// 			rate: 5,
		// 			price: 20
		// 		}
		// 	],
		// 	status: "REQUESTING",
		// 	total_cani: 10,
     //  nationalService: 'Korea',
     //  serviceName: 'Cấp phát giấy tờ',
     //  description: 'Nội dung dịch vụ'
		// };
	}
};
