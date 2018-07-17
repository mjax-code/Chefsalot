import React, { Component } from 'react';
import CreateGroupInput from 'Components/GroupViewComponents/CreateGroupInput';
import AddGroupButton from 'Components/GroupViewComponents/AddGroupButton';
import CreateGroupButton from 'Components/GroupViewComponents/CreateGroupButton';

class GroupForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            group_name: '',
            show_form: false,
        }
        this.handleAddGroupClick = this.handleAddGroupClick.bind(this);
        this.handleGroupNameChange = this.handleGroupNameChange.bind(this);
        this.handleGroupCreate = this.handleGroupCreate.bind(this);
    }

    handleAddGroupClick() {
        this.setState({show_form: !this.state.show_form});
    }
    
    handleGroupNameChange(group_name) {
        this.setState({group_name:group_name});
    }


    handleGroupCreate(group_name) {
        return null;
    }

    render() {
        return (
            <div>
                {this.state.show_form ? 
                    <div>
                        <form>
                            <CreateGroupInput  handleGroupNameChange={this.handleGroupNameChange}/>
                        </form>
                        <CreateGroupButton group_name={this.state.group_name} token={this.props.token} handleGroupCreate={this.handleGroupCreate} />
                    </div>
                    : ''}
                <AddGroupButton handleAddGroupClick={this.handleAddGroupClick} show_form={this.state.show_form} />
            </div>
        );
    }
}

export default GroupForm;