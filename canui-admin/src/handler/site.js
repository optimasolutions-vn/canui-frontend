import { stores } from '../stores';
import * as constActionsT from '../libs/constActionsT';
import CategoriesServices from '../services/CategoriesServices';
const siteHandler = async (type, params) => {
  console.log(type);
  console.log(constActionsT.ACTION_GET_OPTION_SITE_SUCCESS);
  console.log(constActionsT.ACTION_GET_OPTION_SITE);
  switch (type) {
    case constActionsT.ACTION_GET_OPTION_SITE:
      return await getOptionsSite();
      break;
    default:
      break;
  }
};


const getOptionsSite = async () => {
  let response = await CategoriesServices.getCategoriesServices();
  console.log(response);
  if (response.status) {
    stores.dispatch({
      type: constActionsT.ACTION_GET_OPTION_SITE_SUCCESS,
      data: response?.data || response
    });
    return response?.data || response;
  }
};

export default siteHandler;
