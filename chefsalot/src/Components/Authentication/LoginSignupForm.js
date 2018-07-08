import React, { Component } from 'react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

class LoginSignupForm extends Component {
  render() {
    return (
        <div>
            <SignupForm onAuth={this.props.onAuth} />
            <LoginForm onAuth={this.props.onAuth} />
        </div>
    );
  }
}

export default LoginSignupForm;