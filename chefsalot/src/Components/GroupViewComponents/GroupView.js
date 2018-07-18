import React, { Component } from 'react';
import GroupForm from 'Components/GroupViewComponents/GroupForm'
import GroupList from 'Components/GroupViewComponents/GroupList'

class GroupView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            groups: []
        }

        this.handleGroupsLoad = this.handleGroupsLoad.bind(this);
        this.handleGroupsAdd = this.handleGroupsAdd.bind(this);
    }

    handleGroupsLoad(groups) {
        this.setState({groups:groups});
    }

    handleGroupsAdd(group) {
        this.setState({groups: [...this.state.groups, {name:group}]});
    }

    render() {
        return (
            <div className="group-view">
                <GroupList group_list={this.state.groups} handleGroupsLoad={this.handleGroupsLoad} 
                           token={this.props.token}/>
                <GroupForm token={this.props.token} handleGroupsAdd={this.handleGroupsAdd} />
           </div>
        );
    }
}

export default GroupView;