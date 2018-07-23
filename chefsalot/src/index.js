import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Homepage from './Components/Homepage';
import registerServiceWorker from './registerServiceWorker';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Provider } from 'react-redux';
import reducer from 'reducers';
import { createStore } from 'redux';

const store = createStore(reducer);

class App extends React.Component {
	render() {
		return(
			<div>
      			<CssBaseline />
      			<Homepage />
      		</div>
		);
	}
}



ReactDOM.render(
    <Provider>
        <App />
    </Provider>, document.getElementById('root'));
registerServiceWorker();
