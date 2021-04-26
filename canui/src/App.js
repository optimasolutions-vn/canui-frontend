import React from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';

import { PropTypes } from "prop-types";
import './index.css';
import { connect } from "react-redux";
import { stores, history } from './stores';
import { Provider } from 'react-redux';

import LoadDataBeforeTemp from './helpers/LoadDataBeforeTemp';
import Loader from './components/effects/Loader';
import Header from './components/header';
import Footer from './components/footer';
import routes from './config/routes';
import AppRoutes from './config/AppRoute';
import listJs from './libs/internalLibs';
import config from './config/constant';
import {
  getProfile
} from './services/userService';
import messageServices from './services/messageServices';
import {
  ACTION_GET_USER_PROFILE_SUCCESS
} from './libs/constActions';


/*const AppRoutes = React.lazy(() => import('./config/AppRoutes'));
const routes = React.lazy(() => import('./config/routes'));*/

function App() {

  const [dataBefore, setDataBefore] = React.useState(false);
  const onLoad = async () => {
    let accessToken = localStorage.getItem('access_token');
    if (accessToken) {
      let response = await getProfile();
      let responseMessage = await messageServices.getListUser();
      let responseNotificationHistory = await messageServices.getNotificationHistory({});
      let totalUnread = 0;
      let messages = [];
      let notificationUnread = 0;
      let notifications = [];
      if (responseNotificationHistory.status) {
        notifications = responseNotificationHistory.data.detail;
        notificationUnread = responseNotificationHistory.data.unreadCount
      }
      if (responseMessage.status) {
        let mes = responseMessage.data.filter(item => item.unreadCount);
        totalUnread = mes ? mes.length : 0;
        messages = mes ? mes : []
      }
      if(response.status) {
        stores.dispatch({
          type: ACTION_GET_USER_PROFILE_SUCCESS,
          profile: response.data.profile,
          messages: messages,
          totalUnread: totalUnread,
          notifications: notifications,
          notificationUnread: notificationUnread
        })
      }
    }
    let _resAll = await LoadDataBeforeTemp.init();
    if(_resAll){
      setDataBefore(_resAll);
    }
  };

  React.useEffect(() => {
    onLoad();
  }, []);

  return (
    <Provider
      store={stores}>
        <Router
          history={history}
          config={config}
          >
          <React.Suspense fallback={<Loader/>}>
          {!dataBefore && <Loader/>}
          {dataBefore && (
            <div id="wrapper">
              <Header
                history={history}
                config={config}  />
              <div id="main-content">
                <Switch>
                  {routes.map((route) => (
                    <AppRoutes
                      key={route.path}
                      path={route.path}
                      exact={route.exact}
                      component={route.component}
                      isPrivate={route.isPrivate}
                      sitedata={dataBefore}
                    />
                  ))}
                </Switch>
              </div>
              <Footer
                history={history}
                config={config} />
            </div>
          )}
          </React.Suspense>
        </Router>
    </Provider>
  );
}
export default App;
