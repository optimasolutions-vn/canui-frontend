import {
  ACTION_GET_FAVOURITE_LIST_SUCCESS,
	ACTION_GET_FAVOURITE_LIST
} from '../libs/constActions';

const stateDefault = {
	isLoading: false,
	favouriteList: [],
};
const favouriteReducer = (state = stateDefault, action) => {
	switch(action.type){
		case ACTION_GET_FAVOURITE_LIST:
			return {
				...state,
        isLoading: true,
        favouriteList: []
			};
		case ACTION_GET_FAVOURITE_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        favouriteList: action.favouriteList || []
      };
		default:
			return state;
	}
};
export default favouriteReducer;
