import {
  ACTION_MESSAGE_GET_LIST,
  ACTION_MESSAGE_GET_LIST_SUCCESS
} from '../libs/constActions';

const stateDefault = {
	isLoading: false,
  userList: [],
	arrayHistory: [],
  jobList: [],
};
const messageReducer = (state = stateDefault, action) => {
	switch(action.type){
		case ACTION_MESSAGE_GET_LIST:
      return {
        ...state,
        isLoading: true
      };
		case ACTION_MESSAGE_GET_LIST_SUCCESS:
			return {
				...state,
        isLoading: false,
        userList: action.userList,
        arrayHistory: action.arrayHistory,
        jobList: action.jobList
			};
		default:
			return state;
	}
};
export default messageReducer;
