import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import * as redirectSocial from './redirectSocial'; 
import App from './App';
import './langs/i18n';
redirectSocial.init();
serviceWorker.register();
ReactDOM.render(
  <React.Fragment>
  	<App />
  </React.Fragment>,
  document.getElementById('root')
);

