import React from 'react';
import ReactDOM from 'react-dom';
import injectSheet from 'react-jss';
import Homepage from './Components/Homepage';
import styles from './Styles/styles';
import registerServiceWorker from './registerServiceWorker';

const StyledHomePage = injectSheet(styles)(Homepage);
ReactDOM.render(<StyledHomePage />, document.getElementById('root'));
registerServiceWorker();
