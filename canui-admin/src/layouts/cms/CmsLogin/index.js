import React from 'react';
import { connect } from 'react-redux';
import Validation from '../../../helpers/Validation';
import langConst from '../../../libs/lang';
import Loader from '../../../components/effects/Loader';
import {login} from '../../../services/userService';
import UrlPath from '../../../libs/UrlPath';
import {
	actionLogin
} from '../../../actions/actionUser';
import {
	checkIsLoginSession
} from '../../../helpers';
const _imgBanner = '/images/home-background.jpg';

const mapDispatchToProps = dispatch => ({
	onLogin: (params) => dispatch(actionLogin(params))
});
const mapStateToProps = state => ({
	login: state.login
});

class CmsLogin extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: {},
			UserName: '',
			PassWord: '',
			isLoading: false,
			errorMes: ''
		};
	};
	componentDidMount(){
		//console.log(this.props);
		if(checkIsLoginSession()){
			this.props.history.push({
				pathname: `${UrlPath.CmsPath.CmsServices}`
			})
		}
	};
	componentDidUpdate(prevProps, prevState){
		//console.log(this.props.login);
		if(!prevProps.login.errorMessageLogin && this.props.login.errorMessageLogin && !this.props.login.isLoginSuccess){
			this.LoginFail();
		}else if(!prevProps.login.errorMessageLogin && !this.props.login.errorMessageLogin && this.props.login.isLoginSuccess){
			this.LoginSuccess();
		}
	};
	LoginSuccess = () => {
		this.setState({
			errorMes: '',
			isLoading: false,
			UserName: '',
			PassWord: ''
		}, () => {
			this.props.history.push({
				pathname: `${UrlPath.CmsPath.CmsServices}`
			})
		});
	}
	LoginFail = () => {
		this.setState({
			errorMes: this.props?.login?.errorMessageLogin,
			isLoading: false
		})
	}
	SubmitLogin = (e) => {
		e.preventDefault();
		if(this.state.isLoading){
			return;
		}
		this.setState({
			isLoading: true
		}, () => {
			if(!!this.validationForm()){
				this.callLoginService({
					email: this.state.UserName,
					password: this.state.PassWord
				});
			}
		});
	};
	validationForm = () => {
		if(!Validation.test(this.state.UserName, 'email')){
			this.setState({
				errorMes: this.props.t("The email is invalid"),
				isLoading: false
			});
			return false;
		}
		return true;
	}
	handleChangeUserName = (e) => {
		e.preventDefault();
		this.setState({
			UserName: e.target.value
		});
	};
	handleChangePassWord = (e) => {
		e.preventDefault();
		this.setState({
			PassWord: e.target.value
		});
	};
	callLoginService = async (params) => {
		this.props.onLogin(params);
	}
	render(){
		const { t } = this.props;
		return(
			<div className="container">
				<div className="row">
					<div className="col-xl-5 offset-xl-3">
						<div className="login-register-page">
							<div className="welcome-text">
								<h3>{t('Login')}</h3>
							</div>
							{this.state.errorMes && (
							<div className="notification error">{t(`${this.state.errorMes}`)}</div>
							)}
							<form method="post" id="login-form" onSubmit={e => this.SubmitLogin(e)} >
								<div className="input-with-icon-left">
									<i className="icon-material-baseline-mail-outline"></i>
									<input onChange={e => this.handleChangeUserName(e)} type="text" className="input-text with-border" autoComplete="new-password" name="emailaddress" id="emailaddress" placeholder={t('User Name')} value={this.state.UserName} required/>
								</div>

								<div className="input-with-icon-left">
									<i className="icon-material-outline-lock"></i>
									<input onChange={e => this.handleChangePassWord(e)} type="password" className="input-text with-border" autoComplete="new-password" name="password" id="password" value={this.state.PassWord} placeholder={t('Password')} required/>
								</div>
							</form>
							{!this.state.isLoading && (
								<button className="button full-width button-sliding-icon ripple-effect margin-top-10" type="submit" form="login-form">{t('Log In')}<i className="icon-material-outline-arrow-right-alt"></i></button>
							)}
						</div>

					</div>
				</div>
			</div>
		);
	}
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CmsLogin);
