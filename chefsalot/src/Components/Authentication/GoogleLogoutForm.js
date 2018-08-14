import React from 'react';
import { removeToken } from 'actions';
import { connect } from 'react-redux';
import WrappedButton from '../GenericComponents/WrappedButton';
import Cookies from 'universal-cookie';
import { withRouter } from 'react-router-dom';

const mapDispatchToProps = dispatch => {
  return {
    onAuthLogout: () => {
        console.log("Removing token from redux");
        dispatch(removeToken());
    }
  }
}

const GoogleLogoutForm = (props) => {
    return ( 
        <WrappedButton className="google-logout-button" value ='Logout' 
                        handleClick={ () => {
                                const cookies = new Cookies();
                                cookies.remove('token');
                                props.onAuthLogout();
                                props.history.push("/");
                            }
                        } />
    );
}

export default withRouter(connect((state) => ({}), mapDispatchToProps)(GoogleLogoutForm));