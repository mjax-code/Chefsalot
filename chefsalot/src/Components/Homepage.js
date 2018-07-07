import React, { Component } from 'react';
import Topbar from './Topbar';
import RecipeForm from './RecipeForm';
import SignupForm from './SignupSubmit';

class Homepage extends Component {
  render() {
    return (
      <div>
        <Topbar />
        <RecipeForm />
        <SignupForm />
      </div> 
    );
  }
}

export default Homepage;
