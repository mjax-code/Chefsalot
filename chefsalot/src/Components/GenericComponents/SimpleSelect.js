import React, { Component } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

var SimpleSelect = (props) => {
    return (
        <FormControl classes={{root: 'simple-select-base'}}> 
            <InputLabel htmlFor={props.domId}>{props.label}</InputLabel>
            <Select
                value={props.value}
                onChange={props.onChange}
                inputProps={{
                name: props.label,
                id: props.domId,
                }}
            >
                <MenuItem value="">
                <em>None</em>
                </MenuItem>
                {props.choices.map(choice => <MenuItem value={choice.value}>{choice.label}</MenuItem>)}
            </Select>
        </FormControl>
    );
}

export default SimpleSelect;