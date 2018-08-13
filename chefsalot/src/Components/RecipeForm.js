import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IngredientList from './IngredientList';
import { withStyles } from '@material-ui/core/styles'
import CustomTextAndOnClickButton from './CustomTextAndOnClickButton';
import axios from 'axios';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },

    paper: {
        padding: 16,//theme.spacing.unit * 2,
        textAlign: 'left',
        color: theme.palette.text.secondary,
    }
})

const StyledPaper = withStyles(styles)(({ classes, children }) => (
    <Paper className={classes.paper}>{children}</Paper>
))

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
            measurement: '',
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
        this.setState({ ingredients: this.state.ingredients.concat([{ ingredient: this.state.ingredient, measurement: this.state.measurement, quantity: this.state.ingredientAmount }]) });
        this.setState({ ingredient: '', measurement: '', ingredientAmount: '' })
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

    //TODO Make sure user input is correct format 
    // handleRecipeSubmit = () => {
    //     axios({
    //         method: 'post',
    //         url: 'http://localhost:8000/recipes/',
    //         headers: { 'Authorization': 'Token ' + this.props.token },
    //         data: {
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
    //     }).then(response => console.log(response)).catch(error => console.log(error.response));
    // }
    handleRecipeSubmit = () => {
        axios({
            method: 'post',
            url: 'http://localhost:8000/recipes/',
            headers: { 'Authorization': 'Token ' + this.props.token },
            data: {
                ingredients: this.state.ingredients, 
                directions: this.state.directions,
                cook_time: this.state.cookTime,
                servings: this.state.servings,
                name: this.state.title,
                likes: 0,
                dislikes: 0,
            }
        }).then(response => {
            console.log(response);
            this.setState({
                title: '',
                ingredients: [],
                servings: '',
                directions: '',
                cookTime: '',
                ingredient: '',
                ingredientAmount: '',
                measurement: '',
                addingIngredient: false,
            });
        }).catch(error => console.log(error.response));
    }

    render() {
        return (
            <div className={this.props.classes.root}>
                <StyledPaper>
                    <Grid container spacing={8}>
                        <Grid item xs={12}>
                            <TextField
                                id='Title'
                                label='Name of Dish'
                                value={this.state.title}
                                onChange={this.handleFormChange('title')}
                                margin='normal'
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                id='Servings'
                                label='Serves'
                                value={this.state.servings}
                                onChange={this.handleFormChange('servings')}
                                margin='normal'
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                id='Cooktime'
                                label='Cooktime'
                                value={this.state.cookTime}
                                onChange={this.handleFormChange('cookTime')}
                                margin='normal'
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <StyledPaper >
                                <IngredientList
                                    state={this.state}
                                    toggleAddIngredientButton={this.toggleAddIngredientButton}
                                    addIngredient={this.addIngredient}
                                    deleteIngredient={this.deleteIngredient}
                                    handleFormChange={this.handleFormChange}
                                    editIngredient={this.editIngredient}
                                />
                            </StyledPaper>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id='Directions'
                                label='Directions'
                                value={this.state.Directions}
                                multiline
                                rowsMax='8'
                                fullWidth
                                onChange={this.handleFormChange('directions')}
                                margin='normal'
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Button
                                variant='contained'
                                color='primary'
                                onClick={this.handleRecipeSubmit}
                            >
                                Add Recipe
                </Button>
                        </Grid>
                    </Grid>
                </StyledPaper>
            </div>
        );
    }
}

export default withStyles(styles)(RecipeForm);