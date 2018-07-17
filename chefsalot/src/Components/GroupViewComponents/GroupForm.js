import React, { Component } from 'react';
import CreateGroupInput from 'Components/GroupViewComponents/CreateGroupInput';
import AddOrCancelGroupButton from 'Components/GroupViewComponents/AddOrCancelGroupButton';
import CreateGroupButton from 'Components/GroupViewComponents/CreateGroupButton';

class GroupForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            group_name: '',
            show_form: false,
            validation_error: '',
            success_message: '',
        }
        this.handleAddOrCancelGroupClick = this.handleAddOrCancelGroupClick.bind(this);
        this.handleGroupNameChange = this.handleGroupNameChange.bind(this);
        this.handleGroupCreateSuccess = this.handleGroupCreateSuccess.bind(this);
        this.handleGroupCreateError = this.handleGroupCreateError.bind(this);
    }

    handleAddOrCancelGroupClick() {
        this.setState({show_form: !this.state.show_form, success_message: '', validation_error: ''});
    }
    
    handleGroupNameChange(group_name) {
        this.setState({group_name:group_name});
    }

    handleGroupCreateSuccess(response) {
        this.setState({show_form: !this.state.show_form, success_message: response.data, validation_error: ''});
    }
    
    handleGroupCreateError(error) {
        error && error.response.status == 400 && this.setState({validation_error:error.response.data});
    }

    render() {
        return (
            <div>
                {this.state.show_form ? 
                    <div>
                        <form>
                            <CreateGroupInput  handleGroupNameChange={this.handleGroupNameChange}/>
                        </form>
                        {this.state.validation_error}
                        <CreateGroupButton group_name={this.state.group_name} 
                                           token={this.props.token} 
                                           handleGroupCreateSuccess={this.handleGroupCreateSuccess}
                                           handleGroupCreateError={this.handleGroupCreateError} />
                    </div>
                    : ''}
                <AddOrCancelGroupButton handleAddOrCancelGroupClick={this.handleAddOrCancelGroupClick} show_form={this.state.show_form} />
                {this.state.success_message}
            </div>
        );
    }
}

export default GroupForm;