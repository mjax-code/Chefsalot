import React, { Component } from 'react';

class IngredientForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ingredient:'',
            measurement:'',
            prepDescriptor:'',
            quantity: '',
        }

        this.handleIngredientChange = this.handleIngredientChange.bind(this);
        this.handleIngredientSubmit = this.handleIngredientSubmit.bind(this);
        this.handleMeasurementChange = this.handleMeasurementChange.bind(this);
        this.handlePrepDescriptionChange = this.handlePrepDescriptionChange.bind(this);
        this.handleQuantityChange = this.handleQuantityChange.bind(this);
      }

      handleIngredientChange(event) {
          this.setState({ingredient: event.target.value});
      }

      handleMeasurementChange(event) {
          this.setState({measurement: event.target.value});
      }

      handlePrepDescriptionChange(event) {
          this.setState({prepDescriptor: event.target.value});
      }

      handleQuantityChange(event) {
          this.setState({quantity: event.target.value});
      }

      handleIngredientSubmit() {
          this.props.onSubmit(this.state.quantity + ' ' +  this.state.measurement
                    + ' ' + this.state.ingredient);
      }

      render() {
          return (
              <div>
                <form>
                    <label>
                        Ingredient:
                        <input onChange={this.handleIngredientChange} type="text" />
                    </label>
                    <label>
                        Measurement:
                        <input onChange={this.handleMeasurementChange} type="text" />
                    </label>
                    <label>
                        Preperation Description:
                        <input onChange={this.handlePrepDescriptionChange} type="text" />
                    </label>
                    <label>
                        Quantity:
                        <input onChange={this.handleQuantityChange} type="text" />
                    </label>
                </form>
                <button onClick={this.handleIngredientSubmit}>
                    Add Ingredient 
                </button>
              </div>
          );
      }
}

export default IngredientForm;