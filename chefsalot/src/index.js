import React from 'react';
import ReactDOM from 'react-dom';
import Homepage from './Components/Homepage';
import registerServiceWorker from './registerServiceWorker';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Provider } from 'react-redux';
import rootReducer from 'reducers';
import { createStore } from 'redux';
import Cookies from 'universal-cookie';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import PrivateRoute from 'Components/GenericComponents/PrivateRoute';
import LoginPage from 'Components/Authentication/LoginPage';

var INITIAL_STATE = {
  token: '',
  measurementChoices: []
};

// TODO validate this in a better way... 
function tokenIsValid(token) {
  return token != '';
}

function loadInitialState() {
  var cookies = new Cookies();
  var token = cookies.get('token');
  if (tokenIsValid(token)) {
    INITIAL_STATE.token = token;
  }
  axios({
      method: 'get',
      url: 'http://localhost:8000/measurements/',
  }).then(response => {
    const measurementsJSON = JSON.parse(response.data);
    INITIAL_STATE.measurementChoices = 
      measurementsJSON.measurements.map(measurement => { return {value: measurement[0], label: measurement[1]}});
      console.log(INITIAL_STATE.measurementChoices);
  });
}

loadInitialState();


const store = createStore(rootReducer, INITIAL_STATE);

class App extends React.Component {
  render() {
    console.log("Loading in app");
    return (
      <Router>
        <div>
          <CssBaseline />
          <Switch>
            <Route path='/login' component={LoginPage} />
            <PrivateRoute path='/' component={Homepage} />
          </Switch>
        </div>
      </Router>
    );
  }
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('root'));
registerServiceWorker();
