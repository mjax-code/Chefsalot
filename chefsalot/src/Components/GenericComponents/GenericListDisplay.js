import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

function GenericListDisplay(props) {
    const items = props.items.map((item) => <ListItem>
                                                <ListItemText primary = {props.getValue(item)}></ListItemText>
                                            </ListItem>);
    return (
        <List>
            {items}
        </List>
    );
}

export default GenericListDisplay;