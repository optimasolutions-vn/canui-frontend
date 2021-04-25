import {
  ACTION_GET_USER_PROFILE,
  ACTION_GET_USER_PROFILE_SUCCESS,
  ACTION_UPDATE_USER_PROFILE
} from '../libs/constActions';

const stateDefault = {
	profile: {},
  	isLoadedProfile: false,
	registerErrorMessage: ''
};
const loginReducer = (state = stateDefault, action) => {
	switch(action.type){
		case ACTION_GET_USER_PROFILE_SUCCESS:
			return {
				...state,
		        profile: action.profile,
		        isLoadedProfile: true,
			};
		case ACTION_GET_USER_PROFILE:
			return {
				...state,
		        isLoadedProfile: false,
			};
		case ACTION_UPDATE_USER_PROFILE:
			return {
				...state,
        profile: action.profile,
			};
		default:
			return state;
	}
};
export default loginReducer;
