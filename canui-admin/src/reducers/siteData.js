import * as constActionsT from '../libs/constActionsT';

const stateDefault = {
	categories: {},
  	isLoadedData: false,
  	mes: ''
};
const siteDataReducer = (state = stateDefault, action) => {
	switch(action.type){
		case constActionsT.ACTION_GET_OPTION_SITE_SUCCESS:
			return {
				...state,
		        categories: action.data,
		        isLoadedData: true,
			};
		case constActionsT.ACTION_GET_OPTION_SITE:
			return {
				...state,
		        isLoadedData: false,
			};
		case constActionsT.ACTION_GET_OPTION_SITE_FAIL:
			return {
				...state,
		        isLoadedData: true,
		        mes: 'fail'
			};
		default:
			return state;
	}
};
export default siteDataReducer;
