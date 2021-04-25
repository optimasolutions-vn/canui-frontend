import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  checkAuthenticated
} from '../../helpers'

const AppRoutes = ({ config, component: Component, path, isPrivate, ...rest }) => {
    const { t } = useTranslation();
    const isVerified = checkAuthenticated();
    if (!isVerified && isPrivate) {
        return <Route
          {...rest}
          render={(props) => <Redirect to={{pathname: '/'}} />}
        />
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
