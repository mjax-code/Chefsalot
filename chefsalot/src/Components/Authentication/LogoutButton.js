import React from 'react';
import Button from '@material-ui/core/Button'
import { removeToken } from 'actions';
import { connect } from 'react-redux';
import Cookies from 'universal-cookie';

const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => {
      dispatch(removeToken());
    }
  }
}

const LogoutButton = ({onLogout}) =>  {
  var handleLogout = () => {
    onLogout();
    var cookies = new Cookies();
    cookies.remove("token");
  }
  return (
      <div className="logout-button">
        <Button variant="contained" color="primary" onClick={handleLogout}>
          Logout
        </Button>
      </div>
  )
}

export default connect((state) => {return {}}, mapDispatchToProps)(LogoutButton);