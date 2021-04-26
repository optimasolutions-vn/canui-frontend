

import React from 'react';
import SockJsClient from 'react-stomp';
const _socketUrl = 'https://canui.tech/api/ws/';
const _topics = ['/api/topic/user/'];

class ChatTest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    	mes: '',
    	topics: [],
    	destinationUserId: 13,
    	userId: 21,

    };
    this.clientRef = React.createRef();
  }
  componentDidMount(){
  	this.setUserId();
  };
  setUserId = () => {
  	// demo with tay.nguyenhuu@gmail.com
  	this.setState({
  		topics: _topics.map(x => { return `${x}${this.state.userId}`})
  	})
  }
  handleSend = (e) => {
  	e.preventDefault();
  	if(this?.clientRef?.current && this?.state?.mes){
	  	let msg = {
	  		"message": this.state.mes,
	  		"fromUser": this.state.userId,
	  		"toUser": this.state.destinationUserId
	  	};
	  	console.log(this.clientRef);
    	console.log(msg);
	  	this.clientRef.current.sendMessage('/api/send-message', JSON.stringify(msg));
	  }
  }

  handleChangeInput = (e) => {
  	e.preventDefault();
  	this.setState({
  		mes: e.target.value
  	})
  }

  render() {
    return (
      <div>
      	{this.state.topics && this.state.userId && (
      		<SockJsClient 
	        	url={_socketUrl} 
	        	topics={this.state.topics}
	            onMessage={(msg) => { console.log(msg); }}
	            ref={ this.clientRef} 
	            />
      	)}
        
        <input value={this.state.value} name='mes' type='text' onChange={this.handleChangeInput}/>
        <input value='send' name='mes' type='button' onClick={this.handleSend}/>
      </div>
    );
  }
}
export default ChatTest;