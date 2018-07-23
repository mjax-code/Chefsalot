import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Homepage from './Components/Homepage';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import reducer from 'reducers';
import { createStore } from 'redux';

const store = createStore(reducer);

ReactDOM.render(
    <Provider>
        <Homepage />
    </Provider>, document.getElementById('root'));
registerServiceWorker();
