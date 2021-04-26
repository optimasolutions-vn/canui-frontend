import { stores } from '../stores';
import * as constActions from '../libs/constActions';
import FavouriteServices from '../services/favouriteServices';
const favouriteHandler = async (type, params) => {
  switch (type) {
    case constActions.ACTION_FAVOURITE:
      await postFavourite(params);
      break;
    case constActions.ACTION_GET_FAVOURITE_LIST:
      await getFavourite(params);
      break;
    default:
      break;
  }
};

const postFavourite = async (params) => {
  FavouriteServices.postFavourite(params);
};

const getFavourite = async (params) => {
  let response = await FavouriteServices.getFavourite(params);
    let favouriteList = response.status ? response.data : [];
    stores.dispatch({
      type: constActions.ACTION_GET_FAVOURITE_LIST_SUCCESS,
      favouriteList: favouriteList
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

export default favouriteHandler;
