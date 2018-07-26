import React from 'react';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

//TODO Make sure user input is correct format 
const IngredientList = props => {
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
          <TextField
            label='Measurement'
            onChange={props.handleFormChange('measurement')}
            value={props.state.measurement}
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

export default IngredientList;