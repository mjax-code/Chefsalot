import React, { Component } from 'react';
import LoginSignupForm from './LoginSignupForm';
import axios from 'axios';


class LoginSubmit extends Component {
  handleLoginSubmit() {
    axios.post('http://localhost:8000/auth/', {
      username: this.state.username,
      password: this.state.password
    }).then(
      response => console.log(response)
    ).catch(
      error => console.log(error)
    );
  }

  render() {
    return (
      <LoginSignupForm onSignupOrLogin={this.handleLoginSubmit} />
    );
  }
}


export default LoginSubmit;