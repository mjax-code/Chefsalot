import React, { Component } from 'react';


class UserView extends Component {
  constructor(props) { 
    super(props);
  };

  render() {
    return (
        <div>{this.props.recipe_list_view}</div>
    );
  }
}


export default UserView;