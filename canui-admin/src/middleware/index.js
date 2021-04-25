import * as constActions from '../libs/constActions';

import * as constActionsT from '../libs/constActionsT';


import userHandler from '../handler/user';
import siteHandler from '../handler/site';

const ActionMiddleware = store => next => action => {
  console.log(constActionsT);
  console.log(constActions);

  if (Object.prototype.hasOwnProperty.call(constActions, action.type)) {
    userHandler(action.type, action.params)
  }
  else if(Object.prototype.hasOwnProperty.call(constActionsT, action.type)){
    console.log(constActionsT)
    console.log(action)
    siteHandler(action.type, action.params)
  }
  next(action);
};

export default ActionMiddleware;
