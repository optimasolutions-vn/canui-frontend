import React from 'react';
import { connect } from 'react-redux';
import Loader from '../../components/effects/Loader';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Link } from 'react-router-dom';
import SockJsClient from 'react-stomp';
import moment from 'moment';
import messageServices from '../../services/messageServices';
import {LIMIT_TIME_CONFIRM} from "../../libs/constValue";
import jobServices from '../../services/jobServices';
import socket from '../../helpers/socket';
import {
  actionGetListUser
} from '../../actions/actionMessage';
import {
  getProfileUserDetail
} from '../../services/userService';
import './style.scss'
import {Alert} from "../Scripts/ManualScript";
import {convertNumberToHaveCommas} from '../../helpers/DataAccess';
import {runScript} from "../../libs/templateJs"
import {actionGetNotification} from "../../actions/actionUser";
import {checkIsCanIState} from "../../helpers"
const _socketUrl = 'https://canui.tech/api/ws/';
const _topics = ['/api/topic/user/'];
const $ = window.$;
const mapStateToProps = state => ({
  user: state.user,
  message: state.message,
  job: state.job
});

const mapDispatchToProps = dispatch => ({
  onLoad: params => dispatch(actionGetListUser(params)),
  onReceiveMessage: params => dispatch(actionGetNotification(params))
});
class Message extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: {},
      isShowList: false,
      currentUser: 0,
      topic: [],
      users: [],
      user: {},
      historyMessage: [],
      page: 0,
      canLoadMore: true,
      size: 10,
      jobList: [],
      job: '',
      confirmPrice: 0,
      isConfirming: false,
      isLoadingChat: false,
		};
		this.mes = '';
    this.clientRef = React.createRef();
	};
	componentDidMount(){
		let userId = this.props.match.params.userId;
		let {onLoad} = this.props;
		if (!userId) {
		  userId = 0
    }
    if (userId == this.props.user.profile?.id) {
      Alert({
        title: this.props.t("Can't chat with yourself!"),
        status: 'fail'
      })
      this.props.history.goBack()
    }
		this.setState({
      currentUser: parseInt(userId)
    });
		runScript();
		onLoad({
      userId: userId,
      ownerId: this.props.user.profile.id
    })
	};
	componentDidUpdate(prevProps, prevState){
	  let {currentUser, historyMessage, user} = this.state;
	  if (prevProps.message.isLoading && !this.props.message.isLoading) {
      historyMessage = this.props.message.arrayHistory;
	    let topics = [`/api/topic/user/${this.props.user.profile.id}`];
      if  (!currentUser) {
	      currentUser = this.props.message.userList[0]?.userId || 0;
      }
      let index = this.props.message.userList.map(item => {
        return item.id;
      }).indexOf(currentUser);
	    if (index !== -1) {
        user = this.props.message.userList[index];
      }
      let job = this.props.message.jobList.length > 0 ? this.props.message.jobList[0].id : '';
	    this.setState({
        job: job,
        jobList: this.props.message.jobList,
        users: this.props.message.userList,
        historyMessage:  historyMessage,
        currentUser: currentUser,
        topics: topics,
        user
      }, () => {
        $('.selectpicker').selectpicker();
	      this.scrollToBottom('chat-box')
      })
    }
	};

	scrollToBottom = (name) => {
    var d = $('#'+name);
    d.scrollTop(d.prop("scrollHeight"));
  }

  handleSearchUser = e => {
    let string = e.target.value;
    let { userList } = this.props.message;
    let arr = userList.filter(item => item.name.indexOf(string) !== -1);
    this.setState({
      users: arr
    })
    // onUpdateUserList(arr)
  };
  handleClickUser = async e => {
    e.preventDefault();
    let { profile } = this.props.user;
    let { onReceiveMessage } = this.props;
    let { users, currentUser } = this.state;
    let idx = parseInt(e.currentTarget.id);
    let id = users[idx].id;
    if (id == currentUser) {
      return;
    }
    let page = 0;
    let size = 10;
    let historyMessages = [];
    this.setState({
      isLoadingChat: true
    });
    let res = await messageServices.getHistory({userId: id, page: page, size: size});
    let jobList = [];
    if (res.status) {
      historyMessages = res.data;
      historyMessages.reverse();
    }
    let resJobOwner = await jobServices.getJobList({
      query: `status=PENDING&page=0&size=1000&sort=createdAt,desc&owner=${profile.id}`
    });
    if (resJobOwner.status) {
      jobList = resJobOwner.data.content
    }
    if (historyMessages?.length > 0) {
      console.log(historyMessages);
      socket.readMessage(this.clientRef.current, historyMessages[historyMessages.length - 1]);
      onReceiveMessage({});
    }
    users[idx].unreadCount = 0;
    this.setState({
      users: users,
      page: page,
      size: size,
      jobList: jobList,
      isLoadingChat: false,
      currentUser: users[idx].id,
      historyMessage: historyMessages,
    }, () => {
      this.scrollToBottom('chat-box');
      $('.selectpicker').selectpicker();
    })
  };
  handleSend = (e) => {
    e.preventDefault();
    let {profile}  = this.props.user;
    let {currentUser, historyMessage, users } = this.state;
    let idx = users.map(item => {
      return item.id
    }).indexOf(currentUser);
    if (idx !== -1) {
      users[idx].lastMessage = this.state.mes;
      users[idx].createAt = moment().format("YYYY-MM-DDThh:mm:ss");
    }
    if(this?.clientRef?.current && this.mes){
      let msg = {
        avatar: profile.avatar,
        "message": this.mes,
        "fromUser": profile.id,
        "toUser": currentUser,
        createdAt: moment().format("YYYY-MM-DDThh:mm:ss")
      };
      // historyMessage.push(msg);
      this.mes = '';
      $('#mes').val('');
      this.scrollToBottom('chat-box')
      this.clientRef.current.sendMessage('/api/send-message', JSON.stringify(msg));
    }
  };
  handleReceiveMessage = async msg => {
    if(msg?.type === 'notification'){
      Alert({
        title: msg?.title || `${this.props.t("Have new job match with you, please check!!")}`,
        status: 'success',
        time: 4000
      })
      return;
    }
    let {historyMessage, currentUser, users} = this.state;
    let {profile} = this.props.user;
    let { onReceiveMessage } = this.props;
    let idx = users.map(item => {
      return item.id
    }).indexOf(msg.fromUser);
    if (idx !== -1) {
      users[idx].lastMessage = msg.message;
      users[idx].unreadCount = 1;
      users[idx].createAt = moment().format("YYYY-MM-DDThh:mm:ss");
    } else if (msg?.fromUser !== profile?.id){
      let res = await getProfileUserDetail({userId: msg.fromUser});
      let user = res.data.content[0];
      users.push({
        id: user.userId,
        avatar: user.avatar || '',
        name: `${user.firstName || ''} ${user.lastName || ''}`,
        createdAt: '',
        lastMessage: msg.message
      })
    }
    if ( currentUser == msg.fromUser || profile.id == msg.fromUser) {
      historyMessage.push(msg);
    }
    if (currentUser == msg.fromUser && profile.id == msg.toUser) {
      if(this.clientRef.current){
        socket.readMessage(this.clientRef.current, msg);
      }
    }
    this.setState({
      historyMessage,
      users
    }, () => {
      this.scrollToBottom('chat-box');
      onReceiveMessage({});
    })
  };
  handleScroll = async e => {
    let { currentUser, page, size, historyMessage, canLoadMore } = this.state;
    if (e.target.scrollTop === 0 && canLoadMore) {
      let p = page + 1;
      this.setState({
        isLoadingChat: true
      });
      let res = await messageServices.getHistory({userId: currentUser, page: p, size: size});
      if (res.status) {
        let data = res.data;
        data.reverse();

        if (data.length === 0) {
          canLoadMore = false
        }
        historyMessage = data.concat(historyMessage);
        this.setState({
          page: p,
          canLoadMore,
          historyMessage,
          isLoadingChat: false
        }, () => {
          $('.selectpicker').selectpicker();
        })
      }

    }
  };
  handleUploadFile = async e => {
    let {profile} = this.props.user;
    let { currentUser, historyMessage } = this.state;
    let file = e.target.files[0];
    let formData = new FormData();
    // formData.append("certificateImage", file)
    // let res = await uploadImage(formData);
    // c
    // if (!res.status) {
    //     Alert({
    //       title: "Can not load image",
    //       status: 'fail'
    //     })
    //   return
    // }
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      console.log(reader.result)
      if(this?.clientRef?.current) {
        let base64 = reader.result.split(',')[1];
        let msg = {
          avatar: profile.avatar,
          encrypt64File: base64,
          "fromUser": profile.id,
          "toUser": currentUser,
          fileName: file.name,
          createdAt: moment().format("YYYY-MM-DDThh:mm:ss")
        };
        this.scrollToBottom('chat-box')
        this.clientRef.current.sendMessage('/api/send-file', JSON.stringify(msg));
      }
    };
    reader.onerror = function (error) {
      Alert({
        title: this.props.t('Can not load image'),
        status: 'fail'
      })
    };
  };
  handlClickFile = e => {
    $('#upload-file').click()
  };
  handleConfirm = e => {
    let { confirmPrice, currentUser, job, jobList } = this.state;
    let { profile } = this.props.user;
    if(e.target.checked) {
      if (!confirmPrice) {
        Alert({
          title: this.props.t("Please enter price"),
          status: 'fail'
        });
        e.target.checked = false;
        return;
      }
      if(this.clientRef.current){
        let idx = jobList.map(item => {
          return item.id
        }).indexOf(parseInt(job));
        let data = {
          type: 'confirm',
          job: jobList[idx],
          confirmPrice: confirmPrice.replace(/\,/g, '')
        };
        let msg = {
          avatar: profile.avatar,
          "message": JSON.stringify(data),

          "fromUser": profile.id,
          "toUser": currentUser,
          createdAt: moment().format("YYYY-MM-DDThh:mm:ss")
        };
        // historyMessage.push(msg);
        this.setState({
          // historyMessage: historyMessage,
          mes: ''
        });
        this.scrollToBottom('chat-box')
        this.clientRef.current.sendMessage('/api/send-message', JSON.stringify(msg));
        e.target.checked = false;
      } else  {
        e.target.checked = false;
      }
    }
  };
  checkURL = (url) => {
    return(url.match(/\.(jpeg|jpg|gif|png)$/) != null);
  };
  isJson = (str) => {
    if (typeof str !== 'string') return false;
    try {
      const result = JSON.parse(str);
      const type = Object.prototype.toString.call(result);
      return type === '[object Object]'
        || type === '[object Array]';
    } catch (err) {
      return false;
    }
  };
  handleConfirmPrice = async (e) => {
    let { currentUser, isConfirming, jobList } = this.state;
    let { profile } = this.props.user;
    if (isConfirming) {
      return;
    }
    if (!profile.caniId) {
      Alert({
        title: this.props.t("You are not registered with CanI"),
        status: 'fail'
      })
      return;
    }

    try {
      let data = JSON.parse(e.target.getAttribute('data'));
      let mes = JSON.parse(data.message);
      let idx = mes.job.pickupCanI.map(item => {
        return item.id
      }).indexOf(profile.id);
      if (idx === -1) {
        Alert({
          title: this.props.t("You are not registered to do this work"),
          status: 'fail'
        })
        return;
      }
      if(this.clientRef.current){
        this.setState({
          isConfirming: true
        });
        let response = await jobServices.confirmPrice({
          "owner": mes.job.creationUser.id,
          "requestedUserId": mes.job.creationUser.id === profile.id ? currentUser : profile.id,
          "jobId": mes.job.id,
          "price": mes.confirmPrice,
          "currency": mes.job.currency
        });
        if (response.status) {
          let indexJob = jobList.map(item => {
            return item.id
          }).indexOf(mes.job.id);
          if(indexJob !== -1) {
            jobList.splice(indexJob, 1);
          }
          let data = {
            type: 'confirmed',
            confirmPrice: mes.confirmPrice,
            job: mes.job
          };
          let msg = {
            "message": JSON.stringify(data),
            "fromUser": profile.id,
            "toUser": currentUser,
            createdAt: moment().format("YYYY-MM-DDThh:mm:ss")
          };
          this.scrollToBottom('chat-box');
          this.clientRef.current.sendMessage('/api/send-message', JSON.stringify({
            "message": `####CONFIRMED####_${mes.job.id}`,
            "fromUser": profile.id,
            "toUser": currentUser,
            createdAt: moment().format("YYYY-MM-DDThh:mm:ss")
          }));
          this.clientRef.current.sendMessage('/api/send-message', JSON.stringify(msg));
          Alert({
            title: this.props.t("Confirm price successfully!"),
            status: "success"
          })
        } else {
          Alert({
            title: this.props.t("The job is not available!"),
            status: 'fail'
          })
        }
        this.setState({
          isConfirming: false,
          jobList: jobList
        })
      }
    } catch (e) {
      this.setState({
        isConfirming: false
      })
    }
  };
  checkDisPlayButton = (mes, index) => {
    let { historyMessage } = this.state;
    let mesData = JSON.parse(mes.message);
    let arrayFiler = historyMessage.filter(item => {
      if (this.isJson(item.message)) {
        try {
          let data = JSON.parse(item.message);
          return data.type === 'confirm' && mesData.job.id === data.job.id
        } catch (e) {
          return false
        }
      }
      return false;
    });
    let idx = -1;
    for(let i = historyMessage.length - 1; i >=0; i--) {
      if (historyMessage[i].message === `####CANCELED####_${mesData.job.id}`) {
        idx = i;
        break;
      }
    }
    let idx2 = -1;
    for(let i = historyMessage.length - 1; i >=0; i--) {
      if (historyMessage[i].message === `####CONFIRMED####_${mesData.job.id}`) {
        idx2 = i;
        break;
      }
    }

    if (arrayFiler.length > 0 && mes.id === arrayFiler[arrayFiler.length-1].id && index > idx && index > idx2) {
      return true
    }
    return false
  };
  renderMessage = (message, color) => {
   if (message.isUploadedFile) {
     if (this.checkURL(message.message)) {
       return <img src={message.message} />
     } else  {
       return <div className={"message-body "+color}>
         <Link to={message.message} target="_blank" download> <i className="icon-feather-file-text"/></Link>

       </div>
     }

   } else if (message.message) {
     if (!this.isJson(message.message)) {
       return message.message
     }
   }
  };
  handleChangeInput = e => {
    this.setState({
      [e.target.name]: convertNumberToHaveCommas(e.target.value)
    })
    console.log(convertNumberToHaveCommas(e.target.value));
    $('#confirmPrice').val(convertNumberToHaveCommas(e.target.value))
  };
  handleCancel = e =>{
    let { currentUser } = this.state;
    let { profile } = this.props.user;
    try {
      let data = JSON.parse(e.target.getAttribute('data'));
      let mes = JSON.parse(data.message)
      if(this.clientRef.current){
        let msg = {
          "message": `####CANCELED####_${mes.job.id}`,
          "fromUser": profile.id,
          "toUser": currentUser,
          createdAt: moment().format("YYYY-MM-DDThh:mm:ss")
        };
        this.scrollToBottom('chat-box');
        this.clientRef.current.sendMessage('/api/send-message', JSON.stringify(msg));
      }
    } catch (e) {
      console.log(e)
    }
  };
  renderLastMessage = msg => {
    if (!msg) {
      return "";
    } else if (msg.indexOf('####CANCELED####') !== -1) {
      return "CANCEL JOB"
    } else if (msg.indexOf('####CONFIRMED####') !== -1) {
      return ""
    } else if (this.isJson(msg)) {
      try {
        let data = JSON.parse(msg)
        return `Job: ${data.job.title}\nPrice: ${data.confirmPrice} ${data.job.currency}`
      } catch (e) {
        return ""
      }
    } else {
      return msg
    }

  };
  handleChangeMes = e => {
    this.mes = e.target.value
  };
  handleConnect = () => {
    let {historyMessage} = this.state;
    let { onReceiveMessage } = this.props;
    if (historyMessage.length > 0 && !historyMessage[historyMessage.length -1].isRead){
      onReceiveMessage({});
      socket.readMessage(this.clientRef.current, historyMessage[historyMessage.length - 1]);
    }
  };
  checkDisplayPayment = (msg, index) => {
    let {historyMessage} = this.state;
    let idx2 = -1;
    for(let i = historyMessage.length - 1; i >=0; i--) {
      if (historyMessage[i].message === `####PAYMENTED####_${msg.job.id}`) {
        idx2 = i;
        break;
      }
    }
    if (index < idx2) {
      return false
    }
    return true
  }
  deleteConversation = async (e) => {
    e.preventDefault();
    let res = await messageServices.deleteConversation({
      participantId: this.state.currentUser,
      messageId: this.state.historyMessage[this.state.historyMessage.length - 1].id
    });
    if (res.status) {
      Alert({
        title: this.props.t('Delete success'),
        status: 'success'
      })
      this.setState({
        currentUser: 0,
        historyMessage: []
      })
      window.location.reload()
    } else {
      Alert({
        title: this.props.t('Cannot delete'),
        status: 'fail'
      })
    }
  };
  changeJob = (e) => {
    this.setState({
      job: e.currentTarget.value
    })
  };
	render(){
	  let { profile } = this.props.user;
	  let { userList, isLoading } = this.props.message;
    let { t } = this.props;
    let { currentUser, users, historyMessage, topics, isLoadingChat, mes, jobList } = this.state;
		return(
      <div className="message-page">
        <div className="dashboard-content-inner" >
          {
            isLoading ? <Loader /> : <div className="col-xl-12">
              <div className="messages-container margin-top-0 margin-bottom-40">
                <div className="messages-container-inner">

                  <div className="messages-inbox">
                    <div className="messages-headline">
                      <div className="input-with-icon">
                        <input id="autocomplete-input" type="text" placeholder="Search" onChange={this.handleSearchUser}/>
                        <i className="icon-material-outline-search"/>
                      </div>
                    </div>

                    <ul>
                      {
                        users.map((item, idx) => {
                          return <li id={idx} onClick={this.handleClickUser} key={item.id} className={item.id === currentUser ? "active-message" : ""}>
                              {
                                item.unreadCount ? <i className={`status-icon status-online has-message`}/> : null
                              }
                            <a href="#">
                              <div className="message-avatar">
                                <i className={`status-icon status-${item.status === 'ONLINE' ? 'online' : 'online'}`}/><
                                img src={item.avatar || '/images/user-avatar-small-03.jpg'} alt="" />
                              </div>

                              <div className="message-by">
                                <div className="message-by-headline">
                                  <h5>{item.name || this.props.t('Anonymous')}</h5>
                                  <span>{moment(item.createdAt).fromNow()}</span>
                                </div>
                                <p>{this.renderLastMessage(item.lastMessage)}</p>
                              </div>
                            </a>
                          </li>
                        })
                      }
                    </ul>
                  </div>
                  <div className="message-content">
                    <div className="messages-headline">
                      <h4>{this.props.t('Sindy Forest')}</h4>
                      {
                        currentUser ? <a href="" onClick={this.deleteConversation} className="message-action"><i className="icon-feather-trash-2" /> Delete Conversation</a> : null
                      }

                    </div>

                    <div className="message-content-inner" id="chat-box" onScroll={this.handleScroll}>
                      {
                        isLoadingChat ? <div className="loading" >
                          <CircularProgress />
                        </div> : <>
                            {
                              currentUser ? historyMessage.map((mes, idx) => {
                                let index = users.map(item => {
                                  return item.id
                                }).indexOf(currentUser);
                                let avatar = index > -1 ? users[index].avatar :'';
                                if (this.isJson(mes.message)) {

                                  try {
                                    let me = JSON.parse(mes.message);
                                    let isDisPlayButton = this.checkDisPlayButton(mes, idx);
                                    return <div key={mes.id} className={"message-bubble"}>
                                      <div className={`message-bubble-inner system-message ${me.type}`}>
                                        <div>{this.props.t('Job')}: {me.job.title}</div>
                                        <div>{this.props.t('Price')}: {convertNumberToHaveCommas(me.confirmPrice)} {me.job.currency}</div>
                                        {
                                          isDisPlayButton && <div className="button-container">
                                            <button data={JSON.stringify(mes)} onClick={this.handleCancel}  className="button ripple-effect black">{this.props.t('Cancel')}</button>
                                            {
                                              mes.toUser === profile.id && <button data={JSON.stringify(mes)} onClick={this.handleConfirmPrice}  className="button ripple-effect">{this.props.t('Confirm')}</button>
                                            }
                                          </div>
                                        }
                                        {
                                          me.type === 'confirmed' && me.job?.creationUser?.id === profile.id && this.checkDisplayPayment(me, idx) ? <div className="button-container">
                                            <button onClick={() => this.props.history.push(`/payment/${me.job.id}`)} className="button ripple-effect">{this.props.t('Payment')}</button>
                                          </div> : null
                                        }
                                      </div>
                                    </div>
                                  } catch (e) {
                                    return ""
                                  }
                                } else if (mes.message.indexOf("####CANCELED####") !== -1) {
                                  return null;
                                } else if (mes.message.indexOf("####PAYMENTED####") !== -1) {
                                  return null;
                                } else if (mes.message.indexOf("####CONFIRMED####") !== -1) {
                                  return null;
                                } else if (mes.fromUser === currentUser) {
                                  return  <div key={idx} className="message-bubble">
                                    <div className="message-bubble-inner">
                                      <div className="message-avatar"><img src={avatar || "/images/user-avatar-small-03.jpg"} alt="" /></div>
                                      <div className="message-text"><p>{this.renderMessage(mes, 'black')}</p></div>
                                    </div>
                                    <div className="clearfix" />
                                  </div>
                                } else {
                                  return <div className="message-bubble me">
                                    <div className="message-bubble-inner">
                                      <div className="message-avatar"><img src={profile.avatar || "/images/user-avatar-small-03.jpg"} alt="" /></div>
                                      <div className="message-text"><p>{this.renderMessage(mes, 'red')}</p></div>
                                    </div>
                                    <div className="clearfix"/>
                                  </div>
                                }
                              }) : null
                            }
                        </>

                      }

                      {topics && (
                        <SockJsClient
                          url={_socketUrl}
                          onConnect={this.handleConnect}
                          topics={this.state.topics}
                          onMessage={this.handleReceiveMessage}
                          ref={ this.clientRef}
                        />
                      )}
                    </div>
                    {
                      !isLoadingChat && currentUser ? <div className={!checkIsCanIState() ? "action-chat-container row" : "action-chat-container row flex-end"}>
                          {
                            !checkIsCanIState() ? <div className="col-4">
                              <select data-container="body" onChange={this.changeJob} className="selectpicker jobs" data-live-search="true">
                                {
                                  jobList.map((item, index) => {
                                    return <option key={index} value={item.id}>{item.title}</option>
                                  })
                                }
                              </select>
                            </div> : null
                          }
                        {
                          !checkIsCanIState() ?  <div className={!checkIsCanIState() ? "col-3" : "col-5"}>
                            <input id="confirmPrice" type="text" min="0" name="confirmPrice" onChange={this.handleChangeInput} placeholder="price" className="input"/>
                          </div> : null
                        }
                        {
                            !checkIsCanIState() ?  <div className={!checkIsCanIState() ? "col-3" : "col-5"}>
                              <div className="checkbox">
                                <input onChange={this.handleConfirm} type="checkbox" id="chekcbox1" />
                                <label htmlFor="chekcbox1"><span className="checkbox-icon"/>{this.props.t("Confirm")}</label>
                              </div>
                            </div> : null
                        }
                        <div className="col-2" style={ {display: 'flex', justifyContent: "flex-end"} }>
                          <i className="icon-feather-file-text" onClick={this.handlClickFile}/>
                        </div>
                        <input onChange={this.handleUploadFile} id="upload-file" name="uploadFile" type="file" style={{display: 'none'}}/>
                      </div> : null
                    }

                    <div className="message-reply">
                      <textarea onChange={this.handleChangeMes} id="mes" name="mes" cols="1" rows="1" placeholder="Your Message" data-autoresize />
                      {
                        currentUser ? <button onClick={this.handleSend}  className="button ripple-effect">{this.props.t("Send")}</button> : null
                      }

                    </div>

                  </div>

                </div>
              </div>
            </div>
          }

        </div>
      </div>
		);
	}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Message);
