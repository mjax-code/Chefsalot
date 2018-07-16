import React, { Component } from 'react';
import axios from 'axios';
import TextField from '@material-ui/core/TextField'


class CreateGroupInput extends Component {
  constructor(props) {
    super(props);

    this.onGroupNameChange = this.onGroupNameChange.bind(this);
  }

  onGroupNameChange(event) {
    this.props.handleGroupNameChange(event.target.value);
  }

  render() {
    return (
          <TextField type='text' label='Group Name' onChange={this.onGroupNameChange} />
    );
  }
}


export default CreateGroupInput;