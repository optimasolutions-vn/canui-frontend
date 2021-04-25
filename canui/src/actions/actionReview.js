import {
  ACTION_REVIEW_GET_LIST
} from '../libs/constActions';
export const actionGetListReview = (params) => {
  return {
    type: ACTION_REVIEW_GET_LIST,
    params
  }
};
