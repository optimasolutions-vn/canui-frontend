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
import LeftSideBar from './components/cms/LeftSideBar';
import Footer from './components/footer';
import routes from './config/routes';
import AppRoutes from './config/AppRoute';
import listJs from './libs/internalLibs';
import config from './config/constant';
import { useSelector } from 'react-redux';


/*const AppRoutes = React.lazy(() => import('./config/AppRoutes'));
const routes = React.lazy(() => import('./config/routes'));*/

function App() {
	
	const [dataBefore, setDataBefore] = React.useState(false);

	const onLoad = async () => {
		let _resAll = await LoadDataBeforeTemp.init();
		if(_resAll){
			setDataBefore(_resAll);
		}
	};

	React.useEffect(() => {
		onLoad();
	}, []);

	return (
		<Provider store={stores}>
			<Router history={history} config={config} basename={'/cms'}>
				<React.Suspense fallback={<Loader/>}>
				{!dataBefore && <Loader/>}
				{dataBefore && (
					<div id="wrapper">
						<Header 
							history={history}
							config={config}  />
						<div className="dashboard-container">
							<LeftSideBar 
								history={history}
								config={config} />
							<div className="dashboard-content-container">
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
						</div>
						<Footer  
							history={history}
							config={config}
							/>
					</div>
				)}
				</React.Suspense>
			</Router>
		</Provider>
	);
}
export default App;
