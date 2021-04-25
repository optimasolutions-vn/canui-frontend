import React from 'react';
import langConst from '../../../libs/lang';
import Loader from '../../../components/effects/Loader';
import OtherServices from '../../../services/OtherServices';
import {Link} from 'react-router-dom';
import UrlPath from '../../../libs/UrlPath';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import '../CmsStaticPrivacy/style.scss';
import {ScriptTabs} from '../Scripts/ScriptTabs';
import { Alert} from '../Scripts/Popup';
import {Languages, MaxSizeUpload} from '../../../helpers/DataAccess';
import { EditorState, convertToRaw, convertFromRaw, convertFromRawToDraftState} from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
const maxSize = MaxSizeUpload;
const _list = Languages;
const _titlePage = 'Update Announcenment';
function createMarkup(content){
	return{__html: content};
}
class CmsUpdateAnnouncenment extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.myRef = React.createRef();
	};
	componentDidMount(){
		ScriptTabs();
		this.setupParams();
	};
	componentDidUpdate(prevProps, prevState){
		ScriptTabs();
		/*if(this.props?.match?.params?.id !== this.state?.id){
			this.setupParams();
		}*/
	};
	onContentStateChange = (contentState) => {
		let _val = contentState;
		this.setState({
			content : _val
		});
	};
	
	setupParams = () => {
		console.log(this.props);
		if(this.props?.match?.params?.id){
			this.setState({
				id: this.props?.match?.params?.id
			}, () => {
				this.getOption();
			});
			
		}
	};
	calcState = (value) => {
		return value
	    ? EditorState.createWithContent(convertFromRaw(JSON.parse(value)))
	    : EditorState.createEmpty();
	};
	getOption = async () => {
		let _res = await OtherServices.getDetailPost(this.state.id);
		if(_res?.status && _res?.data){
			this.setState({
				id : _res.data?.id || false,
				title : _res.data?.title || false,
				content : this.calcState(_res.data?.content) || false,
				locale : _res.data?.locale
			});
		}else{
			Alert({
				title: _res?.message || 'Fail on load data !!!',
				time: 4000
			})
		}
		
	};

	prepareDataBeforeCallApi = () => {
		return {
			id: this.state?.id,
			title: this.state?.title || '',
			content: this.state?.content ? JSON.stringify(convertToRaw(this.state?.content.getCurrentContent())) : '',
			locale: this.state?.locale,
		};
	};

	callAPiUpdate = async () => {
		if(this.isLoading){
			return false;
		}
		this.isLoading = true;
		
		let _data = this.prepareDataBeforeCallApi() || false;
		this.isLoading = false;
		if(_data){
			let _res = await OtherServices.UpdatePost(_data);
			if(_res.status){
				Alert({
					title: 'Post is updated',
					status: 'success',
					time: 3000,
				})
			}
		}else{
			Alert({
				title: 'Please input content', 
				time: 3000
			});
			this.isLoading = false;
		}
	};

	onChangeTitle = (e) => {
		e.preventDefault();
		let _val = e.target.value;
		this.setState({
			title: _val
		});
	}

	handleSubmitForm = (e) => {
		e.preventDefault();
		this.callAPiUpdate();
	}
	
	renderError = () => {
		return this.state.errorMes.map(x => {
			return(
				<p>{x}</p>
			)
		});
	}
	renderContentTabs = () => {
		const { t } = this.props;
		let _i = 0;
		let _state = this.state;
		return( 
			<div className="row">
				<div className="col-12">
					<div className="submit-field">
						<h5>{t('ID')}</h5>
						<input className='with-border' defaultValue={this.state?.id} readOnly disabled type="text" name={`id`} placeHolder='' />
					</div>
					<div className="submit-field">
						<h5>{t('Language')}</h5>
						<input className='with-border' defaultValue={this.state?.locale ? this.state?.locale.toUpperCase() : ''} readOnly disabled type="text" name={`Language`} placeHolder='' />
					</div>
					<div className="submit-field">
						<h5>{t('Title')}</h5>
						<input className='with-border' defaultValue={this.state?.title} type="text" name={`title`} placeHolder='' onChange={e => this.onChangeTitle(e)} />
					</div>
					<div className="submit-field">
						<h5>{t('Content')}</h5>
						<Editor
							editorState={_state?.content}
					        wrapperClassName="wrapperClassName"
					        editorClassName="editorClassName"
					        onEditorStateChange={editorState => this.onContentStateChange(editorState)}
					      />
					</div>
				</div>
			</div>
		)
	}

	render(){
		const { t } = this.props;
		return(
			<React.Fragment>
				{this.isLoading && <Loader />}
				<div className='service-detail-admin'>
					<div className="row">
						<div className="col-12">
							<div className='title-page-header'>
								<h3>{_titlePage}</h3>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-12">
							<form ref={this.myRef} method="post" id="service-detail-form" onSubmit={this.handleSubmitForm}>
								{this.renderContentTabs()}
							</form>
						</div>
						{this.state.errorMes?.length > 0 && (
							<div className="col-12">
								<div className="notification error">{this.renderError()}</div>
							</div>
						)}
						{this.state.UpdateSuccess && (
							<div className="col-12">
								<div className="notification success">{t('Update Success')}</div>
							</div>
						)}
						<div className="col-3">
							{this.state.isLoading && <button disabled className="button full-width button-sliding-icon ripple-effect margin-top-10" type="submit">{t('Updating')}<i className="icon-material-outline-arrow-right-alt"></i></button>}
							{!this.state.isLoading &&
								<button className="button full-width button-sliding-icon ripple-effect margin-top-10" type="submit" onClick={this.handleSubmitForm}>{t('Update')}<i className="icon-material-outline-arrow-right-alt"></i></button>
							}
						</div>
					</div>
				</div>
			</React.Fragment>
		);
	}
};
export default CmsUpdateAnnouncenment;
