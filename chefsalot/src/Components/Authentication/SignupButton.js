import React, { Component } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button'


class SignupButton extends Component {
  constructor(props) {
    super(props);
    this.handleSignupSubmit = this.handleSignupSubmit.bind(this);
  }

  handleSignupSubmit() {
    axios.post('http://localhost:8000/users/', {
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
        <Button variant="contained" color="primary" onClick={this.handleSignupSubmit}>
          Sign Up!!
        </Button>
    );
  }
}


export default SignupButton;