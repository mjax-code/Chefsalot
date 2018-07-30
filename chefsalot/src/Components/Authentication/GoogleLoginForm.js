import React, { Component } from 'react';
import { GoogleLogin } from 'react-google-login';
import { connect } from 'react-redux';
import { addToken } from 'actions';
import axios from 'axios';
import styles from 'styles/styles';
import config from 'config.json';
import Cookies from 'universal-cookie';

const mapDispatchToProps = dispatch => {
  return {
    onAuthSuccess: token => {
        console.log("Adding token to redux" + token);
        dispatch(addToken(token));
    }
  }
}

class GoogleLoginForm extends Component {
    constructor(props) {
        super(props);
    }

    handleOAuthSucess = (response) => {
        const token = response.data.token;
        this.props.onAuthSuccess(token);
        const cookies = new Cookies();
        cookies.set('token', token);
    }

    googleResponse = (response) => {
        axios({
            method: 'post',
            url: 'http://localhost:8000/social/google-oauth2/',
            data: {
                access_token: response.accessToken,
            }
        }).then(response => this.handleOAuthSucess(response)).catch(error => console.log(error.response));
    };

    onFailure = (error) => {
        console.log(error);
    };

    render() {
        return (
            <div className='google-login-button-container'>
                <GoogleLogin
                    clientId={config.GOOGLE_CLIENT_ID}
                    buttonText="Login with Google"
                    onSuccess={this.googleResponse}
                    onFailure={this.onFailure}
                    style={styles.google_oauth_button}
                />
            </div>
        );
    }
}

export default connect((state) => ({}), mapDispatchToProps)(GoogleLoginForm);
