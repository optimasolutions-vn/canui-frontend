import React from 'react';
import langConst from '../../../libs/lang';
import Loader from '../../../components/effects/Loader';
import MembersServices from '../../../services/MembersServices';
import {Link} from 'react-router-dom';
import UrlPath from '../../../libs/UrlPath';
import Pagination from '../../../components/cms/pagination';
import {ScriptTabs} from '../Scripts/ScriptTabs';
import JobsServices from '../../../services/JobsServices';

class CanUJobs extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: {},
			members: [],
			total: 0,
			page: 0,
			isLoading: false,
			errorMes: [],
			JobsPending: [],
			JobsCompleted: [],
			JobsInProcess: [],
			JobsCanceled: [],
			Jobs: false
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
		this.getJobsList();
	};
	getJobsList = async (_uid) => {
		let _res;
        let _op = {
            page: this.state.page,
            size: 100,
            sort: 'createdAt,desc',
        };
        _op.owner = this.props.data.userId;
        _res = await JobsServices.getJobsList(_op);
		if(_res?.data){
			this.setState({
				JobsPending: [...this.state.JobsPending, ..._res.data.content.filter(x => x.status === 'PENDING')],
				JobsCompleted: [...this.state.JobsCompleted, ..._res.data.content.filter(x => x.status === 'COMPLETED')],
				JobsInProcess: [...this.state.JobsInProcess, ..._res.data.content.filter(x => x.status === 'PROCESSING')],
				JobsCanceled:[...this.state.JobsCanceled, ..._res.data.content.filter(x => x.status === 'CANCEL')],
				page: this.state.page + 1,
			}, () => {
				if((_res.data?.totalPages - 1) > _op.page){
					this.getJobsList();
				}
			});
		}else{
			this.setState({
				errorMes: [_res.message || 'Fail on Request']
			})
		}
		
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
									<th>
										<div>Jobs Posting <strong>({this.state?.JobsPending?.length || 0})</strong></div>
									</th>
									<td><div className="task-tags">
									{this.state?.JobsPending.map(x => {
										return (
											<span style={{margin: "5px"}}>
												<Link to={`${UrlPath.CmsPath.CmsJobsDetail}/${x.id}`}>({x.id}) {x.title}</Link>
											</span>
										)
									})}
									</div></td>
								</tr>
								<tr>
									<th><div>Jobs In Process <strong>({this.state?.JobsInProcess?.length || 0})</strong></div></th>
									<td><div className="task-tags">
									{this.state?.JobsInProcess.map(x => {
										return (
											<span style={{margin: "5px"}}>
												<Link to={`${UrlPath.CmsPath.CmsJobsDetail}/${x.id}`}>({x.id}) {x.title}</Link>
											</span>
										)
									})}
									</div></td>
								</tr>
								<tr>
									<th><div>Jobs Completed <strong>({this.state?.JobsCompleted?.length || 0})</strong></div></th>
									<td><div className="task-tags">
									{this.state?.JobsCompleted.map(x => {
										return (
											<span style={{margin: "5px"}}>
												<Link to={`${UrlPath.CmsPath.CmsJobsDetail}/${x.id}`}>({x.id}) {x.title}</Link>
											</span>
										)
									})}
									</div></td>
								</tr>
								<tr>
									<th><div>Jobs Canceled <strong>({this.state?.JobsCanceled?.length || 0})</strong></div></th>
									<td><div className="task-tags">
									{this.state?.JobsCanceled.map(x => {
										return (
											<span style={{margin: "5px"}}>
												<Link to={`${UrlPath.CmsPath.CmsJobsDetail}/${x.id}`}>({x.id}) {x.title}</Link>
											</span>
										)
									})}
									</div></td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</>
		);
	}
};
export default CanUJobs;
