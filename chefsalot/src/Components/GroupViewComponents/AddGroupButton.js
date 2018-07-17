
import React, { Component } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button'


class AddGroupButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <Button style={{margin: "10px"}} variant="contained" color="primary" onClick={this.props.handleAddGroupClick}>
          {this.props.show_form ? 'Cancel' : 'Add Group'}
        </Button>
    );
  }
}


export default AddGroupButton;