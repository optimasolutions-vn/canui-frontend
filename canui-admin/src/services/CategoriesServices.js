import defaultFetch from './defaultFetch';
import UrlEndPoint from '../libs/UrlEndPoint';
export default{
	getCategoriesServices: async (payload) => {
		let _obj = {
			url: `${UrlEndPoint.ApiGetServices}`, // url API endpoint
			method: 'GET',
		};
		if(payload?.slug){
			_obj.url = `${_obj.url}?slug=${payload.slug}`;
		}
		let _a = await defaultFetch.fetchData(_obj);
		if(_a.status){
			return _a;
		}
		return false;
	},
	updateCategoriesServices: async (payload) => {
		let _obj = {
			url: `${UrlEndPoint.ApiUpdateServices}`, // url API endpoint
			method: 'POST',
			payload: [payload]
		};
		let _a = await defaultFetch.fetchData(_obj);
		if(_a.status){
			return _a;
		}
		return false;
	},
	uploadImage: async (params) => {
		let response = await fetch(`${UrlEndPoint.ApiUploadFile}`, {
		    method: 'POST',
		    body: params,
		    headers: {
		      "Authorization": await defaultFetch.getCurrentToken()
		    }
		  });
		  if(response){
		    let _r = await response.json();
		    console.log(_r)
		    if(response.ok){
		      return {
		        status: true,
		        message: 'Completed',
		        data: _r.data || {}
		      };
		    }else{
		      return {
		        status: false
		      };
		    }
		  }else{
		    return {
		      status: false,
		    };
		  }
	},
};