import {
  ACTION_REVIEW_GET_LIST,
  ACTION_REVIEW_GET_LIST_SUCCESS
} from '../libs/constActions';

const stateDefault = {
	isLoading: false,
	reviewList: [],
	totalPage: 1,
};
const reviewReducer = (state = stateDefault, action) => {
	switch(action.type){
		case ACTION_REVIEW_GET_LIST:
			return {
				...state,
        isLoading: true,
        reviewList: []
			};
		case ACTION_REVIEW_GET_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        reviewList: action.reviewList
      };
		default:
			return state;
	}
};
export default reviewReducer;
