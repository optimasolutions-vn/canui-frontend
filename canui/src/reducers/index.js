import loginReducer from './login';
import userReducer from './user';
import jobReducer from './job';
import siteDataReducer from './siteData';
import messageReducer from './message';
import favouriteReducer from './favourite';
import notificationReducer from './notification';
import reviewReducer from './review';
import {combineReducers} from 'redux';
export default combineReducers({
	login: loginReducer,
	user: userReducer,
	siteData: siteDataReducer,
	job: jobReducer,
	message: messageReducer,
	favourite: favouriteReducer,
	notification: notificationReducer,
	review: reviewReducer
});
