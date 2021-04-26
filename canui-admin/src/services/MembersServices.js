import defaultFetch from './defaultFetch';
import UrlEndPoint from '../libs/UrlEndPoint';
export default{
	getMembers: async (payload) => {
		let _obj = {
			url: `${UrlEndPoint.ApiGetMembers}`, // url API endpoint
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
	getMemberDetail: async (_id) => {
		let _obj = {
			url: `${UrlEndPoint.ApiGetMembersDetail}${_id}`, // url API endpoint
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
	deleteMember: async (payload) => {
		let _obj = {
			url: `${UrlEndPoint.ApiDeleteMembers}`,
			method: 'POST',
		};
		let _a;
		try{
			_a = await defaultFetch.fetchData(_obj);
		}catch(err){
			console.log(err);
		}
		if(_a?.status){
			return _a;
		}
		return false;
	},
	updateMember: async (payload) => {
		let _obj = {
			url: `${UrlEndPoint.ApiUpdateMembers}`, // url API endpoint
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
	}
};