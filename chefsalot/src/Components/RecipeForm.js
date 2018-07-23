import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import IngredientList from './IngredientList';
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

    deleteIngredient = index => event => {
        // const stateCopy = this.state.ingredients.slice(0);
        // stateCopy.splice(index,1);
        // this.setState({ ingredients: stateCopy });
        this.setState(prevState => ({
            ingredients: prevState.ingredients.filter((el, i) => i !== index)
        }));
    }
    editIngredient = () => {
        console.log('need to add this functionality')
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
                <IngredientList
                    state={this.state}
                    toggleAddIngredientButton={this.toggleAddIngredientButton}
                    addIngredient={this.addIngredient}
                    deleteIngredient={this.deleteIngredient}
                    handleFormChange={this.handleFormChange}
                    editIngredient={this.editIngredient}
                />
                <TextField
                    id='Directoins'
                    label='Directions'
                    value={this.state.Directions}
                    multiline
                    rowsMax='8'
                    fullWidth
                    onChange={this.handleFormChange('directions')}
                    margin='normal'
                />
            </form>
        );
    }
}

export default RecipeForm;