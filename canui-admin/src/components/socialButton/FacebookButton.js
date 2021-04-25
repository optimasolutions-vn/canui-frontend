import React from 'react'
import SocialLogin from 'react-social-login'

class SocialButton extends React.Component {

  render() {
    return <button onClick={this.props.triggerLogin} {...this.props} className="facebook-login ripple-effect">
      { this.props.children }
    </button>
  }
}

export default SocialLogin(SocialButton);
