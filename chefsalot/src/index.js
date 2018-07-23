import React from 'react';
import ReactDOM from 'react-dom';
import injectSheet from 'react-jss';
import Homepage from './Components/Homepage';
import styles from './Styles/styles';
import registerServiceWorker from './registerServiceWorker';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Provider } from 'react-redux';
import rootReducer from 'reducers';
import { createStore } from 'redux';

const store = createStore(rootReducer);

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
