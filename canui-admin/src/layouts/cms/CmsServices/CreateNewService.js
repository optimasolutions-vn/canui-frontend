import React from 'react';
import langConst from '../../../libs/lang';
import './style.scss';
import Loader from '../../../components/effects/Loader';
import CategoriesServices from '../../../services/CategoriesServices';

const _imgBanner = '/images/home-background.jpg';


class CmsNewService extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: {},
			listServices: [],
			isLoading: false
		};
	};
	componentDidMount(){
		console.log(this.props);
		this.getServicesList();
	};
	componentDidUpdate(prevProps, prevState){
		console.log(prevProps);
		console.log(prevState);
	};

	getServicesList = () => {
		if(this.state.isLoading){
			return;
		}
		this.setState({
			isLoading: true
		}, async () => {
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
		})
		
	};

	handleCreateNewService = () => {
		this.setState
	}

	renderCreateNewService = () => {
		return(
			<>
				
			</>
		);
	}


	render(){
		
		return(
			<React.Fragment>
				{this.state.isLoading && <Loader />}
				<>
			</React.Fragment>
		);
	}
};
export default CmsNewService;
