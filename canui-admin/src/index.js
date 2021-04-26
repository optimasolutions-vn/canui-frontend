import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css'; 
import 'bootstrap-css-only/css/bootstrap.min.css'; 
import 'mdbreact/dist/css/mdb.css';
import ReactDOM from 'react-dom';
import App from './App';
import './langs/i18n';

ReactDOM.render(
  <React.Fragment>
  	<App />
  </React.Fragment>,
  document.getElementById('root')
);
