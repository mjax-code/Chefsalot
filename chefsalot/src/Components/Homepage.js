import React, { Component } from 'react';
import Topbar from 'Components/Topbar';
import RecipeForm from 'Components/RecipeForm';
import pig from 'static/pig4.png'
import Grid from '@material-ui/core/Grid';
import GoogleLoginForm from 'Components/Authentication/GoogleLoginForm';
import LoginSignupForm from 'Components/Authentication/LoginSignupForm';
import GoogleLogoutForm from 'Components/Authentication/GoogleLogoutForm';
import RecipeList from 'Components/UserViewComponents/RecipeList';
import UserView from 'Components/UserViewComponents/UserView';
import GroupView from 'Components/GroupViewComponents/GroupView';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {
    auth_token: state.token
  }
}

class Homepage extends Component {
  constructor(props) {
      super(props);
      this.state = {
        body_component: 'userview',
        recipe_list: null
      };

      this.getBodyComponent = this.getBodyComponent.bind(this);
      this.handleNav = this.handleNav.bind(this);
      this.handleRecipeLoad  = this.handleRecipeLoad.bind(this);
    }

  handleRecipeLoad(recipe_list) {
    this.setState({recipe_list: recipe_list});
  }

  handleNav(body_component) {
    this.setState({body_component:body_component});
  }


  getBodyComponent() {
    switch(this.state.body_component) {
      case "userview":
    return <UserView recipe_list_view={<RecipeList onRecipeLoad={this.handleRecipeLoad}
                                                   recipe_list={this.state.recipe_list}
                                                   token={this.props.auth_token}/>} />
      case "groupview":
        return <GroupView token={this.props.auth_token}/>
      case "recipeview":
        return <RecipeForm token={this.props.auth_token}/>
      default:
        return <UserView />
    } 
  }

  render() {
    var token = this.props.auth_token;

    if (token === '') {
      return (
        <div className="chefsalot-login-page">
          <div className="login-form-container">
            <Grid item xs={12}>
              <img className="pigLogo" src={pig} alt="pig logo"/>
              <h1 className="textLogo"> Chefsalot </h1>
            </Grid>
            <LoginSignupForm />
            <GoogleLoginForm />
          </div>
        </div>
      );
    } else {
      return(
        <div className="chefsalot-home-page">
          <div className="home-page-container">
            {/* TODO have a better way of handling these different body components ... enum? */}
            <GoogleLogoutForm />
            <Topbar onNav={this.handleNav} userview="userview" groupview="groupview" recipeview="recipeview" />
            {this.getBodyComponent()}
          </div>
        </div>
      );
    }
  }
}

export default connect(mapStateToProps)(Homepage);
