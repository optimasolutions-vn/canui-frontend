import React from 'react';
import otherServices from '../../services/otherServices';
import './style.scss';

class KeyWord extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			keys: false,
		};
	};
	componentDidMount(){
		this.getKeys();
	};
	getKeys = async () => {
		let _res = await otherServices.getKeyWord();
		if(_res?.data?.length > 0){
			this.setState({
				keys: _res.data
			})
		}
	}
	onSelectKey = (e, x) => {
		e.preventDefault();
		if(typeof this.props?.SelectedKey === 'function'){
			this.props.SelectedKey(x.tag);
		}
	}
	renderSuggest = () => {
		if(!this.props?.KeyOnChange){
			return null;
		}
		let _filter = this.state?.keys.filter(y => this.props?.KeyOnChange ? y?.tag.indexOf(this.props.KeyOnChange) > -1 : y);
		if(_filter?.length === 0){
			return null;
		}
		return(
			<div className="keyword-suggestion">
				<ul>
					{_filter.map(x => {
						return (
							<li key={`kw-${x.id}`} onClick={e => this.onSelectKey(e, x)}>{x.tag}</li>
						)
					})}
				</ul>
			</div>
		);
	}
	render(){
		return(
			<React.Fragment>
				{ this.state?.keys?.length > 0 && this.props.show && this.renderSuggest()}
			</React.Fragment>
		);
	}
};
export default KeyWord;