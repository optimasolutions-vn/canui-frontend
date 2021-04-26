import {
  ACTION_GET_FAVOURITE_LIST,
  ACTION_FAVOURITE
} from '../libs/constActions';
export const actionGetListFavourite = (params) => {
  return {
    type: ACTION_GET_FAVOURITE_LIST,
    params
  }
};

export const actioncFavourite = (params) => {
  return {
    type: ACTION_FAVOURITE,
    params
  }
};
