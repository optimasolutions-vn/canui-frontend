import React from 'react';
import {Link} from 'react-router-dom';
import langConst from '../../../libs/lang';
import './style.scss';
import Loader from '../../../components/effects/Loader';
import CategoriesServices from '../../../services/CategoriesServices';
import UrlPath from '../../../libs/UrlPath';
import {runScript} from './runScript';
const _imgBanner = '/images/home-background.jpg';


class CmsServices extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: {},
			listServices: [],
			isLoading: false,
			currentServiceDelete: false
		};
		this.myRef = React.createRef();
	};
	componentDidMount(){
		runScript();
		this.getServicesList();
	};

	getServicesList = async () => {
		if(this.state.isLoading){
			return;
		}
		this.setState({
			isLoading: true
		});
		let _res = await CategoriesServices.getCategoriesServices();
		if(_res?.data){
			this.setState({
				listServices: _res.data
			});
			console.log(_res);
		}
		this.setState({
			isLoading: false
		})
		
	};

	handleDeleteService = (e, service) => {
		e.preventDefault();
		console.log('delete');
		console.log(service);
		this.setState({
			currentServiceDelete: service
		}, () => {
			this.myRef.current.click();
		});
	}

	callApiUpdateService = async () => {
		if(this.state.isLoading){
			return;
		}
		this.setState({
			isLoading: true
		})
		if(this.state.currentServiceDelete){
			let _payload = this.state.currentServiceDelete;
			_payload.is_delete = 1;
			let _res = await CategoriesServices.updateCategoriesServices(_payload);
			if(_res.status){
				this.setState({
					currentServiceDelete: false
				});
				this.setState({
					isLoading: false
				}, () => {
					this.getServicesList();
				})
			}else{
				this.setState({
					isLoading: false,
					errorMes: [_res.message || 'update fail'],
					UpdateSuccess: false
				})
			}
		}
	};

	handleConfirmDialog = (e, _res) => {
		e.preventDefault();
		if(_res === 'ok'){
			this.callApiUpdateService();
			window.$('.mfp-close').click();
		}else{
			window.$('.mfp-close').click();
		}
	}

	renderCreateNewService = () => {
		return(
			<>
				
			</>
		);
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
									<h3>Do you want to remove service ?</h3>
								</div>
								<div className="text">
									Id: {this.state?.currentServiceDelete?.id}
								</div>
								<div className="text">
									title: {this.state?.currentServiceDelete?.title}
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
				{this.state.isLoading && <Loader />}
				<div className='cms-page-content' id='services-list-add-new'> 
					<div className='btn-create-new-service'>
						<div className="row">
							<div className='col-9'><h3 className='titleNamePage'>List Services</h3></div>
							<div className='col-3'>
								<Link to={`${UrlPath.CmsPath.CmsNewServicesDetail}`}>
								<button className="button full-width button-sliding-icon ripple-effect margin-top-10" type="button" >{t('Add New Service')}<i className="icon-material-outline-arrow-right-alt"></i></button>
							
								</Link>
							</div>
						</div>
					</div> 
				</div>
				<div className='cms-page-content' id='services-list'>
					<ul className='services-list-header'>
						<li>
							<div className='ids'>id</div>
							<div className='icon'>icon</div>
							<div className='name'>title</div>
							<div className='descriptions'>descriptions</div>
							<div className='total-jobs'>total jobs</div>
							<div className='actions'>actions</div>
						</li>
					</ul>
					<ul className='services-list'>
						{this.state?.listServices?.length > 0 && this.state.listServices.map(service => {
							return(
								<li>
									<div className='ids'>{service.id}</div>
									<div className='icon'>
										<img src={service.icon_url} />
									</div>
									<div className='name'>{t(service.title)}</div>
									<div className='descriptions'>{t(service.description)}</div>
									<div className='total-jobs'>{service.quantity || 0}</div>
									<div className='actions'>
										<Link to={`${UrlPath.CmsPath.CmsServices}/${service.slug}`} className='btn-update' title='update'><i className='icon-material-outline-launch'></i></Link>
										<a href="#small-dialog" onClick={e => this.handleDeleteService(e, service)} className='btn-delete' title='delete'><i className='icon-material-outline-delete'></i></a>
									</div>
								</li>
							);
						})}
					</ul>
				</div>
				{this.renderPopupConfirmDelete()}
			</React.Fragment>
		);
	}
};
export default CmsServices;
