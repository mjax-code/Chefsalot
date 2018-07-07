import React, { Component } from 'react';
import LoginSignupForm from './LoginSignupForm';
import axios from 'axios';


class SignupSubmit extends Component {
  handleSignupSubmit() {
    axios.post('http://localhost:8000/users/', {
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
      <LoginSignupForm onSignupOrLogin={this.handleSignupSubmit} />
    );
  }
}


export default SignupSubmit;