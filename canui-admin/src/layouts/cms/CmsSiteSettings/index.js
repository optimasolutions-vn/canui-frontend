import React from 'react';
import langConst from '../../../libs/lang';
import Loader from '../../../components/effects/Loader';
import CategoriesServices from '../../../services/CategoriesServices';
import {runScript} from './runScript';
import Validation from '../../../helpers/Validation';
import {Languages, MaxSizeUpload} from '../../../helpers/DataAccess';
import './style.scss';
const _imgBanner = '/images/home-background.jpg';
const maxSize = MaxSizeUpload;


class CmsSiteSettings extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: {},
			serviceDetail: false,
			formField: false,
			formDom: false,
			isLoading: false,
			errorMes: []
		};
		this.myRef = React.createRef();
	};
	componentDidMount(){
		runScript();
		this.getServicesDetail();

	};
	componentDidUpdate(prevProps, prevState){
		console.log(prevProps);
		console.log(prevState);
	};
	getServicesDetail = () => {
		console.log(this.props);
		if(this.state.isLoading || !this.props?.match?.params?.slug){
			return;
		}
		this.setState({
			isLoading: true
		}, async () => {
			console.log('test 2');
			let _res = await CategoriesServices.getCategoriesServices({slug: this.props.match.params.slug});
			if(_res?.data){
				this.setState({
					serviceDetail: _res.data[0],
					formField:  _res.data[0],
				});
				console.log(_res);
			}
			this.setState({
				isLoading: false
			})
		})
		
	};
	validationFields = () => {
		console.log(this.state);

		let _vl = {
				title: ['required'],
				title_vn: ['required'],
				title_kr: ['required'],
				title_jp: ['required'],
				description: ['required'],
				description_vn: ['required'],
				description_jp: ['required'],
				description_kr: ['required'],
				slug: ['required']
			};
		let _arrayErrors = this.state.errorMes || [];
		let _thisForm = [];
		if(this.state.formDom){
			_thisForm = this.state.formDom;
		}
		for(const [k, v] of Object.entries(_vl)){
			for(const [k1, v1] of Object.entries(this.myRef.current)){
				if(v1.name === k){
					_thisForm[k] = v1;
				}
			}
			for(let i in v){
				switch(v[i]){
					case 'required':
						if(!this.state.formField[k] || this.state.formField[k].length <= 0){
							_arrayErrors.push(`${_thisForm[k].title} is required`);
						}
						break;
					default:
						break;
				}
			}
		}
		if(!this.state.icon && !this.state.formField.icon_url){
			_arrayErrors.push('icon is required');
		}
		this.setState({
			formDom: _thisForm,
			errorMes: _arrayErrors
		});
		if(_arrayErrors?.length > 0){
			return false;
		}
		return true;
	};
	handleSubmitForm = (e) => {
		e.preventDefault();
		console.log(this.myRef);
		let _validation = this.validationFields();
		if(this.state.isLoading || !_validation){
			return false;
		}
		this.setState({
			isLoading: true,
			errorMes: []
		}, () => {
			if(this.state.icon){
				this.callApiUploadFile();
			}else{
				this.callApiUpdateService();
			}
		});
	};
	callApiUploadFile = async () => {
		let formData = new FormData();
      	formData.append('servicesIcons', this.state.icon);
		let _res = await CategoriesServices.uploadImage(formData);
		if(_res.status && _res.data?.servicesIcons?.url){
			this.setState({
				icon: false,
				formField: {
					...this.state.formField,
					icon_url: _res.data?.servicesIcons?.url || this.state.formField.icon_url
				}
			}, async () => {
				this.callApiUpdateService();
			})
		}
		console.log(_res);
	};
	callApiUpdateService = async () => {
		let _res = await CategoriesServices.updateCategoriesServices(this.state.formField);
		if(_res.status){
			this.setState({
				isLoading: false,
				errorMes: [],
				icon: false,
				UpdateSuccess: true
			})
		}else{
			this.setState({
				isLoading: false,
				errorMes: [_res.message || 'update fail'],
				UpdateSuccess: false
			})
		}
	};
	handleChangeSlug = (e) => {
		e.preventDefault();
		let _newValue = Validation.convertSlug(e.target.value);
		console.log(_newValue);
		this.setState({
			formField: {
				...this.state.formField,
				slug: _newValue,
			}
		})
	}
	handleChangeField = (e) => {
		e.preventDefault();
		if(!e?.target?.name){
			return;
		}
		let newObject = this.state.formField;
		let _fieldName = [];
		_fieldName[`${e.target.name}`] = `${e.target.value}`;
		newObject = Object.assign(newObject, _fieldName);
		this.setState({
			formField: newObject
		})
	}
	handleChangeIcon = (e) => {
		let _mes = `size of icon can not more than ${Math.ceil(maxSize/1024)}kb`;
		let _arrayErrors = this.state.errorMes;
		let _file = e.target.files[0];
		let reader = new FileReader();
		if(_arrayErrors.indexOf(_mes) > -1){
			_arrayErrors.splice(_arrayErrors.indexOf(_mes), 1);
		}
		if(_file.size > maxSize){
			if(_arrayErrors?.indexOf(_mes) === -1){
				_arrayErrors.push(_mes)
				this.setState({
					errorMes : _arrayErrors
				})
			};
			return false;
		}
		reader.readAsDataURL(_file);
		reader.onload = () => {
			if(_arrayErrors.indexOf(_mes) > -1){
				_arrayErrors.splice(_arrayErrors.indexOf(_mes), 1);
			}
			this.setState({
				icon: reader.result,
				errorMes: _arrayErrors
			})
		};
		reader.onerror = function (error) {
			_arrayErrors.push(error);
			this.setState({
				...this.state.errorMes,
				errorMes: _arrayErrors
			});
			console.log('Error: ', error);
		};

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
			<div className='service-detail-admin'>
				<div className="row">
					<div className="col-12">
						<div className='title-page-header'>
							<h3>Site Settings</h3>
						</div>
					</div>
				</div>
				
			</div>
		);
	}
};
export default CmsSiteSettings;
