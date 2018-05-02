import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';
import { createStore } from 'redux'


import todoApp from './reducers'

const store = createStore(todoApp)


ReactDOM.render(<App store={store}/>, document.getElementById('root'));
registerServiceWorker();
