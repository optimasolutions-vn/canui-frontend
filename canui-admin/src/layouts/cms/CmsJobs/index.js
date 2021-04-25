import React from 'react';
import langConst from '../../../libs/lang';
import Loader from '../../../components/effects/Loader';
import JobsServices from '../../../services/JobsServices';
import {Link} from 'react-router-dom';
import UrlPath from '../../../libs/UrlPath';
import Pagination from '../../../components/cms/pagination';
import { MDBDataTableV5 } from 'mdbreact';
import { Popup, Alert} from '../Scripts/Popup';
import MessageConst from '../../../libs/MessageConst';
import '../Styles/style.scss';
import { encodeData, getNationList } from '../../../helpers/DataAccess';
import noImage from '../../../assets/images/no-image-job.png';
import FilterJobs from '../../../components/cms/FilterJobs';
const _constLength = 20;
class CmsMembers extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: {},
			total: 0,
			isLoading: false,
			errorMes: [],
			size: 200,
			page: 0,
			sort: 'id,desc',
			mainData: [],
			rootData: [],
			reasonDelete: '',
			errorMesDelete: false,
			OpenPopupFilter: false,
			totalPages: 0,
			listCanIPickupJob: [],
			listCanIRequestedJob: [],
			listCanUCreatedJob: [],
		};
		this.myRef = React.createRef();
	};
	componentDidMount(){
		Popup();
		this.getData();

	};
	componentDidUpdate(prevProps, prevState){};
	setupParams = () => {
		if(this.props?.match?.params?.page){
			this.setState({
				page : this.props.match.params.page >= 1 ? this.props.match.params.page - 1 : this.props.match.params.page
			});
		}
		this.getData();
	};
	getData = () => {
		this.setState({
			isLoading: true
		}, async () => {
			let _payload = {
				size : this.state.size,
				page : this.state.page,
				sort : this.state.sort 
			}
			let _res,
				canucreate = this.state.listCanUCreatedJob || [],
				canipickup = this.state.listCanIPickupJob || [],
				canirequested = this.state.listCanIRequestedJob || [];
			try{
				_res = await JobsServices.getJobsList(_payload);
			}catch(err){
				console.log(err);
			}
			
			if(_res?.data){
				_res.data.content.map(x => {
					if(x?.pickupCanI){
						x.pickupCanI.map(y => { 
							if(!canipickup.find(z => z.id === y.id)){
								canipickup.push({
									id: y.id,
									name: y?.name
								}); 
							}
						});
					}
					if(x?.requestedUser?.id){
						if(!canirequested.find(z => z.id === x?.requestedUser?.id)){
							canirequested.push({
								id: x?.requestedUser?.id,
								name: x?.requestedUser?.name
							}); 
						}
					}
					if(x?.creationUser?.id){
						if(!canucreate.find(z => z.id === x?.creationUser?.id)){
							canucreate.push({
								id: x?.creationUser?.id,
								name: x?.creationUser?.name
							}); 
						}
					}
				});
				this.setState({
					listCanUCreatedJob: canucreate.sort((x,y) => x.id > y.id ? 1 : -1),
					listCanIPickupJob: canipickup.sort((x,y) => x.id > y.id ? 1 : -1),
					listCanIRequestedJob: canirequested.sort((x,y) => x.id > y.id ? 1 : -1),
					mainData: [...this.state.mainData, ..._res.data.content],
					rootData: [...this.state.rootData, ..._res.data.content],
					totalPages: _res.data.totalPages,
					page: 1+this.state.page
				});
				if((_res.data.totalPages - 1) > _res.data.number){
					this.getData();
				}else{
					this.setState({
						isLoading: false
					})
				}
			}else{
				Alert({
					title: _res?.message || `${MessageConst.MessStatic.Get_Job_List_Fail}`,
					status: false
				});
				this.setState({
					isLoading: false
				})
			}
			
		})
		
	};

	handleDeleteItem = (e, x) => {
		e.preventDefault();
		this.setState({
			currentItemDelete: x,
			reasonDelete: '',
			errorMesDelete: ''
		}, () => {
			this.myRef.current.click();
		});
	}

	renderServiceList = (_list) => {
		if(_list?.length > 0){
			return _list.map(x => {
				return <div key={`service${x.id}`}><Link to={`${UrlPath.CmsPath.CmsServices}/${x.slug}`}>{x.title}</Link></div>
			});
		}
		return null;
	}

	renderCreatorUser = (x) => {
		if(x?.id){
			return <Link to={`${UrlPath.CmsPath.CmsMembersDetail}/${x.id}`}>{`(${x.id}) ${x?.name}`}</Link>
		}
		return " ";
	}

	renderPickupCaniList = (_list) => {
		if(_list?.length > 0){
			return _list.map(x => {
				return <div key={`pickupcani${x.id}`}><Link to={`${UrlPath.CmsPath.CmsMembersDetail}/${x.id}`}>{`(${x.id}) ${x?.name}`}</Link></div>
			});
		}
		return " ";
	}

	renderRequestedCanI = (x) => {
		if(x?.id){
			return <Link to={`${UrlPath.CmsPath.CmsMembersDetail}/${x.id}`}>{`(${x.id}) ${x?.name}`}</Link>
		}
		return " ";
	}

	renderActions = (_x) => {
		if(_x){
			return(
				<>
					<span style={{padding: "5px"}}><Link to={`${UrlPath.CmsPath.CmsJobsDetail}/${_x.id}`} className='btn-update' title='update'><i className='icon-material-outline-launch'></i></Link></span>
					<span style={{padding: "5px"}}><a href="#small-dialog" onClick={e => this.handleDeleteItem(e, _x)} className='btn-delete' title='delete'><i className='icon-material-outline-delete'></i></a></span>
				</>
			);
		}
		return " ";
	}
	renderKWL = (_list) => {
		if(_list?.length > 0){
			return _list.map(x => {
				return <div key={`kwl${x}`}><strong>{x}</strong></div>
			});
		}
		return " ";
	}
	renderNationName = (_nid) => {
		return getNationList().find(x => x.countryId === _nid)?.countryName || _nid;
	}
	
	prepareData = (_rows) => {
		return _rows.map(x => {
			x.actions = <div>{this.renderActions(x)}</div>
			x.creationUserName = <div>{this.renderCreatorUser(x.creationUser)}</div>;
			x.pickupCanIList = <div>{this.renderPickupCaniList(x.pickupCanI)}</div>
			x.serviceList = <div>{this.renderServiceList(x.service)}</div>
			x.requestedCanI = <div>{this.renderRequestedCanI(x.requestedUser)}</div>
			x.total = x.total ? x.total : 0;
			x.nationName = x.nation ? this.renderNationName(x.nation) : " ";
			x.keywordList = <div>{this.renderKWL(x?.keyword)}</div>
			x.images = <div className='img-job-icon'><img src={x.image || noImage} alt={x.title} /></div>
			return x;
		});
	}
	setupDataForTable = () => {
		let _data = this.prepareData(this.state.mainData);
		return {
			columns: [
				{
					label: 'Job Id',
					field: 'id',
					width: 100,
				},
				{
					label: 'Image',
					field: 'images',
					width: 120
				},
				{
					label: 'Nation',
					field: 'nationName',
					width: 200,
				},
				{
					label: 'City',
					field: 'city',
					width: 200,
				},
				{
					label: 'Service',
					field: 'serviceList',
					width: 200,
				},
				{
					label: 'Title',
					field: 'title',
					width: 300,
				},
				{
					label: 'Content',
					field: 'content',
					sort: 'disabled',
					width: 300,
				},
				{
					label: 'KeyWord',
					field: 'keywordList',
					width: 200,
				},
				{
					label: 'Created By',
					field: 'creationUserName',
					width: 200,
				},
				{
					label: 'CanI Pickup',
					field: 'pickupCanIList',
					sort: 'disabled',
					width: 200,
				},
				{
					label: 'CanI Requested',
					field: 'requestedCanI',
					sort: 'disabled',
					width: 200,
				},
				{
					label: 'Created At',
					field: 'createdAt',
					width: 200,
				},
				{
					label: 'Value',
					field: 'total',
					width: 100,
				},
				{
					label: 'Currency',
					field: 'currency',
					sort: 'disabled',
					width: 100,
				},
				{
					label: 'Status',
					field: 'status',
					width: 150,
				},
				{
					label: 'Actions',
					field: 'actions',
					sort: 'disabled',
					width: 100,
				}
			],
			rows: _data
		}	
	}

	callApiDelete = async () => {
		if(this.state.isLoading){
			return;
		}
		this.setState({
			isLoading: true
		})
		if(this.state.currentItemDelete){
			let _res;
			let _payload = {
				id: this.state.currentItemDelete.id,
				reason: encodeData(this.state.reasonDelete)
			};

			try{
				_res = await JobsServices.deleteJob(_payload);
			}catch(err){
				console.log(err);
			}
			
			if(_res?.status){
				Alert({
					title: `${MessageConst.MessStatic.Delete_Job_Success}`,
					status: 'success'
				});
				this.setState({
					currentItemDelete: false,
					isLoading: false
				}, () => {
					this.getData();
				})
			}else{
				this.setState({
					isLoading: false
				})
				Alert({
					title: _res?.message || `${MessageConst.MessStatic.Delete_Job_Fail}`,
					status: false
				});
			}
		}
	};

	handleConfirmDialog = (e, _res) => {
		e.preventDefault();
		if(_res === 'ok'){
			if(this.state?.reasonDelete?.length < _constLength){
				this.setState({
					errorMesDelete: 'Please input the reason !'
				});
			}else{
				this.callApiDelete();
				window.$('.mfp-close').click();
			}
		}else{
			this.setState({
				reasonDelete: '',
				errorMesDelete: ''
			});
			window.$('.mfp-close').click();
		}
	}

	handleChangeInput = (e) => {
		e.persist();
		this.setState({
			reasonDelete: e.target.value
		});
	}

	handleOpenPopupFilter = (e) => {
		this.setState({
			OpenPopupFilter: true
		})
	}

	handleClosePopupFilter = (e) => {
		this.setState({
			OpenPopupFilter: false
		})
	}

	handleFilterWithProperties = (_prop) => {
		let _listData = this.state.rootData;
		let _new = [];
		let _check = false;
		if(_listData?.length > 0){
			if(_prop?.nations?.length > 0){
				if(_new?.length > 0){
					_new = _new.filter(x => _prop.nations.indexOf(x?.nation) > -1);
				}else{
					_new = _listData.filter(x => _prop.nations.indexOf(x?.nation) > -1);
				}
				_check = true;
			}
			if(_prop?.cities?.length > 0){
				if(_new?.length > 0){
					_new = _new.filter(x => _prop.cities.indexOf(x?.city) > -1);
				}else{
					_new = _listData.filter(x => _prop.cities.indexOf(x?.city) > -1);
				}
				_check = true;
			}
			if(_prop?.services?.length > 0){
				if(_new?.length > 0){
					_new = _new.filter(x => x.service?.find(y => _prop?.services.indexOf(y.id) > -1));
				}else{
					_new = _listData.filter(x => x.service?.find(y => _prop?.services.indexOf(y.id) > -1));
				}
				_check = true;
			}
			if(_prop?.status?.length > 0){
				if(_new?.length > 0){
					_new = _new.filter(x => _prop.status.indexOf(x?.status) > -1);
				}else{
					_new = _listData.filter(x => _prop.status.indexOf(x?.status) > -1);
				}
				_check = true;
			}
			if(_prop?.keys?.length > 0){
				if(_new?.length > 0){
					_new = _new.filter(x => x.keyword?.find(y => _prop?.keys.indexOf(y) > -1));
				}else{
					_new = _listData.filter(x => x.keyword?.find(y => _prop?.keys.indexOf(y) > -1));
				}
				_check = true;
			}
			if(_prop?.createdBy?.length > 0){
				if(_new?.length > 0){
					_new = _new.filter(x => _prop?.createdBy.indexOf(x?.creationUser?.id) > -1);
				}else{
					_new = _listData.filter(x => _prop?.createdBy.indexOf(x?.creationUser?.id) > -1);
				}
				_check = true;
			}
			if(_prop?.requestedBy?.length > 0){
				if(_new?.length > 0){
					_new = _new.filter(x => _prop?.requestedBy.indexOf(x?.requestedUser?.id) > -1);
				}else{
					_new = _listData.filter(x => _prop?.requestedBy.indexOf(x?.requestedUser?.id) > -1);
				}
				_check = true;
			}
			if(_prop?.pickupBy?.length > 0){
				if(_new?.length > 0){
					_new = _new.filter(x => x.pickupCanI?.find(y => _prop?.pickupBy.indexOf(y.id) > -1));
				}else{
					_new = _listData.filter(x => x.pickupCanI?.find(y => _prop?.pickupBy.indexOf(y.id) > -1));
				}
				_check = true;
			}
		}
		
		if(_new?.length > 0){
			this.setState({
				mainData: _new
			})
		}else{
			if(_check){
				this.setState({
					mainData: []
				})
			}else{
				this.setState({
					mainData: _listData
				})
			}
		}
		setTimeout(() => {
			window.$(".table-wrapper-scroll-y").animate({ scrollLeft: 0 }, "slow");
		}, 50);
		
	}
	handleFilterWithoutProperties = () => {
		if(this.state?.mainData?.length !== this.state?.rootData?.length){
			this.setState({
				mainData: this.state.rootData
			})
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
									<h3>Do you want to remove job ?</h3>
								</div>
								<div className="text">
									Id: <strong>{this.state?.currentItemDelete?.id}</strong>
								</div>
								<div className="text">
									Title: <strong>{this.state?.currentItemDelete?.title}</strong>
								</div>
								<div className="text">
									Created By: <strong>{`(${this.state?.currentItemDelete?.creationUser?.id}) ${this.state?.currentItemDelete?.creationUser?.name}`}</strong>
								</div>
								<div className="text">
									City: <strong>{this.state?.currentItemDelete?.city}</strong>
								</div>
								<div className="text">
									Cani Requested: <strong>{this.state?.currentItemDelete?.requestedCani?.name}</strong>
								</div>
								<div className="text">
									Value: <strong>{this.state?.currentItemDelete?.total} {this.state?.currentItemDelete?.currency}</strong>
								</div>
								<div className="text">
									Status: <strong>{this.state?.currentItemDelete?.status}</strong>
								</div>
								<div className='text'>
									<div className="submit-field">
		                              <div className="section-headline">
		                                <h5>{"Why do you want to remove ?"}</h5>
		                              </div>
		                              <textarea
		                                value={this.state.reasonDelete || ''}
		                                cols="30"
		                                rows="5"
		                                className="with-border"
		                                name="description"
		                                onChange={this.handleChangeInput}
		                              />
		                              {this.state?.errorMesDelete?.length > 0 && (
		                              	<div className="notification error">{this.state.errorMesDelete}</div>
		                              )}
		                            </div>
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

	render(){
		const { t } = this.props;
		return(
			<React.Fragment>
				<div className='cms-page-content' id='services-list'>
					<div className='jobs-filter-btnOpen'><span onClick={this.handleOpenPopupFilter} className="icon-feather-filter"></span></div>
					<div className="add-new-job">
						<Link to={`${UrlPath.CmsPath.CmsJobsCreate}`}>
							<button className="button full-width button-sliding-icon ripple-effect margin-top-10" type="button" >{t('Add New Job')}<i className="icon-material-outline-arrow-right-alt"></i></button>
						</Link>
					</div>
					{!this.state.isLoading && (
						<MDBDataTableV5 
				            hover 
				            entriesOptions={[10, 20, 30, 40, 50]} 
				            entries={10} 
				            pagesAmount={1} 
				            data={this.setupDataForTable()} 
				            searchTop 
				            scrollX
				            scrollY
				            maxHeight='60vh'
				            searchBottom={false} 
				            />
					)}
				</div>
				<FilterJobs 
					isOpen={this.state.OpenPopupFilter} 
					callBackClose={this.handleClosePopupFilter}
					callBackSearch={this.handleFilterWithProperties}
					callBackReset={this.handleFilterWithoutProperties}
					createdUser={this.state?.listCanUCreatedJob}
					requestedUser={this.state?.listCanIRequestedJob}
					pickupUser={this.state?.listCanIPickupJob}
					/>
				{this.renderPopupConfirmDelete()}
				{this.state.isLoading && <Loader />}
			</React.Fragment>
		);
	}
};
export default CmsMembers;
