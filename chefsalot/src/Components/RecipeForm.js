import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Input } from '@material-ui/core';
import CustomTextAndOnClickButton from './CustomTextAndOnClickButton';
import IngredientForm from './IngredientForm';
import axios from 'axios';

class RecipeForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ingredients: [],
            submittedIngredients: [],

            servings: '',
            directions: '',
            cookTime: '',
            recipeResponse: '',
        };

        this.handleIngredientSubmit = this.handleIngredientSubmit.bind(this);
        this.handleIngredientAddSubmit = this.handleIngredientAddSubmit.bind(this);
        this.handleServingsChange = this.handleServingsChange.bind(this);
        this.handleCookTimeChange = this.handleCookTimeChange.bind(this);
        this.handleDirectionsChange = this.handleDirectionsChange.bind(this);
        this.handleRecipeFormSubmit = this.handleRecipeFormSubmit.bind(this);
    }

    handleIngredientAddSubmit() {
        this.setState(
            {
                ingredients: this.state.ingredients.concat([
                    <IngredientForm onSubmit={this.handleIngredientSubmit} />
                ])
            })
    }

    handleIngredientSubmit(ingredientSubmit) {
        this.setState({ submittedIngredients: [...this.state.submittedIngredients, ingredientSubmit] });
    }

    handleServingsChange(event) {
        this.setState({ servings: event.target.value });
    }

    handleCookTimeChange(event) {
        this.setState({ cookTime: event.target.value });
    }

    handleDirectionsChange(event) {
        this.setState({ directions: event.target.value });
    }

    handleRecipeFormSubmit() {
        axios({
            method: 'post',
            url: 'http://localhost:8000/recipes/',
            headers: {'Authorization': 'Token ' + this.props.token},
        data: {
            user: 20,
            ingredients: [
                {
                    ingredient: "chicken",
                    measurement: "1",
                    quantity: "1"
                }
            ],
            directions: "do it",
            cook_time: 10,
            servings: 1,
            likes: 0,
            dislikes: 0,
        }
      }).then(response => console.log(response)).catch(error => console.log(error.response));
  }

  render() {
    return(
        <div>
            <CustomTextAndOnClickButton 
                onSubmit={this.handleIngredientAddSubmit}
                text={'Add Ingedient'} />

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
            {this.state.recipeResponse} 
            {this.props.token}
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