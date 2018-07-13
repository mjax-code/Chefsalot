import React, { Component } from 'react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import Button from '@material-ui/core/Button';

class LoginSignupForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: false
    }
    this.handleEntrySwitch = this.handleEntrySwitch.bind(this);
  }

  handleEntrySwitch() {
    this.setState({login: !this.state.login});
  }


  render() {
    let entryForm;
    let entryText;
    if (this.state.login) {
      entryForm = <LoginForm onAuth={this.props.onAuth} />;
      entryText = "Don't have a user? Sign up here :)"
    } else {
      entryForm = <SignupForm onAuth={this.props.onAuth} />
      entryText = "Already have a user? Log in here :o"
    }
    
    return (
      <div style={{textAlign: 'center', marginTop: '18%'}}>
        {entryForm}
        <div>
          <span>{entryText}</span>
          <Button variant="contained" color="primary" onClick={this.handleEntrySwitch}>
            {this.state.login ? 'Signup' : 'Login'}
          </Button>
        </div>

      </div>
    );
  }
}

export default LoginSignupForm;