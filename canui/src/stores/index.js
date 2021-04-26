import { applyMiddleware, createStore, compose } from 'redux';
import reducers from '../reducers';
import { createBrowserHistory } from "history";
import middleware  from '../middleware';
export const history = createBrowserHistory();

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
function noop(){};
const getMiddleware = () => {
	// console.warn = noop;
  // console.error = noop;
  // console.info = noop;
  // window.console.log = noop;
  	return applyMiddleware(middleware);
};
export const stores = createStore(
	reducers,
  	composeEnhancer(getMiddleware()),
);
