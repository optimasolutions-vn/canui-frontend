import {stores} from '../stores';
import { connect } from 'react-redux';
import CategoriesServices from '../services/CategoriesServices';
import otherServices from '../services/otherServices';
import siteHandle from '../handler/site';
import {
	actionGetSiteData
} from '../actions/actionSite';
export default{
	listDataCheck: [
		'canui-services-categories'
	],
	async init(){

		let _a = siteHandle(actionGetSiteData()?.type);// CategoriesServices.getCategoriesServices();
		let _b = await otherServices.getCountry();
		let _c = [];
		if(_b){
			_b.map(x => {
				_c.push(otherServices.getCityByCountry({country: x.countryId}));
				return
			})
		}
		return Promise.all([_a, _b, ..._c])
						.then((res) => {
							console.log(res);
							console.log(stores.getState());
						  return res;
						})
						.catch(err => {
							console.log(err);
							return false;
						});
	},
}