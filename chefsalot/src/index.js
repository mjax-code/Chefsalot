import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Homepage from './Components/Homepage';
import registerServiceWorker from './registerServiceWorker';
import CssBaseline from '@material-ui/core/CssBaseline';

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



ReactDOM.render(<App/>, document.getElementById('root'));
registerServiceWorker();
