import React from 'react';
import SimpleSelect from 'Components/GenericComponents/SimpleSelect';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {
    measurementChoices: state.measurementChoices
  }
}

//TODO Make sure user input is correct format 
const IngredientList = props => {
  console.log("Loading ingredient list");
  console.log(props.measurementChoices);
  return (
    <List>
      {props.state.ingredients.map((ingredient, i) => (
        <ListItem
          key={i}
        >
          <ListItemText primary={`${ingredient.quantity} ${ingredient.measurement} ${ingredient.ingredient}`} />
          <Button
            onClick={props.editIngredient}
          >
            <EditIcon />
          </Button>
          <Button
            onClick={props.deleteIngredient(i)}
          >
            <DeleteIcon />
          </Button>
        </ListItem>
      ))}
      {props.state.addingIngredient ?
        <ListItem>
          <TextField
            label='Quantity'
            onChange={props.handleFormChange('ingredientAmount')}
            value={props.state.ingredientAmount}
          />
          {/* <TextField
            label='Measurement'
            onChange={props.handleFormChange('measurement')}
            value={props.state.measurement}
          /> */}
          <SimpleSelect 
            choices = {props.measurementChoices}
            onChange = {props.handleFormChange('measurement')}
            value={props.state.measurement}
            domId = "measurement_select"
            label = "Measurement"
          />
          <TextField
            label='Ingredient'
            onChange={props.handleFormChange('ingredient')}
            value={props.state.ingredient}
          />
          <Button
            onClick={props.addIngredient}
          >
            <AddIcon />
          </Button>
        </ListItem> :
        <ListItem>
          <Button
            variant='contained'
            color='primary'
            onClick={props.toggleAddIngredientButton}
          >
            Add Ingredient
          </Button>
        </ListItem>
      }
    </List>

  );
};

export default connect(mapStateToProps)(IngredientList);