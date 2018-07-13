import React, { Component } from 'react';

class CustomTextAndOnClickButton extends Component {
    render() {
        return (
            <button onClick={this.props.onSubmit}>
               {this.props.text} 
            </button>
        );
    }
}

export default CustomTextAndOnClickButton;