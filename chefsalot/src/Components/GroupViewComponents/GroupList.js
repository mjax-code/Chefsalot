import React, { Component } from 'react';
import axios from 'axios';
import GenericListDisplay from 'Components/GenericComponents/GenericListDisplay';


class GroupList extends Component {
  constructor(props) { 
    super(props);

    this.componentDidMount = this.componentDidMount.bind(this);
  };

  componentDidMount() {
      if (this.props.groups_list == null) {
        axios({
            method: 'get',
            url: 'http://localhost:8000/groups/',
            headers: {'Authorization': 'Token ' + this.props.token},
        }).then(response => this.props.handleGroupsLoad(response.data));
      }
//   .catch(error => console.log(error.response));
  }

  render () {
      return (
        <GenericListDisplay items={this.props.group_list} getValue={group => group.name} />
      );
  }
}

export default GroupList;