import React from 'react';
import langConst from '../../../libs/lang';
import Loader from '../../../components/effects/Loader';
import MembersServices from '../../../services/MembersServices';
import {Link} from 'react-router-dom';
import UrlPath from '../../../libs/UrlPath';
//import './style.scss';

class Pagination extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: {},
			members: [],
			totalElements: this.props.totalElements,
			totalPages: this.props.totalPages,
			urlPaginationPage: this.props.urlPaginationPage,
			currentPage: 1 + this.props.currentPage,
			pageSize: this.props.pageSize,
			isLoading: false,
			errorMes: [],
			size: 100,
			page: 0,
			sort: 'userId,desc',
		};
	};

	renderPagination = () => {
		let _total = 0;
		let _state = this.state;
		let _ar = [...Array(_state.totalPages + 1).keys()];
		_ar.splice(0, 1);
		console.log(_state);
		console.log(_ar);
		//debugger;
		return(
			<div className="pagination">
				<div className="clearfix"></div>
				<div className="row">
					<div className="col-md-12">
						<div className="pagination-container margin-top-40 margin-bottom-60">
							<nav className="pagination">
								<ul>
									{_state.currentPage > 1 && (
										<li className="pagination-arrow">
											{_state.currentPage - 1 > 1 &&
											<Link to={`${_state.urlPaginationPage}/${Number(_state.currentPage)-1 === 0 ? '' : Number(_state.currentPage)-1}`} className="ripple-effect"><i className="icon-material-outline-keyboard-arrow-left"></i></Link>
											}
											{_state.currentPage - 1 <= 1 &&
											<Link to={`${_state.urlPaginationPage}`} className="ripple-effect"><i className="icon-material-outline-keyboard-arrow-left"></i></Link>
											}
										</li>
									)}
									{_ar.map(x => {
										return x > 1 
											? <li><Link to={`${_state.urlPaginationPage}/${Number(x)}`} className={`${Number(_state.currentPage) === Number(x) ? 'current-page ripple-effect' : 'ripple-effect'}`}>{x}</Link></li> 
											: <li><Link to={`${_state.urlPaginationPage}`} className={`${Number(_state.currentPage) === Number(x) ? 'current-page ripple-effect' : 'ripple-effect'}`}>{x}</Link></li> 
									})}
									{_state.currentPage < _state.totalPages && (
										<li className="pagination-arrow">
											<Link to={`${_state.urlPaginationPage}/${Number(_state.currentPage) + 1}`} className="ripple-effect"><i className="icon-material-outline-keyboard-arrow-right"></i></Link>
										</li>
									)}
								</ul>
							</nav>
						</div>
					</div>
				</div>
			</div>
		);
	}
	render(){
		const { t } = this.props;
		return(
			<React.Fragment>
				{this.renderPagination()}
			</React.Fragment>
		);
	}
};
export default Pagination;
