import React, { Component } from 'react';

class LoginSignupForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };

    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  handleUsernameChange(event) {
    this.setState({username: event.target.value});
  }

  handlePasswordChange(event) {
    this.setState({password: event.target.value});
  }

  render() {
    return (
      <div>
        <form>
          <label>
            Username:
            <input type="text" onChange={this.handleUsernameChange} />
          </label>
          <label>
            Password:
            <input type="text" onChange={this.handlePasswordChange} />
          </label>
        </form>
        <button onClick={this.props.onSignupOrLogin}>
          Sign Up! 
        </button>
       </div>
    );
  }
}

export default SignupForm;