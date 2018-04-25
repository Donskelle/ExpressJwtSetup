import React, { Component } from 'react';

import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom';

import Loadable from 'react-loadable';
import * as jwtDecode from 'jwt-decode';

import { clearStorage, getStorage, setStorage } from './../utils/request.js'
import LoadingComponent from './../components/LoadingComponent';
import Nav from './../components/Nav';

import AsyncHome from './Home/';
import AsyncImpressum from './Impressum/';
import AsyncRegistrieren from './Registrieren/';
import AsyncProfil from './Profil/';
import {AsyncPasswortVergessen, AsyncPasswortReset} from './PasswortVergessen/';


const AsyncUserNav = Loadable({
  loader: () => import("./../components/UserNav"),
  loading: LoadingComponent
});

class App extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);


    let { jwt, user } = getStorage();
    if (jwt) {
      const { exp } = jwtDecode(jwt);
      if (exp < new Date().getTime()) {
        clearStorage();
        jwt = null;
        user = null;
      }
    }

    this.state = { user, jwt };
  }

  handleLogout(event) {
    clearStorage();
    this.setState({ user: null });
  }

  handleLogin(response) {
    const { user, token } = response.data;

    setStorage({ user, jwt: token });
    this.setState({ jwt: token, user });
  }

  render() {
    const isLoggedIn = this.state.user ? true : false;

    return (
      <BrowserRouter>
        <div className='container'>
          <Nav isLoggedIn={isLoggedIn} />
          <AsyncUserNav user={this.state.user} handleLogout={this.handleLogout} handleLogin={this.handleLogin} />
          <Switch>
            <Route exact path='/' component={AsyncHome} />


            <Route exact path='/Registrieren'
              render={
                () => {
                  return this.state.user === null
                    ? <AsyncRegistrieren handleLogin={this.handleLogin} />
                    : <Redirect to='/Profil' />
                }
              } />

            <Route exact path='/PasswortVergessen'
              render={
                () => {
                  return this.state.user === null
                    ? <AsyncPasswortVergessen/>
                    : <Redirect to='/Profil' />
                }
              } />

            <Route exact path='/PasswortVergessen/:token'
              render={
                (props) => {
                  return this.state.user === null
                    ? <AsyncPasswortReset {...props} handleLogin={this.handleLogin} />
                    : <Redirect to='/Profil' />
                }
              } />

            <Route exact path='/Profil'
              render={() => {
                return this.state.user === null
                  ? <Redirect to='/Register' />
                  : <AsyncProfil user={this.state.user} />
              }}
            />

            <Route exact path='/Impressum' component={AsyncImpressum} />
            <Route render={function () {
              return <p>Not Found</p>
            }} />

          </Switch>
        </div>
      </BrowserRouter>
    );
  }


}

export default App;
