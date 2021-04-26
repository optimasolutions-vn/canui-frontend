import React from 'react';
import Loader from '../../components/effects/Loader';
import {
  resetPassword
} from '../../services/userService';
import UrlPath from '../../libs/UrlPath';
const minValue = 3;

export default class ResetPassword extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			password: '',
			confirmPassword: '',
      errorMessage: [],
      isLoading: false,
			isFail: false,
			token: '',
		};
	};
	componentDidMount(){
		let {match} = this.props;
		if (match.params.token) {
      this.setState({
        token: match.params.token
      })
		}
	};
	componentDidUpdate(prevProps, prevState){

	};
  handleChangeInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  };
  handleSubmit = async (e) => {
    e.preventDefault();
    let { password, confirmPassword, isLoading, token } = this.state;
    let {t, history} = this.props;
    let errorMessage = [];
    if (password.length < 8) {
      errorMessage.push(t("The password must be least 8 character"));
    }
    if (password !== confirmPassword) {
      errorMessage.push(t("The repeat password is different from password"));
    }
    if (errorMessage.length > 0) {
    	this.setState({
        errorMessage
			})
		} else if (!isLoading) {
    	this.setState({
				isLoading: true,
				errorMessage: [],
			});
    	let res = await resetPassword({
				token: token,
				password: password
			});
    	if (res.status) {
    		this.setState({
          isLoading: false,
				});
        window.Snackbar.show({
          text: t('Change password success'),
          pos: 'bottom-center',
          showAction: false,
          actionText: "Dismiss",
          duration: 2000,
          textColor: '#5f9025',
          backgroundColor: '#EBF6E0'
        });
        history.push(`${UrlPath.Home}`)
			} else {
        this.setState({
          isLoading: false,
					errorMessage: ['Can not change password']
        });
			}
		}
	};
	render(){
		let {password, confirmPassword, errorMessage, isLoading} = this.state;
		return(
			<>
				{
					isLoading &&  <Loader/>
				}
				<div id="titlebar" className="gradient">
					<div className="container">
						<div className="row">
							<div className="col-md-12">

								<h2>Reset Password</h2>

							</div>
						</div>
					</div>
				</div>
				<div className="container">
					<div className="row">
						<div className="col-xl-5 offset-xl-3">
              {
                errorMessage.length > 0 &&  <div className="notification error">
                  {
                    errorMessage.map(item => {
                      return <p key={item}>{item}</p>
                    })
                  }
								</div>
              }

							<div className="login-register-page">
								<form method="post" id="forgot-form" onSubmit={this.handleSubmit}>
									<div className="input-with-icon-left">
										<i className="icon-material-outline-lock"></i>
										<input
											type="password"
											className="input-text with-border"
											name="password"
											placeholder="Password"
											required
											value={password}
											onChange={this.handleChangeInput}
										/>
									</div>

									<div className="input-with-icon-left">
										<i className="icon-material-outline-lock"></i>
										<input
											type="password"
											className="input-text with-border"
											name="confirmPassword"
											placeholder="Confirm Password"
											value={confirmPassword}
											onChange={this.handleChangeInput}
											required/>
									</div>
								</form>

								<button
									type="submit"
									className="button full-width button-sliding-icon ripple-effect margin-top-10"
									form="forgot-form">
									Submit
									<i className="icon-material-outline-arrow-right-alt" />
								</button>

							</div>

						</div>
					</div>
				</div>
				<div className="margin-top-70" />
			</>
		);
	}
};
