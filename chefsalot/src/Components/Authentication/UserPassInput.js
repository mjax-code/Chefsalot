import React, { Component } from 'react';

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
          <label>
            Username:
            <input type="text" onChange={this.onUsernameChange} />
          </label>
          <label>
            Password:
            <input type="text" onChange={this.onPasswordChange} />
          </label>
        </form>
       </div>
    );
  }
}

export default UserPassInput;