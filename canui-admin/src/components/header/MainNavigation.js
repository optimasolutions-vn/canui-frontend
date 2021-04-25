import React from 'react';
import {Link} from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { withRouter } from 'react-router-dom';
import PostDataHeader from '../../helpers/PostDataHeader';
const $ = window.$;
function runScript(){

}
function MainNavigation ({history}){
	const [currentPage, setCurrentPage] = React.useState(false);
	React.useEffect(() => {
		setCurrentPage(history.location.pathname);
		console.log(history);
		runScript();
	}, [history]);


	const { t, i18n } = useTranslation();
	const rewriteClassName = (_x) => {
		return _x === currentPage ? 'current' : '';
	};
	const renderMainMenu = () => {
		if(!PostDataHeader || !PostDataHeader.menuHeader){
			return null ;
		}
		return PostDataHeader.menuHeader.map(x => {
			return (
				<li key={x.value}><Link to={x.value} className={rewriteClassName(x.value)} ><span>{t(x.label)}</span></Link></li>
			);
		});
	};

	return (
		<nav id="navigation">
			<ul id="responsive">
				{renderMainMenu()}
			</ul>
		</nav>
	);
};
export default withRouter(MainNavigation);
