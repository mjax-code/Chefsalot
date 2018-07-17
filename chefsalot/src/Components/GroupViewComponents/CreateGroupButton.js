import React, { Component } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button'


class GroupCreateButton extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    axios({
        method: 'post',
        url: 'http://localhost:8000/groups/',
        headers: {'Authorization': 'Token ' + this.props.token},
        data: {
            group: this.props.group_name,
        }
    }).then(response => this.props.handleGroupCreate(response)).catch(error => console.log(error));
  }

  render() {
    return (
        <Button style={{margin: "10px"}} variant="contained" color="primary" onClick={this.handleClick}>
          Create Group
        </Button>
    );
  }
}


export default GroupCreateButton;