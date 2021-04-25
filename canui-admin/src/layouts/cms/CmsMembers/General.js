import React from 'react';
import langConst from '../../../libs/lang';
import Loader from '../../../components/effects/Loader';
import MembersServices from '../../../services/MembersServices';
import {Link} from 'react-router-dom';
import UrlPath from '../../../libs/UrlPath';
import Pagination from '../../../components/cms/pagination';
import {ScriptTabs} from '../Scripts/ScriptTabs';
import {convertDateTimeToLocaleString} from '../../../helpers/convert';
import {convertNumberToHaveCommas} from '../../../helpers/DataAccess';

class General extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: {},
			members: [],
			total: 0,
			isLoading: false,
			errorMes: [],
			size: 50,
			page: 0,
			userId: 0,
			dataUser: false,
			sort: 'userId,desc',
		};
		this.myRef = React.createRef();
	};
	componentDidMount(){
		ScriptTabs();
		this.setupParams();
	};
	componentDidUpdate(prevProps, prevState){
		
	};
	setupParams = () => {
		
	};
	
	renderError = () => {
		return this.state.errorMes.map(x => {
			return(
				<p>{x}</p>
			)
		});
	}
	render(){
		const { t } = this.props;
		return(
			<>
				<div className="row member-table">
					<div className="col-12">
						<table>
							<tbody>
								<tr>
									<th><div>User Id</div></th>
									<td><div className="submit-field">{this.props.data.userId}</div></td>
								</tr>
								<tr>
									<th><div>First Name</div></th>
									<td><div className="submit-field">{this.props.data.firstName}</div></td>
								</tr>
								<tr>
									<th><div>Last Name</div></th>
									<td><div className="submit-field">{this.props.data.lastName}</div></td>
								</tr>
								<tr>
									<th><div>Email</div></th>
									<td><div>{this.props.data.email}</div></td>
								</tr>
								<tr>
									<th><div>Created At</div></th>
									<td><div>{convertDateTimeToLocaleString(this.props.data.createdAt)}</div></td>
								</tr>
								<tr>
									<th><div>C Point</div></th>
									<td><div>{convertNumberToHaveCommas(this.props.data.cPoint) || 0} Point</div></td>
								</tr>
								<tr>
									<th><div>C Cash</div></th>
									<td><div>{convertNumberToHaveCommas(this.props.data.cCashValue) || 0} {this.props.data.cCashCurrency || 'VND'}</div></td>
								</tr>
								<tr>
									<th><div>Coupon</div></th>
									<td><div>{convertNumberToHaveCommas(this.props.data.couponValue)|| 0} {this.props.data.couponCurrency || 'VND'}</div></td>
								</tr>
								<tr>
									<th><div>View</div></th>
									<td><div>{convertNumberToHaveCommas(this.props.data.view)|| 0}</div></td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</>
		);
	}
};
export default General;
