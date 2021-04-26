import defaultFetch from './defaultFetch';
import UrlEndPoint from '../libs/UrlEndPoint';

export const getOptionPageFaq = async (payload) => {
	let _obj = {
		url: UrlEndPoint.ApiGetOptions, // url API endpoint
		payload: ["static-page-faq"]
	};
	let _res = await defaultFetch.fetchData(_obj);
	if(_res.status && _res?.data[0]){
		_res.data[0].value = JSON.parse(_res.data[0].value) || _res.data[0].value;
	}
	return _res;
	return {
		status: true,
		message: 'Completed',
		data: {}
	}
};

export const getOptionPageTerms = async (payload) => {
	let _obj = {
		url: UrlEndPoint.ApiGetOptions, // url API endpoint
		payload: ["static-page-term"]
	};
	let _res = await defaultFetch.fetchData(_obj);
	if(_res.status && _res?.data[0]){
		_res.data[0].value = JSON.parse(_res.data[0].value) || _res.data[0].value;
	}
	return _res;
	return {
		status: true,
		message: 'Completed',
		data: {}
	}
};

export const getOptionPagePrivacy = async (payload) => {
	let _obj = {
		url: UrlEndPoint.ApiGetOptions, // url API endpoint
		payload: ["static-page-privacy"]
	};
	let _res = await defaultFetch.fetchData(_obj);
	if(_res.status && _res?.data[0]){
		_res.data[0].value = JSON.parse(_res.data[0].value) || _res.data[0].value;
	}
	return _res;
	return {
		status: true,
		message: 'Completed',
		data: {}
	}
};

export const getOptionPageAboutUs = async (payload) => {
	let _obj = {
		url: UrlEndPoint.ApiGetOptions, // url API endpoint
		payload: ["static-page-aboutus"]
	};
	let _res = await defaultFetch.fetchData(_obj);
	if(_res.status && _res?.data[0]){
		_res.data[0].value = JSON.parse(_res.data[0].value) || _res.data[0].value;
	}
	return _res;
	return {
		status: true,
		message: 'Completed',
		data: {}
	}
};


export const getOptionPageHome = async (payload) => {
	let _obj = {
		url: UrlEndPoint.ApiGetOptions, // url API endpoint
		payload: ["static-page-home"]
	};
	let _res = await defaultFetch.fetchData(_obj);
	if(_res.status && _res?.data[0]){
		_res.data[0].value = JSON.parse(_res.data[0].value) || _res.data[0].value;
	}
	return _res;
	return {
		status: true,
		message: 'Completed',
		data: {}
	}
};
