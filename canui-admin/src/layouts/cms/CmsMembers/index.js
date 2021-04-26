import React from 'react';
import langConst from '../../../libs/lang';
import Loader from '../../../components/effects/Loader';
import MembersServices from '../../../services/MembersServices';
import {Link} from 'react-router-dom';
import UrlPath from '../../../libs/UrlPath';
import Pagination from '../../../components/cms/pagination';
//import './style.scss';
import {Popup} from '../Scripts/Popup';
import { MDBDataTableV5 } from 'mdbreact';

import '../Styles/style.scss';


class CmsMembers extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: {},
			members: [],
			total: 0,
			isLoading: false,
			errorMes: [],
			size: 200,
			page: 0,
			sort: 'userId,desc',
			currentItemDelete: false,
			mainData: []
		};
		this.myRef = React.createRef();
	};
	componentDidMount(){
		Popup();
		console.log('test');
		this.setupParams();

	};
	componentDidUpdate(prevProps, prevState){
		if(prevProps.match.params.page !== this.props.match.params.page){
			this.setupParams();
		}
	};
	setupParams = () => {
		if(this.props?.match?.params?.page){
			this.setState({
				page : this.props.match?.params?.page > 0 ? this.props.match?.params?.page - 1 : 0
			});
		}
		this.getMembers();
	};
	getMembers = () => {
		this.setState({
			isLoading: true
		}, async () => {
			let _payload = {
				size : this.state.size,
				page : this.state.page,
				sort : this.state.sort 
			}
			let _temp = [];
			let _res = await MembersServices.getMembers(_payload);
			if(_res?.data){
				if((_res.data?.totalPages - 1) > _res.data?.number){
					//_temp = this.prepareData(_res.data.content);
					this.setState({
						members: _res.data,
						mainData: [...this.state.mainData, ..._res.data.content],
						page: 1+_res.data?.number
					}, () => {
						console.log(this.state.mainData);
						this.getMembers()
					});
				}else{
					//_temp = this.prepareData(_res.data.content);
					this.setState({
						members: _res.data,
						mainData: [...this.state.mainData, ..._res.data.content]
					})
				}
				
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

	handleDeleteUser = (e, x) => {
		e.preventDefault();
		console.log('delete');
		console.log(x);
		console.log(this.myRef);
		this.setState({
			currentItemDelete: x
		}, () => {
			this.myRef.current.click();
		});
	}

	renderActions = (_x) => {
		if(_x){
			return(
				<>
					<span style={{padding: "5px"}}><Link to={`${UrlPath.CmsPath.CmsMembersDetail}/${_x.userId}`} className='btn-update' title='update'><i className='icon-material-outline-launch'></i></Link></span>
					<span style={{padding: "5px"}}><a href="#small-dialog" onClick={e => this.handleDeleteUser(e, _x)} className='btn-delete' title='delete'><i className='icon-material-outline-delete'></i></a></span>
				</>
			);
		}
		return " ";
	}

	prepareData = (_rows) => {
		return _rows.map(x => {
			x.actions = <div>{this.renderActions(x)}</div>
			return x;
		}) || [];	
	}

	setupDataForTable = () => {
		let _data = this.prepareData(this.state.mainData);
		return {
			columns: [
				{
					label: 'User Id',
					field: 'userId',
					width: 100,
				},
				{
					label: 'First Name',
					field: 'firstName',
					width: 150,
				},
				{
					label: 'Last Name',
					field: 'lastName',
					width: 150,
				},
				{
					label: 'Email',
					field: 'email',
					sort: 'asc',
					width: 220,
				},
				{
					label: 'Job CanU Created',
					field: 'createdJob',
					sort: 'disabled',
					width: 110,
				},
				{
					label: 'Job CanU Canceled',
					field: 'canceledJob',
					sort: 'disabled',
					width: 110,
				},
				{
					label: 'Job CanI Processing',
					field: 'processingJob',
					sort: 'disabled',
					width: 110,
				},
				{
					label: 'Job CanI Finished',
					field: 'finishedJob',
					sort: 'disabled',
					width: 110,
				},
				{
					label: 'Status',
					field: 'status',
					sort: 'disabled',
					width: 100,
				},
				{
					label: 'Created At',
					field: 'createdAt',
					sort: 'asc',
					width: 200,
				},
				{
					label: 'Actions',
					field: 'actions',
					sort: 'disabled',
					width: 100,
				}
			],
			rows: _data
		};
	}

	callApiUpdate = async () => {
		if(this.state.isLoading){
			return;
		}
		this.setState({
			isLoading: true
		})
		if(this.state.currentItemDelete){
			let _res;
			let _payload = this.state.currentItemDelete;
			_payload.is_delete = 1;

			try{
				_res = await MembersServices.updateMembers(_payload);
			}catch(err){
				console.log(err);
			}
			
			if(_res?.status){
				this.setState({
					currentItemDelete: false
				});
				this.setState({
					isLoading: false
				}, () => {
					this.getMembers();
				})
			}else{
				this.setState({
					isLoading: false,
					errorMes: [_res?.message || 'update fail'],
					UpdateSuccess: false
				})
			}
		}
	};

	handleConfirmDialog = (e, _res) => {
		e.preventDefault();
		if(_res === 'ok'){
			this.callApiUpdate();
			window.$('.mfp-close').click();
		}else{
			window.$('.mfp-close').click();
		}
	}

	renderPopupConfirmDelete = () => {
		return(
			<div className='popup-confirm'>
				<div style={{display: 'none'}} className="add-note-button">
		          	<a ref={this.myRef} href="#small-dialog" className="popup-with-zoom-anim button full-width button-sliding-icon">Add Note <i className="icon-material-outline-arrow-right-alt"></i></a>
		        </div>
		        <div id="small-dialog" className="zoom-anim-dialog mfp-hide dialog-with-tabs">
					<div className="sign-in-form">
						<div className="popup-tabs-container">
							<div className="popup-tab-content" id="tab">
								<div className="welcome-text">
									<h3>Do you want to remove user ?</h3>
								</div>
								<div className="text">
									User Id: <strong>{this.state?.currentItemDelete?.userId}</strong>
								</div>
								<div className="text">
									Email: <strong>{this.state?.currentItemDelete?.email}</strong>
								</div>
								<div className="row">
									<div className="col-6">
										<button onClick={e => this.handleConfirmDialog(e, 'cancel')} className="button gray ripple-effect-dark">Cancel</button>
									</div>
									<div className="col-6">
										<button onClick={e => this.handleConfirmDialog(e, 'ok')} className="button gray ripple-effect-dark">Ok</button>
									</div>
								</div>
							</div>
						</div>
		          	</div>
		        </div>
	        </div>
		);
	}
	
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
			<React.Fragment>
				<div className='cms-page-content' id='services-list'>
					{this.state?.members?.content?.length > 0 && (
						<MDBDataTableV5 
				            hover 
				            entriesOptions={[10, 20, 30, 40, 50]} 
				            entries={10} 
				            pagesAmount={1} 
				            data={this.setupDataForTable()} 
				            searchTop 
				            scrollX
				            scrollY
				            maxHeight='65vh'
				            searchBottom={false} 
				            />
					)}
					{this.state?.members?.totalPages > 1 && (
					<Pagination 
						totalPages={this.state?.members?.totalPages}
						currentPage={this.state.page}
						urlPaginationPage={`${UrlPath.CmsPath.CmsMembers}`}
						/>
					)}
				</div>
				{this.renderPopupConfirmDelete()}
				{this.state.isLoading && <Loader />}
			</React.Fragment>
		);
	}
};
export default CmsMembers;
