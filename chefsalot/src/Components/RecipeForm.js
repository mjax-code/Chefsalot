import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add'
import CustomTextAndOnClickButton from './CustomTextAndOnClickButton';
import axios from 'axios';

class RecipeForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            ingredients: [],
            servings: '',
            directions: '',
            cookTime: '',
            ingredient: '',
            ingredientAmount: '',
            addingIngredient: false,
        };

    }
    handleFormChange = stateToChange => event => {
        this.setState({ [stateToChange]: event.target.value });
    }

    toggleAddIngredientButton = () => {
        this.setState({ addingIngredient: !this.state.addingIngredient });
    }

    addIngredient = () => {
        this.setState({ ingredients: this.state.ingredients.concat([{ ingredient: this.state.ingredient, quantity: this.state.ingredientAmount }]) });
        this.setState({ ingredient: '', ingredientAmount: '' })
        this.toggleAddIngredientButton();

    }

    // handleRecipeFormSubmit() {
    //         axios({
    //             method: 'post',
    //             url: 'http://localhost:8000/recipes/',
    //             headers: {'Authorization': 'Token ' + this.props.token},
    //         data: {
    //             user: 20,
    //             ingredients: [
    //                 {
    //                     ingredient: "chicken",
    //                     measurement: "1",
    //                     quantity: "1"
    //                 }
    //             ],
    //             directions: "do it",
    //             cook_time: 10,
    //             servings: 1,
    //             likes: 0,
    //             dislikes: 0,
    //         }
    //       }).then(response => console.log(response)).catch(error => console.log(error.response));
    //   }

    render() {
        return (
            <div>
                {/* <CustomTextAndOnClickButton 
                onSubmit={this.handleIngredientAddSubmit}
                text={'Add Ingedient'} /> */}
                <form>
                    <TextField
                        id='Title'
                        label='Name of Dish'
                        value={this.state.title}
                        onChange={this.handleFormChange('title')}
                        margin='normal'
                    />
                    <div>
                        <TextField
                            id='Servings'
                            label='Serves'
                            value={this.state.servings}
                            onChange={this.handleFormChange('servings')}
                            margin='normal'
                        />
                        <TextField
                            id='Cooktime'
                            label='Cooktime'
                            value={this.state.cookTime}
                            onChange={this.handleFormChange('cooktime')}
                            margin='normal'
                        />
                    </div>
                    <div>
                        <List>
                            {this.state.ingredients.map((ingredient, i) => (
                                <ListItem
                                    key={i}
                                >
                                    {`${ingredient.quantity} ${ingredient.ingredient}`}
                                </ListItem>
                            ))}
                            {this.state.addingIngredient ?
                                <ListItem>
                                    <TextField
                                        label='Quantity'
                                        onChange={this.handleFormChange('ingredientAmount')}
                                        value={this.state.quantity}
                                    />
                                    <TextField
                                        label='Ingredient'
                                        onChange={this.handleFormChange('ingredient')}
                                        value={this.state.ingredient}
                                    />
                                    <Button
                                        onClick={this.addIngredient}
                                    >
                                        <AddIcon />
                                    </Button>
                                </ListItem> :
                                <ListItem>
                                    <Button
                                        onClick={this.toggleAddIngredientButton}
                                    >
                                        Add Ingredient
                                    </Button>
                                </ListItem>
                            }
                        </List>
                    </div>
                </form>
                {/* <label>
                Directions: 
                <textarea onChange={this.handleDirectionsChange} form="recipeForm">
                </textarea>
            </label>
            <button onClick={this.handleRecipeFormSubmit}>
                Add Recipe!
            </button> */}
            </div>
        );
    }
}

export default RecipeForm;