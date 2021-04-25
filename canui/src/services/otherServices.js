import defaultFetch from './defaultFetch';
import UrlPath from '../libs/UrlPath';
import UrlEndPoint from '../libs/UrlEndPoint';
import { getSessionStore, setSessionStore } from '../helpers/DataAccess';
import {KEY} from '../libs/constValue';
export default{
  verifyPhone : async (payload) => {
   /* {
      "phoneNumber" : "xxx"
    }*/
    let _obj = {
      url: `${UrlEndPoint.ApiVerifyPhone}`, // url API endpoint
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
  verifyCode : async (payload) => {
   /* {
      "code" : "xxx"
    }*/
    let _obj = {
      url: `${UrlEndPoint.ApiVerifyCode}`, // url API endpoint
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
  getListCanIByFilter : async (payload) => {
    let _obj = {
      url: `${UrlEndPoint.ApiGetListCanI}`, // url API endpoint
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
  getRatingCriteria: async () => {
    let _obj = {
      url: `${UrlEndPoint.ApiGetRatingCriteria}?locale=vn`, // url API endpoint
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
  updateUserRating: async (payload) => {
    let _obj = {
      url: `${UrlEndPoint.ApiUpdateUserRating}`,
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
  reviewUser: async (payload) => {
    let _obj = {
      url: `${UrlEndPoint.ApiUserRating}`,
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
  completeJob: async (payload) => {
    let _obj = {
      url: `${payload.type === 'CANI' ? UrlEndPoint.ApiCanICompleteJob : UrlEndPoint.ApiCanUCompleteJob}`,
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
  sendFormContact: async (payload) => {
    let _obj = {
      url: `${UrlEndPoint.ApiSendContact}`,
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
  }
};
