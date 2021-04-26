import React from 'react';
import langConst from '../../../libs/lang';
import Loader from '../../../components/effects/Loader';

const _imgBanner = '/images/home-background.jpg';


class CmsLogin extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: {}
		};
	};
	componentDidMount(){
		console.log(this.props);
	};
	componentDidUpdate(prevProps, prevState){
		console.log(prevProps);
		console.log(prevState);
	};
	render(){
		const { t } = this.props;
		return(
			<React.Fragment>
				<div className="row">
					<div className="col-xl-5 offset-xl-3">
						<div className="login-register-page">
							<div className="welcome-text">
								<h3>{t('Login')}</h3>
							</div>
							<form method="post" id="login-form">
								<div className="input-with-icon-left">
									<i className="icon-material-baseline-mail-outline"></i>
									<input type="text" className="input-text with-border" name="emailaddress" id="emailaddress" placeholder={t('User Name')} required/>
								</div>

								<div className="input-with-icon-left">
									<i className="icon-material-outline-lock"></i>
									<input type="password" className="input-text with-border" name="password" id="password" placeholder={t('Password')} required/>
								</div>
							</form>
							<button className="button full-width button-sliding-icon ripple-effect margin-top-10" type="submit" form="login-form">{t('Log In')}<i className="icon-material-outline-arrow-right-alt"></i></button>
						</div>

					</div>
				</div>
			</React.Fragment>
		);
	}
};
export default CmsLogin;
