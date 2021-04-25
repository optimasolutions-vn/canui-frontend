import {
  ACTION_GET_USER_PROFILE,
  ACTION_GET_USER_PROFILE_SUCCESS,
  ACTION_UPDATE_USER_PROFILE,
  ACTION_GET_USER_PROFILE_CAN_I,
  ACTION_GET_USER_PROFILE_CAN_I_SUCCESS,
  ACTION_UPDATE_USER_PROFILE_CAN_I,
  ACTION_UPDATE_USER_PROFILE_SUCCESS,
  ACTION_UPDATE_USER_PROFILE_FAIL,
  ACTION_UPDATE_USER_PROFILE_CAN_I_FAIL, ACTION_UPDATE_USER_PROFILE_CAN_I_SUCCESS, ACTION_GET_USER_DETAIL,
  ACTION_GET_USER_DETAIL_SUCCESS, ACTION_MESSAGE_GET_LIST_SUCCESS
} from '../libs/constActions';

const stateDefault = {
	profile: {},
	isLoadedProfile: false,
	registerErrorMessage: '',
	isLoadingProfileCanI: true,
	isUploadingProfileCanI: false,
	isUpdatingProfile: false,
	canI: {},
	userDetail: {},
	isLoadingUserDetail: true,
  totalUnread: 0,
	reviewList: []
};
const loginReducer = (state = stateDefault, action) => {
	switch(action.type){
		case ACTION_GET_USER_DETAIL:
			return {
				...state,
        isLoadingUserDetail: true,
				userDetail: {}
			};
		case ACTION_GET_USER_DETAIL_SUCCESS:
      return {
        ...state,
        isLoadingUserDetail: false,
        userDetail: action.profile,
        reviewList: action.reviewList
      };
		case ACTION_UPDATE_USER_PROFILE_CAN_I:
      return {
        ...state,
        isUploadingProfileCanI: true,
      };
		case ACTION_UPDATE_USER_PROFILE_CAN_I_FAIL:
      return {
        ...state,
        isUploadingProfileCanI: false,
				errorMessage: action.errorMessage
      };
		case ACTION_UPDATE_USER_PROFILE_CAN_I_SUCCESS:
      return {
        ...state,
        isUploadingProfileCanI: false,
        canI: action.profile,
        errorMessage: ''
      };
		case ACTION_GET_USER_PROFILE_CAN_I:
			return {
				...state,
				canI: {},
        isLoadingProfileCanI: true,
			};
		case ACTION_GET_USER_PROFILE_CAN_I_SUCCESS:
			return {
				...state,
				canI: action.canI,
        isLoadingProfileCanI: false
			};
		case ACTION_GET_USER_PROFILE_SUCCESS:
			return {
				...state,
		        profile: action.profile,
		        isLoadedProfile: true,
        totalUnread: action.totalUnread
			};
		case ACTION_GET_USER_PROFILE:
			return {
				...state,
		        isLoadedProfile: false,
			};
		case ACTION_UPDATE_USER_PROFILE:
			return {
				...state,
        errorMessage: '',
        isUpdatingProfile: true,
			};
		case ACTION_UPDATE_USER_PROFILE_SUCCESS:
			return {
				...state,
        isUpdatingProfile: false,
				profile: action.profile
			};
    case ACTION_UPDATE_USER_PROFILE_FAIL:
      return {
        ...state,
        isUpdatingProfile: false,
       	errorMessage: 'Cannot update profile'
      };
		case ACTION_MESSAGE_GET_LIST_SUCCESS:
			return {
				...state,
        totalUnread: action.totalUnread
			};
		default:
			return state;
	}
};
export default loginReducer;
