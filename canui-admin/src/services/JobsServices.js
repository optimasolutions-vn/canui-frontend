import defaultFetch from './defaultFetch';
import UrlEndPoint from '../libs/UrlEndPoint';
export default{
	getJobsList: async (payload) => {
		let _obj = {
			url: `${UrlEndPoint.ApiGetJobsList}`, // url API endpoint
			method: 'GET',
		};
		if(payload){
			let _str = '';
			for(let [k, v] of Object.entries(payload)){
				if(!_str){
					_str = `${_str}?${k}=${v}`;
				}else{
					_str = `${_str}&${k}=${v}`;
				}
			}
			_obj.url = `${_obj.url}${_str}`;
		}
		let _a;
		try{
			_a = await defaultFetch.fetchData(_obj);
		}catch(err){
			console.log(err);
		}
		if(_a.status){
			return _a;
		}
		return false;
	},
	getJobDetail: async (payload) => {
		let _obj = {
			url: `${UrlEndPoint.ApiGetJobsDetail}${payload.id}`, // url API endpoint
			method: 'GET',
		};
		let _a;
		try{
			_a = await defaultFetch.fetchData(_obj);
		}catch(err){
			console.log(err);
		}
		if(_a.status){
			return _a;
		}
		return false;
	},
	deleteJob: async (payload) => {
		let _obj = {
			url: `${UrlEndPoint.ApiDeleteJob}`,
			method: 'POST',
			payload: payload
		};
		let _a;
		try{
			_a = await defaultFetch.fetchData(_obj);
		}catch(err){
			console.log(err);
		}
		console.log(_a);
		if(_a?.status || _a?.message){
			return _a;
		}
		return false;
	},
	createJob: async (payload) => {
		let _obj = {
			url: `${UrlEndPoint.ApiCreateJob}`, // url API endpoint
			method: 'POST',
			payload: payload
		};
		let _a;
		try{
			_a = await defaultFetch.fetchData(_obj);
		}catch(err){
			console.log(err);
		}
		if(_a.status){
			return _a;
		}
		return false;
	},
	updateJobDetail: async (payload) => {
		let _obj = {
			url: `${UrlEndPoint.ApiUpdateJob}`, // url API endpoint
			method: 'POST',
			payload: payload
		};
		let _a;
		try{
			_a = await defaultFetch.fetchData(_obj);
		}catch(err){
			console.log(err);
		}
		if(_a.status){
			return _a;
		}
		return false;
	}
};