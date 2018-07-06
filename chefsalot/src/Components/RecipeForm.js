import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Input } from '@material-ui/core';
import IngredientAddForm from './IngredientAddForm';

class RecipeForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
        ingredients: ["hi", "matt"],
    };
  }

  render() {
    var my_ingredients = this.state.ingredients;
    
    return(
        <div>
            <IngredientAddForm 
                onSubmit={() => 
                    this.setState(
                        {ingredients: this.state.ingredients.concat(['hello alex'])}
                    )
            }/>
            <IngredientList ingredients={this.state.ingredients} />
        </div>
    );
  }
}

function IngredientList(props) {
    const ingredients = props.ingredients.map (
        (ingredient) => <IngredientListItem i={ingredient}/>)
    return (
        <ul>
            {ingredients}
        </ul>
    );
}

function IngredientListItem (props) {
    return (
        <li>{props.i}</li>
    );
}

export default RecipeForm;