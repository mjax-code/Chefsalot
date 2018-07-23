import React, { Component } from 'react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import Button from '@material-ui/core/Button';
import { addToken } from 'actions';
import { connect } from 'react-redux';

const mapDispatchToProps = dispatch => {
  return {
    onAuthSuccess: token => {
      dispatch(addToken(token));
    }
  }
}

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
    if (this.state.login) {
      entryForm = <LoginForm onAuth={this.props.onAuthSuccess} />;
    } else {
      entryForm = <SignupForm onAuth={this.props.onAuthSucess} />
    }
    
    return (
      <div style={{textAlign: 'center'}}>
        {entryForm}
        <div>
          <Button color="primary" onClick={this.handleEntrySwitch}>
            {this.state.login ? 'I don\'t have an account' : 'I have an account already'}
          </Button>
        </div>

      </div>
    );
  }
}

export default connect((state)=>{return {}}, mapDispatchToProps)(LoginSignupForm);