import React from 'react';
import Button from '@material-ui/core/Button'
import { removeToken } from 'actions';
import { connect } from 'react-redux';

const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => {
      dispatch(removeToken());
    }
  }
}

const LogoutButton = ({onLogout}) =>  (
      <div className="logout-button">
        <Button variant="contained" color="primary" onClick={onLogout}>
          Logout
        </Button>
      </div>
)

export default connect((state) => {return {}}, mapDispatchToProps)(LogoutButton);