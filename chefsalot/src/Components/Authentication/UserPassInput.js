import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Https from '@material-ui/icons/Https'
import Grid from '@material-ui/core/Grid';

class UserPassInput extends Component {
  constructor(props) {
      super(props);

      this.onUsernameChange = this.onUsernameChange.bind(this);
      this.onPasswordChange = this.onPasswordChange.bind(this);
  }

  onUsernameChange(event) {
    this.props.handleUsernameChange(event.target.value);
  }

  onPasswordChange(event) {
    this.props.handlePasswordChange(event.target.value);
  }

  render() {
    return (
      <div className="loginFields"> 
      <FormControl>
        <Grid container alignItems="flex-end">
          <Grid item className="loginIcon">
            <AccountCircle />
          </Grid>
          <Grid item>
            <TextField fullWidth id="input-with-icon-grid" label="Username" onChange={this.onUsernameChange}/>
          </Grid>
        </Grid>
        <Grid container spacing={12} alignItems="flex-end">
          <Grid item className="loginIcon">
            <Https />
          </Grid>
          <Grid item>
            <TextField id="input-with-icon-grid" label="Password" onChange={this.onPasswordChange}/>
          </Grid>
       </Grid>
      </FormControl>
       </div>
    );
  }
}

export default UserPassInput;