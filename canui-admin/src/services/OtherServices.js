import defaultFetch from './defaultFetch';
import UrlEndPoint from '../libs/UrlEndPoint';
import {KEY} from '../libs/constValue';
import {getSessionStore, setSessionStore} from '../helpers/DataAccess';
export default{
    getCountry: async () => {
		let _sdata = getSessionStore(`${KEY.country}`);
		if(_sdata){
		  	return _sdata;
		}
		let _obj = {
		  	url: `${UrlEndPoint.ApiGetCountry}`, // url API endpoint
		  	method: 'GET',
		};
		let _a = await defaultFetch.fetchData(_obj);
		if(_a?.status && _a?.data){
		  	setSessionStore(`${KEY.country}`, _a?.data);
		  	return _a.data;
		}
			return false;
	},
	getCityByCountry: async (payload) => {
		if(!payload?.country){
		  	return false;
		}
		let _sdata = getSessionStore(`${KEY.city}${payload.country}`);
		if(_sdata){
		  	return _sdata;
		}
		let _obj = {
		  	url: `${UrlEndPoint.ApiGetCityByCountry}`, // url API endpoint
		  	method: 'GET',
		};
		if(payload?.country){
		  	_obj.url = `${_obj.url}?country=${payload.country}`;
		}
		let _a = await defaultFetch.fetchData(_obj);
		if(_a?.status && _a?.data){
		  	setSessionStore(`${KEY.city}${payload.country}`, _a?.data);
		  	return _a.data;
		}
		return false;
	},
    getKeyWord: async (payload) => {
        let _obj = {
            url: `${UrlEndPoint.ApiGetKeyWord}`, // url API endpoint
            method: 'GET',
        };
        if(payload?.like){
            _obj.url = `${_obj.url}?like=${payload.like}`;
        }
        let _a = await defaultFetch.fetchData(_obj);
        if(_a.status){
            return _a;
        }
        return false;
    },
    getListAnnouncement: async (payload) => {
    	let _obj = {
			url: `${UrlEndPoint.ApiGetListAnnouncement}`, // url API endpoint
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
    getDetailPost: async (_id) => {
    	if(!_id){
    		return false;
    	}
    	let _obj = {
			url: `${UrlEndPoint.ApiGetAnnouncement}${_id}`, // url API endpoint
			method: 'GET'
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
    deletePost: async (_id) => {
    	let _obj = {
			url: `${UrlEndPoint.ApiDeleteAnnouncement}`, // url API endpoint
			method: 'POST',
			payload: {
				"id": _id
			}
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
    UpdatePost: async (payload) => {
    	let _obj = {
			url: `${UrlEndPoint.ApiUpdateAnnouncement}`, // url API endpoint
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
    getListGuide: async (payload) => {
    	let _obj = {
			url: `${UrlEndPoint.ApiGetListGuide}`, // url API endpoint
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
    getDetailGuide: async (_id) => {
    	if(!_id){
    		return false;
    	}
    	let _obj = {
			url: `${UrlEndPoint.ApiGetGuide}${_id}`, // url API endpoint
			method: 'GET'
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
    deleteGuide: async (_id) => {
    	let _obj = {
			url: `${UrlEndPoint.ApiDeleteGuide}`, // url API endpoint
			method: 'POST',
			payload: {
				"id": _id
			}
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
    UpdateGuide: async (payload) => {
    	let _obj = {
			url: `${UrlEndPoint.ApiUpdateGuide}`, // url API endpoint
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
    getListContact: async (payload) => {
    	let _obj = {
			url: `${UrlEndPoint.ApiGetContactList}`, // url API endpoint
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
    getDetailContact: async (_id) => {
    	if(!_id){
    		return false;
    	}
    	let _obj = {
			url: `${UrlEndPoint.ApiGetContactDetail}${_id}`, // url API endpoint
			method: 'GET'
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
    deleteContact: async (_id) => {
    	let _obj = {
			url: `${UrlEndPoint.ApiDeleteContact}`, // url API endpoint
			method: 'POST',
			payload: {
				"id": _id
			}
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
    UpdateContact: async (payload) => {
    	let _obj = {
			url: `${UrlEndPoint.ApiUpdateContact}`, // url API endpoint
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