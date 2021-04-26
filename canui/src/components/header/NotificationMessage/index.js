import React, {useState, Component} from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {runScript} from "../../../libs/templateJs";
import SockJsClient from 'react-stomp';
import {Alert} from "../../../layouts/Scripts/ManualScript";
import {actionGetNotification} from "../../../actions/actionUser";
import UrlPath from '../../../libs/UrlPath';
import socket from '../../../helpers/socket';
import './style.scss';
function createMarkup(_html) {
  return {__html: `${_html}`};
}
const mapStateToProps = state => ({
  notification: state.notification
});

const mapDispatchToProps = dispatch => ({
  onReceiveMessage: params => dispatch(actionGetNotification(params))
});
const _socketUrl = 'https://canui.tech/api/ws/';

class NotificationMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topic: [],
    }
    this.clientRef = React.createRef();
  }
  componentDidMount() {
    runScript();
  }
  componentDidUpdate(prevProps, prevState){
    if (!prevProps.notification.isLoadedNotification && this.props.notification.isLoadedNotification) {
      let topics = [`/api/topic/user/${this.props.notification.userId}`, `/api/topic/notification/${this.props.notification.userId}`];
      this.setState({
        topics
      })
    }
  }
  handleReadAll = () => {
    let { notifications } = this.props.notification;
    let { onReceiveMessage } = this.props;
    console.log(notifications);
    socket.readNotification(this.clientRef.current, notifications[0]);
    onReceiveMessage({});
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
  renderLastMessage = msg => {
    if (!msg) {
      return "";
    } else if (msg.indexOf('####CANCELED####') !== -1) {
      return "CANCEL JOB"
    } else if (msg.indexOf('####CONFIRMED####') !== -1) {
      return "Confirmed Job"
    } else if (this.isJson(msg)) {
      try {
        let data = JSON.parse(msg)
        return `Công việc: ${data.job.title}\nGiá: ${data.confirmPrice} ${data.job.currency}`
      } catch (e) {
        console.log(e)
        return ""
      }
    } else {
      return msg
    }

  };
  actionOnClick = (e, item) => {
    e.preventDefault();
    socket.readNotification(this.clientRef.current, item);
    this.props.history.push({
      pathname: `${UrlPath.Notification}/${item.detailId}`,
      search: ''
    })
  }
  handleReceiveMessage = async msg => {
    let { onReceiveMessage } = this.props;
    console.log('receive msg', msg);
    if(msg?.type === 'notification'){
      Alert({
        title: msg?.title || `${this.props.t("Have new job match with you, please check!!")}`,
        status: 'success',
        time: 4000
      })
      return;
    }
    onReceiveMessage({});
    // let {historyMessage, currentUser, users} = this.state;
    // let {profile} = this.props.user
    // let idx = users.map(item => {
    //   return item.id
    // }).indexOf(msg.fromUser);
    // if (idx !== -1) {
    //   users[idx].lastMessage = msg.message;
    //   users[idx].createAt = moment().format("YYYY-MM-DDThh:mm:ss");
    // } else if (msg?.fromUser !== profile?.id){
    //   let res = await getProfileUserDetail({userId: msg.fromUser});
    //   let user = res.data.content[0];
    //   users.push({
    //     id: user.userId,
    //     avatar: user.avatar || '',
    //     name: `${user.firstName || ''} ${user.lastName || ''}`,
    //     createdAt: '',
    //     lastMessage: msg.message
    //   })
    // }
    // if ( currentUser == msg.fromUser || profile.id == msg.fromUser) {
    //   if(this.clientRef.current){
    //     socket.readMessage(this.clientRef.current, msg);
    //   }
    //   historyMessage.push(msg);
    // }
    // this.setState({
    //   historyMessage,
    //   users
    // }, () => {
    //   this.scrollToBottom('chat-box');
    // })
  };
  render () {
    let { totalUnread, messages, notifications, notificationUnread } = this.props.notification;
    let { topics } = this.state;
    return (
      <div className="header-widget hide-on-mobile">
        <div className="header-notifications">
          <div className="header-notifications-trigger">
            <a><i className="icon-feather-bell" />
            {notificationUnread > 0 ?
              <span>{notificationUnread}</span>
              : null
            }
            </a>
          </div>
          <div className="header-notifications-dropdown">
            <div className="header-notifications-headline">
              <h4>Notifications</h4>
              <button onClick={this.handleReadAll} className="mark-as-read ripple-effect-dark" title="Mark all as read" data-tippy-placement="left">
                <i className="icon-feather-check-square"/>
              </button>
            </div>

            <div className="header-notifications-content">
              <div className="header-notifications-scroll" data-simplebar>
                <ul>
                  {
                    notifications && notifications.length > 0 ? notifications.map((item, index) => {
                      return  <li key={`noti-${index}`}  className={item.isRead ? "notification-read" : "notifications-not-read"}>
                        <a href="#" onClick={e => this.actionOnClick(e, item)} dangerouslySetInnerHTML={createMarkup(item.description)}/>
                      </li>
                    }) : null
                  }
                </ul>
              </div>
            </div>
            <a href="/my-page/Notification" className="header-notifications-button ripple-effect button-sliding-icon">View All Notification<i className="icon-material-outline-arrow-right-alt" /></a>
          </div>

        </div>


        <div className="header-notifications">
          <div className="header-notifications-trigger">
            <a>
              <i className="icon-feather-mail"/>
              {totalUnread > 0 ?
              <span>{totalUnread}</span>
              : null}
            </a>
          </div>


          <div className="header-notifications-dropdown">

            <div className="header-notifications-headline">
              <h4>Messages</h4>
              {/*<button onClick={this.handleReadAll} className="mark-as-read ripple-effect-dark" title="Mark all as read" data-tippy-placement="left">*/}
                {/*<i className="icon-feather-check-square" />*/}
              {/*</button>*/}
            </div>

            <div className="header-notifications-content">
              <div className="header-notifications-scroll" data-simplebar>
                <ul>
                  {
                    messages.map((item, index) => {
                      return <li key={`message-${index}`} className="notifications-not-read">
                        <a href={`/messages/${item.id}`}>
                      <span className="notification-avatar status-online">
                        <img src={item.avatar || "/images/user-avatar-small-03.jpg"} alt="" />
                      </span>
                          <div className="notification-text">
                            <div>{item.name}</div>
                            <p className="notification-msg-text">{this.renderLastMessage(item.lastMessage)}</p>
                            {/*<span className="color">4 hours ago</span>*/}
                          </div>
                        </a>
                      </li>
                    })
                  }
                </ul>
              </div>
            </div>

            <a href="/my-page/Message" className="header-notifications-button ripple-effect button-sliding-icon">View All Messages<i className="icon-material-outline-arrow-right-alt"></i></a>
          </div>
        </div>
        {topics && (
          <SockJsClient
            url={_socketUrl}
            topics={topics}
            onMessage={this.handleReceiveMessage}
            ref={ this.clientRef}
          />
        )}
      </div>
    )
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(NotificationMessage));

