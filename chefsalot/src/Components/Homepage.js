import React, { Component } from 'react';
import Topbar from './Topbar';
import RecipeForm from './RecipeForm';
class Homepage extends Component {
  render() {
    return (
      <div>
        <Topbar />
        <RecipeForm />
      </div> 
    );
  }
}

export default Homepage;
