import React, { Component } from 'react';
import Topbar from 'Components/Topbar';
import RecipeForm from 'Components/RecipeForm';
import LoginSignupForm from 'Components/Authentication/LoginSignupForm'
import LogoutButton from 'Components/Authentication/LogoutButton'
import RecipeList from 'Components/RecipeList'

class Homepage extends Component {
  constructor(props) {
      super(props);
      this.state = {
        auth_token: '',
      };

      this.handleAuth = this.handleAuth.bind(this);
      this.handleLogout = this.handleLogout.bind(this);
      this.refreshAuthToken = this.refreshAuthToken.bind(this);
    }
  
  handleAuth(token) {
    localStorage.setItem('token', token);
    this.setState({auth_token:token});
  }

  handleLogout() {
    localStorage.removeItem('token');
    this.setState({auth_token:''});
  }

  refreshAuthToken() {
    var token = localStorage.getItem('token');
    if (this.state.auth_token) {
      return;
    }

    if (token) {
      this.setState({auth_token:token})
    }
  }
  
  render() {
    this.refreshAuthToken();
    var token = this.state.auth_token;

    if (token === '') {
      return (
        <div>
            <LoginSignupForm onAuth={this.handleAuth}/>
          </div> 
        );
    } else {
      return(
        <div className={this.props.classes.test}>
          <Topbar />
          <RecipeForm token={this.state.auth_token} />
          <LogoutButton onClick={this.handleLogout} />
          <RecipeList token={this.state.auth_token}/>
        </div>
      );
    }
  }
}

export default Homepage;
