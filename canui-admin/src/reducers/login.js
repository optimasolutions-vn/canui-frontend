import {
  ACTION_LOGIN,
  ACTION_LOGOUT,
  ACTION_LOGIN_FAIL,
  ACTION_LOGIN_SUCCESS,
  ACTION_REGISTRATION,
  ACTION_REGISTRATION_SUCCESS,
  ACTION_REGISTRATION_FAIL
} from '../libs/constActions';

const stateDefault = {
	status: true,
	isOnline: true,
	loading: false,
	infoUser: {},
	Socials: {},
	isRegistering: false,
	isRegisterSuccess: false,
  isLogin: false,
  errorMessageLogin: '',
	accessToken: '',
  isLoginSuccess: false,
  errorMessageRegister: ''
};
const loginReducer = (state = stateDefault, action) => {
	switch(action.type){
		case ACTION_LOGIN:
			return {
				...state,
        isLogin: true,
        isLoginSuccess: false,
        errorMessageLogin: '',
			};
		case ACTION_LOGIN_FAIL:
      return {
        ...state,
        isLogin: false,
        isLoginSuccess: false,
        errorMessageLogin: action.errorMessage
      };
    case ACTION_LOGIN_SUCCESS:
      return {
        ...state,
        isLogin: false,
        accessToken: action.accessToken,
        isLoginSuccess: true,
        errorMessage: ''
      };
		case ACTION_LOGOUT:
			return stateDefault;
		case ACTION_REGISTRATION:
			return {
				...state,
        isRegistering: true,
        isRegisterSuccess: false
			};
		case ACTION_REGISTRATION_SUCCESS:
			return {
				...state,
        isRegistering: false,
        isRegisterSuccess: true
			};
    case ACTION_REGISTRATION_FAIL:
			return {
				...state,
        isRegistering: false,
        errorMessageRegister: action.errorMessage
			};
		default:
			return state;
	}
};
export default loginReducer;
