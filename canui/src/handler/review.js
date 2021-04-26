import { stores } from '../stores';
import * as constActions from '../libs/constActions';
import ReviewService from '../services/reviewServices';
const reviewHandler = async (type, params) => {
  switch (type) {
    case constActions.ACTION_REVIEW_GET_LIST:
      await getReview(params);
      break;
    default:
      break;
  }
};

const getReview = async (params) => {
  let response = await ReviewService.getReviewList(params);
    let reviewList = response.status ? response.data.content : [];
    stores.dispatch({
      type: constActions.ACTION_REVIEW_GET_LIST_SUCCESS,
      reviewList: reviewList
    })
  // console.log(response);
  // if (response.status) {
  //   stores.dispatch({
  //     type: constActions.ACTION_JOB_GET_DETAIL_SUCCESS,
  //     data: response?.data || response
  //   })
  // } else {
  //   window.location.href = '/404'
  // }
};

export default reviewHandler;
