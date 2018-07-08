import React, { Component } from 'react';
import UserPassInput from './UserPassInput';
import LoginButton from './LoginButton';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };

    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  handleUsernameChange(username) {
    this.setState({username: username});
  }

  handlePasswordChange(password) {
    this.setState({password: password});
  }

  render() {
    return (
        <div>
            <UserPassInput 
                handleUsernameChange={this.handleUsernameChange}
                handlePasswordChange={this.handlePasswordChange} 
                />
            <LoginButton username={this.state.username} password={this.state.password} onAuth={this.props.onAuth} />
        </div>
    );
  }
}

export default LoginForm;