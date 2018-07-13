import React, { Component } from 'react';
import Button from '@material-ui/core/Button';

class NavButton extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.onNav(this.props.value);
    }

    render() {
        return (
            <Button onClick={this.handleClick}>{this.props.text}</Button>
        );
    }
}

export default NavButton;