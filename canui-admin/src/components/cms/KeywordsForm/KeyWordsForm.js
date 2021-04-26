import React from 'react';
import KeyWord from '../KeywordSuggest/KeyWord';
class KeyWordsForm extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			keyWordRefOnchange: false,
			currentListKeys: [],
			showSuggestion: false,
		};
		this.keyWordRef = React.createRef(null);
	};
	componentDidMount(){
		if(this.props?.resetSelected?.length === 0){
			this.setState({
				currentListKeys: []
			})
		}
	};
	componentDidUpdate(prevProps, prevState){
		if(prevProps.resetSelected !== this.props?.resetSelected && this.props?.resetSelected?.length === 0){
			this.setState({
				currentListKeys: []
			})
		}
	};
	handleOnChangeKeyWord = (e) => {
		e.preventDefault();
		this.setState({
			keyWordRefOnchange: (e.target.value).trim(),
			showSuggestion: true
		})
	}
	handleAddKeyWord = (e) => {
		e.preventDefault();
		if(this.keyWordRef?.current?.value?.length === 0){
			return;
		}
		let _n = this.state.currentListKeys;
		if(_n?.indexOf(this.keyWordRef?.current?.value) === -1){
			_n.push(this.keyWordRef?.current?.value);
			this.setState({
				currentListKeys: _n
			}, () => {
				this.callBackSelectedKeyWord();
			})
			this.keyWordRef.current.value = '';
		}
	}
	handleSelectedKeyFromSuggest = (x) => {
		this.keyWordRef.current.value = x;
		this.setState({
			showSuggestion: false
		})
	}
	handleRemoveKeyWord = (e, x) => {
		let _n = this.state.currentListKeys;
		if(_n?.length > 0){
			let _pos = _n.find(y => y === x);
			if(_pos){
				_n.splice(_pos, 1);
			}
		}
		
		this.setState({
			currentListKeys: _n
		}, () => {
			this.callBackSelectedKeyWord();
		})
	}

	callBackSelectedKeyWord = () => {
		if(typeof this.props.callBackSelectKeyWord === 'function'){
			this.props.callBackSelectKeyWord(this.state.currentListKeys);
		}
	}
	render(){
		return(
			<div className="keywords-container">
				<div className="keyword-input-container">
					<input type="text" onChange={this.handleOnChangeKeyWord} ref={this.keyWordRef} className="keyword-input with-border" placeholder="Add Keywords"/>
					<button type="button" onClick={this.handleAddKeyWord} className="keyword-input-button ripple-effect"><i className="icon-material-outline-add"></i></button>
					<KeyWord 
						show={this.state.showSuggestion}
						KeyOnChange={this.state.keyWordRefOnchange}
						SelectedKey={this.handleSelectedKeyFromSuggest}
						 />
				</div>
				<div className="keywords-list">
					{this.state?.currentListKeys?.length > 0 && this.state?.currentListKeys.map(x => {
						return <span key={x} className="keyword"><span className="keyword-remove" onClick={e => this.handleRemoveKeyWord(e, x)}></span><span className="keyword-text">{x}</span></span>
					})}
				</div>
				<div className="clearfix"></div>
			</div>
		);
	}
};

export default KeyWordsForm;