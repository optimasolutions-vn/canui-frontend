import { stores } from '../stores';
import * as constActions from '../libs/constActions';
import JobServices from '../services/jobServices';
const jobHandler = async (type, params) => {
  switch (type) {
    case constActions.ACTION_JOB_GET_DETAIL:
      await getJobDetail(params);
      break;
    case constActions.ACTION_JOB_POST:
      await postJob(params);
      break;
    case constActions.ACTION_JOB_PICK:
      await pickJob(params);
      break;
    default:
      break;
  }
};


const postJob = async (params) => {
  let response = await JobServices.postJob(params);
  if (response.status) {
    stores.dispatch({
      type: constActions.ACTION_JOB_POST_SUCCESS,
      job: response.data
    })
  } else {
    stores.dispatch({
      type: constActions.ACTION_JOB_POST_FAIL,
      errorMessage: response.message || 'Cannot post job'
    })
  }
};

const getJobDetail = async (params) => {
  let response = await JobServices.getJobDetail(params);
  console.log(response);
  if (response.status) {
    stores.dispatch({
      type: constActions.ACTION_JOB_GET_DETAIL_SUCCESS,
      data: response?.data || response
    })
  } else {
    window.location.href = '/404'
  }
};

const pickJob = async (params) => {
  let response = await JobServices.pickJob(params);
  console.log(response);
  if (response.status) {
    stores.dispatch({
      type: constActions.ACTION_JOB_PICK_SUCCESS
    })
  } else {
    stores.dispatch({
      type: constActions.ACTION_JOB_PICK_FAIL,
      errorMessage: response.message || 'Can not pick this job'
    })
  }
};

export default jobHandler;
