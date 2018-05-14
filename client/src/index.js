import React from 'react';
import { render } from 'react-dom';
import './index.css';
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import jwtDecode from 'jwt-decode';
import { setAuthorizationToken } from './utils/request';
import { initUser } from './actions/authActions';

import rootReducer from './reducers'

const store = createStore(rootReducer, applyMiddleware(thunk));



store.dispatch(initUser());

/*
if (localStorage.jwtToken && localStorage.user) {

    //setAuthorizationToken(localStorage.jwtToken);
    store.dispatch(setCurrentUser(localStorage.user));
}*/

render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById('root'));

registerServiceWorker();
