import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Input } from '@material-ui/core';
import IngredientAddForm from './IngredientAddForm';
import IngredientForm from './IngredientForm';

class RecipeForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
        ingredients: [],
        submittedIngredients: [],

        servings: '',
        directions: '',
        cookTime: '',
        recipe: '',
    };

    this.handleIngredientSubmit =  this.handleIngredientSubmit.bind(this);
    this.handleIngredientAddSubmit =  this.handleIngredientAddSubmit.bind(this);
    this.handleServingsChange = this.handleServingsChange.bind(this);
    this.handleCookTimeChange = this.handleCookTimeChange.bind(this);
    this.handleDirectionsChange = this.handleDirectionsChange.bind(this);
    this.handleRecipeFormSubmit = this.handleRecipeFormSubmit.bind(this);
  }

  handleIngredientAddSubmit() {
      this.setState(
        {ingredients: this.state.ingredients.concat([
            <IngredientForm onSubmit={this.handleIngredientSubmit}/>
        ])})
  }

  handleIngredientSubmit(ingredientSubmit) {
      this.setState({submittedIngredients: this.state.submittedIngredients.concat([ingredientSubmit])});
  }

  handleServingsChange(event) {
      this.setState({servings: event.target.value});
  }

  handleCookTimeChange(event) {
      this.setState({cookTime: event.target.value});
  }

  handleDirectionsChange(event) {
      this.setState({directions: event.target.value});
  }

  handleRecipeFormSubmit() {
      let recipe = this.state.servings + ' ' + this.state.directions + ' ' + this.state.cookTime;
      this.setState({recipe: recipe});
  }

  render() {
    return(
        <div>
            <IngredientAddForm 
                onSubmit={this.handleIngredientAddSubmit} />
            <IngredientList ingredients={this.state.ingredients} />
            <IngredientList ingredients={this.state.submittedIngredients} />
            <form id="recipeForm">
                <label>
                    Servings:
                    <input onChange={this.handleServingsChange} type="text" />
                </label>
                <label>
                    Cook Time:
                    <input onChange={this.handleCookTimeChange} type="text" />
                </label>
            </form>
            <label>
                Directions: 
                <textarea onChange={this.handleDirectionsChange} form="recipeForm">
                </textarea>
            </label>
            <button onClick={this.handleRecipeFormSubmit}>
                Add Recipe!
            </button>
            {this.state.recipe}
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