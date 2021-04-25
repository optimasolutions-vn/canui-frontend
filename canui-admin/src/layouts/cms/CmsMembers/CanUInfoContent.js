import React from 'react';
import langConst from '../../../libs/lang';
import Loader from '../../../components/effects/Loader';
import MembersServices from '../../../services/MembersServices';
import {Link} from 'react-router-dom';
import UrlPath from '../../../libs/UrlPath';
import Pagination from '../../../components/cms/pagination';
import {ScriptTabs} from '../Scripts/ScriptTabs';

class CanIInfoContent extends React.Component {
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
		if(prevProps?.match?.params?.id !== this.props?.match?.params?.id){
			this.setupParams();
		}
	};
	setupParams = () => {
		if(this.props?.match?.params?.id){
			this.setState({
				userId : this.props.match.params.id
			});
			this.getMembers(this.props.match.params.id);
		}
	};
	getMembers = (_uid) => {
		this.setState({
			isLoading: true
		}, async () => {
			let _res = await MembersServices.getMemberDetail(_uid);
			if(_res?.data){
				this.setState({
					dataUser: _res.data.content[0],
				});
				console.log(_res);
			}else{
				this.setState({
					errorMes: [_res.message || 'Fail on Request']
				})
			}
			this.setState({
				isLoading: false
			})
		})
		
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
									<th><div>Favourites List ()</div></th>
									<td><div><div></div></div></td>
								</tr>
								<tr>
									<th><div>Rating</div></th>
									<td><div>{this.props.data.cani?.rating || 0}</div></td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
				{this.state.isLoading && <Loader />}
			</>
		);
	}
};
export default CanIInfoContent;
