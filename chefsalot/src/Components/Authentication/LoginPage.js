import React, { Component } from 'react';
import pig from 'static/pig4.png';
import { withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import LoginSignupForm from 'Components/Authentication/LoginSignupForm';
import GoogleLoginForm from 'Components/Authentication/GoogleLoginForm';
import Grid from '@material-ui/core/Grid';

const mapStateToProps = state => {
  return {
    auth_token: state.token
  }
}

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect_to_sender: false,
    };
   }
    
  render() {
    const { from } = this.props.location.state || { from: { pathname: "/" } };
    console.log("Entering login page");

    const loggedIn = this.props.auth_token !== undefined && this.props.auth_token !== '';
    if (loggedIn)
        console.log("This user is logged in");
    else {
        console.log("This user is not logged in");
    }
    if (loggedIn) {
        console.log("User logged in. Leaving login page")
        return <Redirect to={from} />;
    }
    return (
        <div className="chefsalot-login-page">
          <div className="login-form-container">
            <Grid item xs={12}>
              <img className="pigLogo" src={pig} alt="pig logo" />
              <h1 className="textLogo"> Chefsalot </h1>
            </Grid>
            <LoginSignupForm />
            <GoogleLoginForm />
          </div>
        </div>
      );
    }
}

export default withRouter(connect(mapStateToProps)(LoginPage));