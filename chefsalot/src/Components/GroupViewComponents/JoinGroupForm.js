import React, { Component } from 'react';
import Search from 'Components/Search/Search';
import axios from 'axios';
import LoadingSpinner from 'Components/GenericComponents/LoadingSpinner'

class JoinGroupForm extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            users: null,
            selectedUserOption: null,
            loading: true
        }
    }

    componentDidMount() {
      if (this.props.users == null) {
        axios({
            method: 'get',
            url: 'http://localhost:8000/users/'
        }).then(response => 
            this.setState({users: response.data})
        ).then(() => 
            this.setState({loading: false}
        ));
      }
    }

    handleUserOptionChange = ( selectedUserOption ) => {
        this.setState({ selectedUserOption });
    }

    convertUsersToOptions = (users) =>  {
        return users.map(user => ({
                value: user,
                label: user.username
            })
        );
    }

    render() {
        return (
            this.state.loading ? 
                <LoadingSpinner /> 
                : 
                <div>
                    <UserSearch 
                        userOptions={this.convertUsersToOptions(this.state.users)}
                        handleUserOptionChange={this.handleUserOptionChange}
                        selectedUserOption={this.state.selectedUserOption} />
                </div>
        );
    }
}

function UserSearch (props) {
    const { userOptions, handleUserOptionChange, selectedUserOption } = props;

    return (
            <Search 
                options={userOptions}
                handleOptionChange={handleUserOptionChange}
                selectedOption={selectedUserOption} />
    );
}

function GroupSearch (props) {
    const { groupOptions, handleGroupOptionChange, selectedGroupOption } = props;

    return (
            <Search 
                options={groupOptions}
                handleOptionChange={handleGroupOptionChange}
                selectedOption={selectedGroupOption} />
    );
}



export default JoinGroupForm;