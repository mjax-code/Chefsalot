import React, { Component } from 'react';

class IngredientAddForm extends Component {
    render() {
        return (
            <button onClick={this.props.onSubmit}>
                Add Ingredient
            </button>
        );
    }
}

export default IngredientAddForm;