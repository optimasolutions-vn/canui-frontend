import React from 'react';
import langConst from '../../../libs/lang';
import Loader from '../../../components/effects/Loader';
import OtherServices from '../../../services/OtherServices';
import {Link} from 'react-router-dom';
import UrlPath from '../../../libs/UrlPath';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import {SelectPicker, Alert, Popup} from '../Scripts/Popup';
import {Languages, MaxSizeUpload} from '../../../helpers/DataAccess';
import { EditorState, convertToRaw, convertFromRaw, convertFromRawToDraftState} from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import Pagination from '@material-ui/lab/Pagination';
import BlockInput from './BlockInput';
import './style.scss';
const maxSize = MaxSizeUpload;
const _list = Languages;
const _titlePage = 'List Announcenment';
class CmsAnnouncenment extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: {},
			total: 0,
			isLoading: false,
			errorMes: [],
			size: 10,
			page: 0,
			sort: 'createdAt,desc',
			LangSelect: 'en'
		};
		this.myRef = React.createRef();
	};
	componentDidMount(){
		SelectPicker();
		Popup();
		this.setupParams();
	};
	componentDidUpdate(prevProps, prevState){
		SelectPicker();
		window.$('.selectpicker').selectpicker('refresh');
	};
	onContentStateChange = (_locale, contentState) => {
		let _state = [];
		_state[`contentState${_locale}`] = contentState;
		this.setState({
			..._state
		});
	};
	
	setupParams = () => {
		this.getOption();
	};
	
	getOption = () => {
		this.setState({
			isLoading: true
		}, async () => {
			let _res = await OtherServices.getListAnnouncement({
				size: this.state.size,
				page: this.state.page,
				sort: this.state.sort,
				locale: this.state.LangSelect
			});
			if(_res.status){
				if(_res?.data?.content){
					this.setState({
						dataList : _res?.data?.content,
						totalPages: _res?.data?.totalPages,
						totalElements: _res?.data?.totalElements,
						page: _res?.data?.number
					});
				}
			}else{
				this.setState({
					dataList : [],
					totalPages: false,
					totalElements: false,
					errorMes: [_res.message || 'Fail on Request']
				});
				Alert({
					title: _res.message || 'Fail on load data'
				})
			}
			this.setState({
				isLoading: false
			})
		})
		
	};

	handleChangeLang = (e) => {
		this.setState({
			page: 0,
			LangSelect: `${e.target.value}`
		}, () => {
			this.getOption();
		})
	}

	renderLine = (x) => {
		return(
			<div key={x.id} className='line'>
				<div className="title">{x.title}</div>
				<div className="content">{x.content}</div>
			</div>
		);
	}
	handleCallBackNextPage = (e, _page) => {
		this.setState({
			page: _page-1
		}, () => {
			this.getOption();
		})
	}
	handleDelete = async (e, _post) => {
		e.preventDefault();
		this.setState({
			currentPostDelete: _post
		}, () => {
			this.myRef.current.click();
		})
	}
	handleConfirmDialog = (e, _state) => {
		if(_state === 'ok'){
			this.callAPIDelete();
			window.$('.mfp-close').click();
		}else{
			this.setState({
				currentPostDelete: false,
			})
			window.$('.mfp-close').click();
		}
	}
	callAPIDelete = async () => {
		if(!this.state?.currentPostDelete?.id){
			Alert({
				title: `${_res.message || 'Something wrong, you can not delete'}`,
				time: 4000 
			})
			return false;
		}
		let _res = await OtherServices.deletePost(this.state?.currentPostDelete?.id);
		if(_res?.status){
			this.setState({
				page: 0,
				currentPostDelete: false,
			}, () => {
				this.getOption();
			})
			Alert({
				title: `${'Post is Deleted'}`,
				status: 'success',
				time: 4000 
			})
		}else{
			Alert({
				title: `${_res.message || 'Something wrong, you can not delete'}`,
				time: 4000 
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
									<h3>Do you want to remove this Post ?</h3>
								</div>
								<div className="text">
									Id: {this.state?.currentPostDelete?.id}
								</div>
								<div className="text">
									title: {this.state?.currentPostDelete?.title}
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
			<div className="Announcenment-cms-content">
				<div className='cms-page-content' id='services-list-add-new'> 
					<div className='btn-create-new-service'>
						<div className="row">
							<div className='col-3'>
								<div style={{padding: '10px'}}>
								<select
									className={`selectpicker services`}
									name='service'
									value={this.state.LangSelect}
									onChange={this.handleChangeLang}
								>
									{
										_list.map((item, index) => {
											return <option key={index} value={item.toLowerCase()}>{item.toUpperCase()}</option>
										})
									}
								</select>
								</div>
							</div>
							<div className='col-6'><h3 className='titleNamePage'>{_titlePage}</h3></div>
							<div className='col-3'>
								<Link to={`${UrlPath.CmsPath.CmsNewAnnouncenment}`}>
									<button className="button full-width button-sliding-icon ripple-effect margin-top-10" type="button" >{t('Add New')}<i className="icon-material-outline-arrow-right-alt"></i></button>
								</Link>
							</div>
						</div>
					</div> 
				</div>
				<div className='cms-page-content' id='services-list'>
					<ul className='services-list-header'>
						<li>
							<div className='ids'>id</div>
							<div className='name'>title</div>
							<div className='createdAt'>created At</div>
							<div className='actions'>actions</div>
						</li>
					</ul>
					{this.state?.dataList?.length === 0 && (
					<div className="nodata">Have no data found !!</div>	
					)}
					{this.state?.dataList?.length > 0 && (
					<ul className='services-list'>
						{this.state.dataList.map(x => {
							return(
								<li>
									<div className='ids'>{x.id}</div>
									<div className='name'>{x.title}</div>
									<div className='createdAt'>{x.createdAt}</div>
									<div className='actions'>
										<Link to={`${UrlPath.CmsPath.CmsAnnouncenment}/${x.id}`} className='btn-update' title='update'><i className='icon-material-outline-launch'></i></Link>
										<a href="#small-dialog" onClick={e => this.handleDelete(e, x)} className='btn-delete' title='delete'><i className='icon-material-outline-delete'></i></a>
									</div>
								</li>
							);
						})}
					</ul>
					)}
				</div>
				<div className="pagination-list">
				{this.state?.totalPages > 1 && (
					<Pagination 
						count={this.state?.totalPages} 
						page={1 + this.state?.page} 
						onChange={this.handleCallBackNextPage}
						size="large" />
						)}
				</div>

			</div>
			{this.renderPopupConfirmDelete()}
			</React.Fragment>
		);
	}
};
export default CmsAnnouncenment;
