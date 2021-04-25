import React from 'react';
import langConst from '../../libs/lang';
import '../../assets/scss/customStyleInMyPage.scss';
import { runScript } from './runScript';
import {Link} from 'react-router-dom';
import UrlPath from '../../libs/UrlPath';
export default class CommingSoon extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: {},
			currentPage: ''
		};
	};
	componentDidMount(){
		this.getParams();
	};
	getParams = () => {
		let _slug = this.props.match?.params?.slug || '';
		this.setState({
			currentPage: _slug
		})
	}
	componentDidUpdate(){

	};
	render(){
		return(
			<div className="comming-soon">
				Comming Soon !!
			</div>
		);
	}
};
