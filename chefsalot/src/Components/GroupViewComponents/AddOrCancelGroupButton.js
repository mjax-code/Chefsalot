
import React, { Component } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button'


class AddOrCancelGroupButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <Button style={{margin: "10px"}} variant="contained" color="primary" onClick={this.props.handleAddOrCancelGroupClick}>
          {this.props.show_form ? 'Cancel' : 'Add Group'}
        </Button>
    );
  }
}


export default AddOrCancelGroupButton;