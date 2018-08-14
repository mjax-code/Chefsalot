import React, { Component } from 'react';
import RecipeForm from 'Components/RecipeForm';
import GoogleLogoutForm from 'Components/Authentication/GoogleLogoutForm';
import RecipeList from 'Components/UserViewComponents/RecipeList';
import UserView from 'Components/UserViewComponents/UserView';
import GroupView from 'Components/GroupViewComponents/GroupView';
import { connect } from 'react-redux';
import { Link, Route, Switch } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';

const mapStateToProps = state => {
  return {
    auth_token: state.token
  }
}

class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipe_list: null
    };

    this.handleRecipeLoad = this.handleRecipeLoad.bind(this);
  }

  handleRecipeLoad(recipe_list) {
    this.setState({ recipe_list: recipe_list });
  }

  render() {
    return (
        <div className="chefsalot-home-page">
          <div className="home-page-container">
            <GoogleLogoutForm />
            <List>
              <ListItem>
               <Button><Link to="/recipes">User</Link></Button> 
              </ListItem>
              <ListItem>
               <Button><Link to="/groups">Groups</Link></Button> 
              </ListItem>
              <ListItem>
               <Button><Link to="/add_recipe">Add Recipe</Link></Button> 
              </ListItem>
            </List>
            <Switch>
              <Route path="/recipes"
                     render={(props) => <UserView {...props} recipe_list_view={<RecipeList onRecipeLoad={this.handleRecipeLoad}
                                          recipe_list={this.state.recipe_list}
                                          token={this.props.auth_token} />} />}
                      />
              <Route path="/groups" 
                     render= {(props) => <GroupView {...props} token={this.props.auth_token} /> } 
                      />
              <Route path="/add_recipe" 
                     render= {(props) => <RecipeForm {...props} token={this.props.auth_token} /> } 
                      />
            </Switch>
          </div>
        </div>
      );
   }
}

export default connect(mapStateToProps)(Homepage);
