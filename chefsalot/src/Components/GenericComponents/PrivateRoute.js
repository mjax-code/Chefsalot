import React from 'react';
import { Route, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';


const mapStateToProps = state => {
  return {
    auth_token: state.token
  }
}

const PrivateRoute = ({ component: Component, auth_token: auth_token, ...rest }) => (
    <Route
      {...rest}
      render={props => {
        console.log("Loading private route");
        console.log(auth_token)
        const loggedIn = auth_token !== undefined && auth_token !== ''
        return loggedIn ? (
          <Component {...props} />
        ) : (
            <Redirect
                to={{
                pathname: "/login",
                state: { from: props.location }
                }}
            />
        )
      }
    }
    />
  );


export default withRouter(connect(mapStateToProps)(PrivateRoute));