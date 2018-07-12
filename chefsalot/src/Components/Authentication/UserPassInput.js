import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';

class UserPassInput extends Component {
  constructor(props) {
      super(props);

      this.onUsernameChange = this.onUsernameChange.bind(this);
      this.onPasswordChange = this.onPasswordChange.bind(this);
  }

  onUsernameChange(event) {
    this.props.handleUsernameChange(event.target.value);
  }

  onPasswordChange(event) {
    this.props.handlePasswordChange(event.target.value);
  }

  render() {
    return (
      <div>
        <form>
          <TextField style={{margin: '10px'}} type='text' label='Username' onChange={this.onUsernameChange} />
          <TextField style={{margin: '10px'}} type='text' label='Password' onChange={this.onPasswordChange} />
        </form>
       </div>
    );
  }
}

export default UserPassInput;