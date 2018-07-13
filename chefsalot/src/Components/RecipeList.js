import React, { Component } from 'react';
import {} from '@material-ui/core';
import axios from 'axios';


class RecipeList extends Component {
  constructor(props) { 
    super(props);
    this.state = {
        recipes: [],
    }
  };

  componentDidMount() {
    axios({
        method: 'get',
        url: 'http://localhost:8000/recipes/',
        headers: {'Authorization': 'Token ' + this.props.token},
      }).then(response => this.setState({recipes:response.data}));
    //   .catch(error => console.log(error.response));
  }

  render () {
      return (
          <div> 
              <RecipeListDisplay recipes={this.state.recipes} />
          </div>
      );
  }
}

function RecipeListDisplay(props) {
    if (props.recipes.length == 0) {
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