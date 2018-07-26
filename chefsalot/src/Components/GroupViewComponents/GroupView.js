import React, { Component } from 'react';
import GroupForm from 'Components/GroupViewComponents/GroupForm'
import GroupList from 'Components/GroupViewComponents/GroupList'
import JoinGroupForm from 'Components/GroupViewComponents/JoinGroupForm'
import WrappedButton from 'Components/GenericComponents/WrappedButton'

class GroupView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            groups: [],
            showJoinGroup: false
        }

        this.handleGroupsLoad = this.handleGroupsLoad.bind(this);
        this.handleGroupsAdd = this.handleGroupsAdd.bind(this);
    }

    handleJoinGroupButtonClick = () => {this.setState({showJoinGroup: !this.state.showJoinGroup})}

    handleGroupsLoad(groups) {
        this.setState({groups:groups});
    }

    handleGroupsAdd(group) {
        this.setState({groups: [...this.state.groups, {name:group}]});
    }

    render() {
        let groupContent;
        if (this.state.showJoinGroup) {
            groupContent = <JoinGroupForm handleJoinGroupButtonClick={this.handleJoinGroupButtonClick}
                                          token={this.props.token} />;
        } else {
            groupContent = <div>
                <GroupList group_list={this.state.groups} handleGroupsLoad={this.handleGroupsLoad} 
                           token={this.props.token}/>
                <GroupForm token={this.props.token} handleGroupsAdd={this.handleGroupsAdd} /> 
            </div>
        }
        return (
            <div className="group-view">
                <WrappedButton className="join-group-button" 
                    handleClick={this.handleJoinGroupButtonClick} value={this.state.showJoinGroup ? 'Cancel' : 'Join Group'} />
                {groupContent}
           </div>
        );
    }
}

export default GroupView;