import React, { Component } from 'react';
import Topbar from 'Components/Topbar';
import RecipeForm from 'Components/RecipeForm';
import LoginSignupForm from 'Components/Authentication/LoginSignupForm'
import LogoutButton from 'Components/Authentication/LogoutButton'
import RecipeList from 'Components/UserViewComponents/RecipeList'
import UserView from 'Components/UserViewComponents/UserView'
import GroupView from 'Components/GroupViewComponents/GroupView'
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';


class Homepage extends Component {
  constructor(props) {
      super(props);
      this.state = {
        auth_token: '',
        body_component: 'userview',
        recipe_list: null
      };

      this.handleAuth = this.handleAuth.bind(this);
      this.handleLogout = this.handleLogout.bind(this);
      this.refreshAuthToken = this.refreshAuthToken.bind(this);
      this.getBodyComponent = this.getBodyComponent.bind(this);
      this.handleNav = this.handleNav.bind(this);
      this.handleRecipeLoad  = this.handleRecipeLoad.bind(this);
    }

  handleRecipeLoad(recipe_list) {
    this.setState({recipe_list: recipe_list});
  }
  
  handleAuth(token) {
    localStorage.setItem('token', token);
    this.setState({auth_token:token});
  }

  handleLogout() {
    localStorage.removeItem('token');
    this.setState({auth_token:'', recipe_list:null})
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

  handleNav(body_component) {
    this.setState({body_component:body_component});
  }

  getBodyComponent() {
    switch(this.state.body_component) {
      case "userview":
    return <UserView recipe_list_view={<RecipeList onRecipeLoad={this.handleRecipeLoad}
                                                   recipe_list={this.state.recipe_list} 
                                                   token={this.state.auth_token}/>} />
      case "groupview":
        return <GroupView token={this.state.auth_token}/> 
      case "recipeview":
        return <RecipeForm token={this.state.auth_token}/>
      default:
        return <UserView />
    } 
  }
  
  render() {
    this.refreshAuthToken();
    var token = this.state.auth_token;
    const style = {

    };

    if (token === '') {
      return (
        <div>
          <img src='/img/pig4.png' alt="pig logo"/>
          <Paper style= {style} elevation={10} >
            <LoginSignupForm onAuth={this.handleAuth}/>
          </Paper>
        </div> 
      );
    } else {
      return(
        <div>
            {/* TODO have a better way of handling these different body components ... enum? */}
            <Topbar onNav={this.handleNav} userview="userview" groupview="groupview" recipeview="recipeview" />
            {this.getBodyComponent()}
            <LogoutButton onClick={this.handleLogout} />
        </div>
      );
    }
  }
}

export default Homepage;
