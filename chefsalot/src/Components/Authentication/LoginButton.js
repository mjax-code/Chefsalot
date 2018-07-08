import React, { Component } from 'react';
import axios from 'axios';


class LoginButton extends Component {
  constructor(props) {
    super(props);
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
  }

  handleLoginSubmit() {
    axios.post('http://localhost:8000/auth/', {
      username: this.props.username,
      password: this.props.password
    }).then(
      response => this.props.onAuth(response.data['token'])
    ).catch(
      error => console.log(error)
    );
  }

  render() {
    return (
        <button onClick={this.handleLoginSubmit}>
          Login
        </button>
    );
  }
}


export default LoginButton;