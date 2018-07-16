import React, { Component } from 'react';
import GroupForm from 'Components/GroupViewComponents/GroupForm'

class GroupView extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <span>TODO Add List of groups :)</span>
                <GroupForm token={this.props.token}/>
           </div>
        );
    }
}

export default GroupView;