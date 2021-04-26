import { stores } from '../stores';
import * as constActions from '../libs/constActions';
import messageServices from '../services/messageServices';
import jobServices from '../services/jobServices';
import moment from "moment";
import {
  getProfileUserDetail
} from '../services/userService';
const messageHandler = async (type, params) => {
  switch (type) {
    case constActions.ACTION_MESSAGE_GET_LIST:
      await getListUser(params);
      break;
    default:
      break;
  }
};


const getListUser = async (params) => {
  let response = await messageServices.getListUser();
  let arrayUser = [];
  let totalUnread = 0;
  if (response.status) {
    arrayUser = response.data;
    let messages = response.data.filter(item => item.unreadCount);
    totalUnread = messages ? messages.length : 0
  }
  let jobList = [];
  if (params.userId) {
    let resUserProfile = await getProfileUserDetail(params);
    let user = resUserProfile.data.content[0];
    let idx = arrayUser.map(item => {
      return item.id
    }).indexOf(user.userId);
    if (idx  === -1) {
      console.log(user);
      arrayUser.push({
        id: user.userId,
        avatar: user.avatar || '',
        name: `${user.firstName || ''} ${user.lastName || ''}`,
        createdAt: moment().format("YYYY-MM-DDThh:mm:ss")
      })
    }
  }
  if (params.ownerId) {
    let resJobOwner = await jobServices.getJobList({
      query: `status=PENDING&page=0&size=1000&sort=createdAt,desc&owner=${params.ownerId}`
    });
    if (resJobOwner.status) {
      jobList = resJobOwner.data.content
    }
  }

  let resHistory = await messageServices.getHistory(params);
  let arrayHistory = [];
  if (resHistory.status) {
    arrayHistory = resHistory.data
  }
  arrayHistory.reverse();
  stores.dispatch({
    totalUnread: totalUnread,
    type: constActions.ACTION_MESSAGE_GET_LIST_SUCCESS,
    userList: arrayUser,
    arrayHistory: arrayHistory,
    jobList: jobList
  });
};

export default messageHandler;
