import defaultFetch from './defaultFetch';
import UrlEndPoint from '../libs/UrlEndPoint';
export default{
	getCategoriesServices: async (payload) => {
		let _obj = {
			withoutToken: true,
			url: `${UrlEndPoint.ApiGetServices}`, // url API endpoint
			method: 'GET',
		};
		//let _a = await fetch(`${UrlEndPoint.ApiGetServices}`);
		let _a = await defaultFetch.fetchData(_obj);
		console.log(_a);
		if(_a.status){
			//window.localStorage.setItem('services-categories-', JSON.stringify(_a.data));
			return _a;
		}
		return false;
	}
};