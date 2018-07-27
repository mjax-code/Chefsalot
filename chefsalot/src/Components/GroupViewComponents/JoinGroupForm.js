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
            groups: null,
            selectedGroupOption: null,
            loading: true,
            userGroupsLoaded: false
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

    handleOptionChange = ( optionType ) => ( callback ) => ( selectedOption ) => {
        this.setState({[optionType]: selectedOption });
        if (typeof callback === 'function')
            callback(selectedOption);
    }

    convertUsersToOptions = (users) =>  {
        return users.map(user => ({
                value: user,
                label: user.username
            })
        );
    }

    convertGroupsToOptions = (groups) => {
        return groups.map(group => ({
                value: group,
                label: group.name
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
                        handleUserOptionChange={ this.handleOptionChange('selectedUserOption')((user) => {
                            this.setState({userGroupsLoaded: false, selectedGroupOption: null});
                            axios({
                                method: 'get',
                                headers: {'Authorization': 'Token ' + this.props.token},
                                url: 'http://localhost:8000/groups/?user_id=' + user.value.id
                            }).then(response => 
                                this.setState({groups: response.data})
                            ).then(() => 
                                this.setState({userGroupsLoaded: true}
                            ));
                        }) }
                        selectedUserOption={this.state.selectedUserOption} />
                    {this.state.userGroupsLoaded ? 
                    <GroupSearch 
                        groupOptions={this.convertGroupsToOptions(this.state.groups)}
                        handleGroupOptionChange={this.handleOptionChange('selectedGroupOption')(null)} 
                        selectedGroupOption={ this.state.selectedGroupOption } />
                    : ''}
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