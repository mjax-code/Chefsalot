import React, { Component } from 'react';
import {} from '@material-ui/core';
import axios from 'axios';


class RecipeList extends Component {
  constructor(props) { 
    super(props);

    this.componentDidMount = this.componentDidMount.bind(this);
  };

  componentDidMount() {
      if (this.props.recipe_list == null) {
        axios({
            method: 'get',
            url: 'http://localhost:8000/recipes/',
            headers: {'Authorization': 'Token ' + this.props.token},
        }).then(response => this.props.onRecipeLoad(response.data));
      }
//   .catch(error => console.log(error.response));
  }

  render () {
      return (
          <div> 
              <RecipeListDisplay recipes={this.props.recipe_list} />
          </div>
      );
  }
}

function RecipeListDisplay(props) {
    if (props.recipes == null || props.recipes.length == 0) {
        return(<div>No Recipes :( </div>);
    } else {
        const recipes = props.recipes.map((recipe) => <RecipeListItem r={recipe}/>);
        return (
            <ul>
                {recipes}
            </ul>
        );
    }
}

function RecipeListItem (props) {
    return (
        <li>{JSON.stringify(props.r, null, 2)}</li>
    );
}

export default RecipeList;