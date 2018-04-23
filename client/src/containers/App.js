import React, { Component } from 'react';

import { Route, Switch, BrowserRouter } from 'react-router-dom';

import Loadable from 'react-loadable';
import * as jwtDecode from 'jwt-decode';

import { clearStorage, getStorage, setStorage } from './../utils/request.js'
import LoadingComponent from './../components/LoadingComponent';
import Nav from './../components/Nav';

import ReactJoiValidations from 'react-joi-validation';
import Joi from 'joi-browser';
ReactJoiValidations.setJoi(Joi);

const AsyncUserNav = Loadable({
  loader: () => import("./../components/UserNav"),
  loading: LoadingComponent
});


const AsyncHome = Loadable({
  loader: () => import("./Home"),
  loading: LoadingComponent
});

const AsyncImpressum = Loadable({
  loader: () => import("./Impressum"),
  loading: LoadingComponent
});

const AsyncRegistrieren = Loadable({
  loader: () => import("./Registrieren"),
  loading: LoadingComponent
});

const AsyncProfil = Loadable({
  loader: () => import("./Profil"),
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
            <Route exact path='/Impressum' component={AsyncImpressum} />
            <Route exact path='/Registrieren' render={() => <AsyncRegistrieren handleLogin={this.handleLogin} />} />
            <Route exact path='/Profil' render={() => <AsyncProfil user={this.state.user} />} />
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
