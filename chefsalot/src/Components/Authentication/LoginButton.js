import React, { Component } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button'


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
        <Button variant="contained" color="primary" onClick={this.handleLoginSubmit}>
          Login
        </Button>
    );
  }
}


export default LoginButton;