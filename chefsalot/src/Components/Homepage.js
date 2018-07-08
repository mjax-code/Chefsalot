import React, { Component } from 'react';
import Topbar from './Topbar';
import RecipeForm from './RecipeForm';
import LoginSignupForm from './Authentication/LoginSignupForm'

class Homepage extends Component {
  constructor(props) {
      super(props);
      this.state = {
        auth_token: '',
      };

      this.handleAuth = this.handleAuth.bind(this);
    }
  
  handleAuth(token) {
    this.setState({auth_token:token});
  }
  
  render() {
    return (
    <div>
        <Topbar />
        <RecipeForm />
        <LoginSignupForm onAuth={this.handleAuth}/>
        {this.state.auth_token}
      </div> 
    );
  }
}

export default Homepage;
