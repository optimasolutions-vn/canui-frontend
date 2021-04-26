import React from 'react';
import langConst from '../../../libs/lang';
import Loader from '../../../components/effects/Loader';
import MembersServices from '../../../services/MembersServices';
import {Link} from 'react-router-dom';
import UrlPath from '../../../libs/UrlPath';
import Pagination from '../../../components/cms/pagination';
import {ScriptTabs} from '../Scripts/ScriptTabs';
import General from './General';
import CanUInfoContent from './CanUInfoContent';
import CanIInfoContent from './CanIInfoContent';
import CanIJobs from './CanIJobs';
import CanUJobs from './CanUJobs';
import '../Styles/style.scss';

class CmsMemberDetail extends React.Component {
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
				<div className='service-detail-admin'>
					<div className="row">
						<div className="col-12">
							<div className='title-page-header'>
								<h3>Member Detail</h3>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-12"></div>
					</div>
					<div className="tabs">
						<div className="tabs-header">
							<ul>
								<li className="active"><a href="#" data-tab-id="1">General</a></li>
								<li><a href="#" data-tab-id="2">CanU</a></li>
								{this.state?.dataUser?.cani?.id && (
								<li><a href="#" data-tab-id="3">CanI</a></li>
								)}
								<li><a href="#" data-tab-id="4">CanU Jobs</a></li>
								{this.state?.dataUser?.cani?.id && (
								<li><a href="#" data-tab-id="5">CanI Jobs</a></li>
								)}
							</ul>
							<div className="tab-hover"></div>
							<nav className="tabs-nav">
								<span className="tab-prev"><i className="icon-material-outline-keyboard-arrow-left"></i></span>
								<span className="tab-next"><i className="icon-material-outline-keyboard-arrow-right"></i></span>
							</nav>
						</div>
						<div className="tabs-content">
							<div className="tab active" data-tab-id="1">
								{this.state?.dataUser && <General data={this.state?.dataUser} />}
							</div>
							<div className="tab active" data-tab-id="2">
								{this.state?.dataUser && <CanUInfoContent data={this.state?.dataUser} />}
							</div>
							{this.state?.dataUser?.cani?.id && (
							<div className="tab active" data-tab-id="3">
								{this.state?.dataUser && <CanIInfoContent data={this.state?.dataUser} />}
							</div>
							)}
							<div className="tab active" data-tab-id="4">
								{this.state?.dataUser && <CanUJobs data={this.state?.dataUser} />}
							</div>
							{this.state?.dataUser?.cani?.id && (
							<div className="tab active" data-tab-id="5">
								{this.state?.dataUser && <CanIJobs data={this.state?.dataUser} />}
							</div>
							)}
						</div>
					</div>
				</div>
				{this.state.isLoading && <Loader />}
			</>
		);
	}
};
export default CmsMemberDetail;
