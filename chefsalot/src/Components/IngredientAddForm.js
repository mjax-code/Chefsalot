import React, { Component } from 'react';

class IngredientAddForm extends Component {
    render() {
        return (
            <button onClick={this.props.onSubmit}>
                Add ingredient to recipe
            </button>
        );
    }
}

export default IngredientAddForm;