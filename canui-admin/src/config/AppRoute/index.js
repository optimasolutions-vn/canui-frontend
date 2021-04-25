import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  checkAuthenticated,
  checkIsLoginSession
} from '../../helpers';

import UrlPath from '../../libs/UrlPath';
import { useSelector } from 'react-redux';

const AppRoutes = ({ config, component: Component, path, isPrivate, ...rest }) => {
    console.log(rest);
    const { t } = useTranslation();
    /*const isLoginSuccess = useSelector(state => state.login.isLoginSuccess);
    console.log(isLoginSuccess);*/
    if (!checkIsLoginSession() && isPrivate) {
        return <Redirect to={`${UrlPath.CmsPath.CmsLogin}`} />
    }
    return (
        <Route
            path={path}
            render={props => <Component t={t} config={config} {...props} {...rest}/>}
            {...rest}
        />
    )
}

export default AppRoutes;