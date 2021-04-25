import loginReducer from './login';
import userReducer from './user';
import siteDataReducer from './siteData';
import {combineReducers} from 'redux';
export default combineReducers({
	login: loginReducer,
	user: userReducer,
	siteData: siteDataReducer,
});
