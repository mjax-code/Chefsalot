import React, { Component } from 'react';
import Topbar from './Topbar';
import RecipeForm from './RecipeForm';
import LoginSignupForm from './Authentication/LoginSignupForm'
import LogoutButton from './Authentication/LogoutButton'

class Homepage extends Component {
  constructor(props) {
      super(props);
      this.state = {
        auth_token: '',
      };

      this.handleAuth = this.handleAuth.bind(this);
      this.handleLogout = this.handleLogout.bind(this);
    }
  
  handleAuth(token) {
    localStorage.setItem('token', token);
    this.setState({auth_token:token});
  }

  handleLogout() {
    localStorage.removeItem('token');
    this.setState({auth_token:''})
  }

  getAuthToken() {
    var token = localStorage.getItem('token');
    if (token) {
      return token;
    } else {
      return this.state.auth_token;
    }
  }
  
  render() {
    var token = this.getAuthToken();
    if (token === '') {
      return (
        <div>
            <LoginSignupForm onAuth={this.handleAuth}/>
          </div> 
        );
    } else {
      return(
        <div>
          <Topbar />
          <RecipeForm token={this.state.auth_token} />
          <LogoutButton onClick={this.handleLogout} />
        </div>
      );
    }
  }
}

export default Homepage;
