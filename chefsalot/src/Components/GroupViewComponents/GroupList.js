import React, { Component } from 'react';
import axios from 'axios';
import GenericListDisplay from 'Components/GenericComponents/GenericListDisplay';
import LoadingSpinner from 'Components/GenericComponents/LoadingSpinner'


class GroupList extends Component {
  constructor(props) { 
    super(props);
    this.state = {
        loading: true
    }

    this.componentDidMount = this.componentDidMount.bind(this);
  };

  
  componentDidMount() {
      if (this.props.groups_list == null) {
        axios({
            method: 'get',
            url: 'http://localhost:8000/groups/',
            headers: {'Authorization': 'Token ' + this.props.token},
        }).then(response => 
            this.props.handleGroupsLoad(response.data)
        ).then(() => 
            this.setState({loading: false}
        ));
      }
//   .catch(error => console.log(error.response));
  }

  render () {
      return (
        this.state.loading ? <LoadingSpinner /> : <GenericListDisplay listLabel="Groups" items={this.props.group_list} getValue={group => group.name} />
      );
  }
}

export default GroupList;