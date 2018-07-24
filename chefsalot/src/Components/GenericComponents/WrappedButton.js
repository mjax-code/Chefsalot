import React, { Component } from 'react';
import Button from '@material-ui/core/Button'


function WrappedButton(props) {
    return (
        <div className={props.className}>
            <Button variant="contained" color="primary" onClick={props.handleClick}>
                {props.value}
            </Button>
        </div>
    );
}

export default WrappedButton;