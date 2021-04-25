import {
  ACTION_MESSAGE_GET_LIST
} from '../libs/constActions';
export const actionGetListUser = (params) => {
  return {
    type: ACTION_MESSAGE_GET_LIST,
    params: params
  }
};
