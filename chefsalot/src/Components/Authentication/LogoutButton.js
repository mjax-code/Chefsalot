import React, { Component } from 'react';
import Button from '@material-ui/core/Button'


class LogoutButton extends Component {
   render() {
    return (
        <Button variant="contained" color="primary" onClick={this.props.onClick}>
          Logout
        </Button>
    );
  }
}

export default LogoutButton;