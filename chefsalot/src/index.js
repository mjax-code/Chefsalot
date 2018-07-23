import React from 'react';
import ReactDOM from 'react-dom';
import Homepage from './Components/Homepage';
import registerServiceWorker from './registerServiceWorker';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Provider } from 'react-redux';
import rootReducer from 'reducers';
import { createStore } from 'redux';
import Cookies from 'universal-cookie';

var INITIAL_STATE = {
    token: ''
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
}
loadInitialState();


const store = createStore(rootReducer, INITIAL_STATE);

class App extends React.Component {
  render() {
    return (
      <div>
        <CssBaseline />
        <Homepage />
      </div>
    );
  }
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('root'));
registerServiceWorker();
