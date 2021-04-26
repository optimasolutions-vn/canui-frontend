import {
  ACTION_JOB_GET_DETAIL,
  ACTION_JOB_GET_DETAIL_SUCCESS, ACTION_JOB_PICK, ACTION_JOB_PICK_FAIL, ACTION_JOB_PICK_SUCCESS, ACTION_JOB_POST,
  ACTION_JOB_POST_FAIL,
  ACTION_JOB_POST_SUCCESS
} from '../libs/constActions';

const stateDefault = {
	isLoading: true,
  jobDetail: {},
	errorMessage: '',
	isPosting: false,
  isPicking: false
};
const jobReducer = (state = stateDefault, action) => {
	switch(action.type){
    case ACTION_JOB_PICK:
      return {
        ...state,
        isPicking: true
      };
    case ACTION_JOB_PICK_SUCCESS:
      return {
        ...state,
        isPicking: false,
        errorMessage: ''
      };
    case ACTION_JOB_PICK_FAIL:
      return {
        ...state,
        isPicking: false,
        errorMessage: action.errorMessage
      };
		case ACTION_JOB_POST:
      return {
        ...state,
        isPosting: true,
        errorMessage: ''
      };
    case ACTION_JOB_POST_SUCCESS:
      return {
        ...state,
        jobDetail: action.job,
        isPosting: false
      };
		case ACTION_JOB_POST_FAIL:
      return {
        ...state,
        isPosting: false,
        errorMessage: action.errorMessage
      };
    case ACTION_JOB_GET_DETAIL:
      return {
        ...state,
        isLoading: true
      }
		case ACTION_JOB_GET_DETAIL_SUCCESS:
			return {
				...state,
        jobDetail: action.data,
        isLoading: false
			};
		default:
			return state;
	}
};
export default jobReducer;
