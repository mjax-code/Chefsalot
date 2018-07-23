import React, { Component } from 'react';
import Topbar from 'Components/Topbar';
import RecipeForm from 'Components/RecipeForm';
import pig from 'static/pig4.png'
import Grid from '@material-ui/core/Grid';
import LoginSignupForm from 'Components/Authentication/LoginSignupForm';
import LogoutButton from 'Components/Authentication/LogoutButton';
import RecipeList from 'Components/UserViewComponents/RecipeList';
import UserView from 'Components/UserViewComponents/UserView';
import GroupView from 'Components/GroupViewComponents/GroupView';
import { addToken, removeToken } from 'actions';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {
    auth_token: state.token
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuthSuccess: token => {
      dispatch(addToken(token));
    },
    onLogout: () => {
      dispatch(removeToken());
    }
  }
}

class Homepage extends Component {
  constructor(props) {
      super(props);
      this.state = {
        auth_token: '',
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
        <div>
          <Grid item xs={12}>
            <img className="pigLogo" src={pig} alt="pig logo"/>
          </Grid>
            <LoginSignupForm onAuth={this.props.onAuthSuccess}/>
        </div> 
      );
    } else {
      return(
        <div className="chefsalot-home-page">
          <div className="home-page-container">
            {/* TODO have a better way of handling these different body components ... enum? */}
            <LogoutButton onClick={this.props.onLogout} />
            <Topbar onNav={this.handleNav} userview="userview" groupview="groupview" recipeview="recipeview" />
            {this.getBodyComponent()}
          </div>
        </div>
      );
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);
