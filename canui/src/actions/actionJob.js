import {
  ACTION_JOB_GET_DETAIL, ACTION_JOB_POST, ACTION_JOB_PICK
} from '../libs/constActions';
export const actionGetJobDetail = (params) => {
  return {
    type: ACTION_JOB_GET_DETAIL,
    params: params
  }
};
export const actionPostJob = (params) => {
  return {
    type: ACTION_JOB_POST,
    params: params
  }
};

export const actionPickJob = (params) => {
  return {
    type: ACTION_JOB_PICK,
    params: params
  }
};
