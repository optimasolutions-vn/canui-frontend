import defaultFetch from './defaultFetch';
import UrlEndPoint from '../libs/UrlEndPoint';

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

export const getOptionPageHowToUse = async (payload) => {
	let _obj = {
		url: UrlEndPoint.ApiGetOptions, // url API endpoint
		payload: ["static-page-how-to-use"]
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

export const setOptionPageHowToUse = async (payload) => {
	let _obj = {
		url: UrlEndPoint.ApiSetOptions, // url API endpoint
		payload: [
			{	
				key: "static-page-how-to-use",
				value: JSON.stringify(payload.objectValue)
			}
		]
	};
	return await defaultFetch.fetchData(_obj);
	return {
		status: true,
		message: 'Completed',
		data: {}
	}
};

export const setOptionPagePrivacy = async (payload) => {
	let _obj = {
		url: UrlEndPoint.ApiSetOptions, // url API endpoint
		payload: [
			{	
				key: "static-page-privacy",
				value: JSON.stringify(payload.objectValue)
			}
		]
	};
	return await defaultFetch.fetchData(_obj);
	return {
		status: true,
		message: 'Completed',
		data: {}
	}
};

export const setOptionPageTerms = async (payload) => {
	let _obj = {
		url: UrlEndPoint.ApiSetOptions, // url API endpoint
		payload: [
			{	
				key: "static-page-term",
				value: JSON.stringify(payload.objectValue)
			}
		]
	};
	return await defaultFetch.fetchData(_obj);
	return {
		status: true,
		message: 'Completed',
		data: {}
	}
};

export const setOptionPageFaq = async (payload) => {
	let _obj = {
		url: UrlEndPoint.ApiSetOptions, // url API endpoint
		payload: [
			{	
				key: "static-page-faq",
				value: JSON.stringify(payload.objectValue)
			}
		]
	};
	return await defaultFetch.fetchData(_obj);
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

export const setOptionPageAboutUs = async (payload) => {
	let _obj = {
		url: UrlEndPoint.ApiSetOptions, // url API endpoint
		payload: [
			{	
				key: "static-page-aboutus",
				value: JSON.stringify(payload.objectValue)
			}
		]
	};
	return await defaultFetch.fetchData(_obj);
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

export const setOptionPageHome = async (payload) => {
	let _obj = {
		url: UrlEndPoint.ApiSetOptions, // url API endpoint
		payload: [
			{	
				key: "static-page-home",
				value: JSON.stringify(payload.objectValue)
			}
		]
	};
	return await defaultFetch.fetchData(_obj);
	return {
		status: true,
		message: 'Completed',
		data: {}
	}
};
