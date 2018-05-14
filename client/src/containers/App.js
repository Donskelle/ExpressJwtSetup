import React, { Component } from 'react';

import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom';

import Loadable from 'react-loadable';
import { connect } from 'react-redux';


import { clearStorage, getStorage, setStorage } from './../utils/request.js'
import LoadingComponent from './../components/LoadingComponent';
import Nav from './../components/Nav';


import AsyncHome from './Home/';
import AsyncImpressum from './Impressum/';
import AsyncRegistrieren from './Registrieren/';
import AsyncProfil from './Profil/';
import { AsyncPasswortVergessen, AsyncPasswortReset } from './PasswortVergessen/';


const AsyncUserNav = Loadable({
  loader: () => import("./../components/UserNav"),
  loading: LoadingComponent
});


class App extends Component {
   render() {
    return (
      <BrowserRouter>
        <div className='container'>
          <div className='header'>
            <Nav />
            <AsyncUserNav />
          </div>


          <Switch>
            <Route exact path='/' component={AsyncHome} />
            <Route exact path='/Registrieren'
              render={
                () => {
                  return this.props.user.isAuthenticated === false
                    ? <AsyncRegistrieren />
                    : <Redirect to='/Profil' />
                }
              } />

            <Route exact path='/PasswortVergessen'
              render={
                () => {
                  return this.props.user.isAuthenticated === false
                    ? <AsyncPasswortVergessen />
                    : <Redirect to='/Profil' />
                }
              } />

            <Route exact path='/PasswortVergessen/:token'
              render={
                (props) => {
                  return this.props.user.isAuthenticated === false
                    ? <AsyncPasswortReset />
                    : <Redirect to='/Profil' />
                }
              } />

            <Route exact path='/Profil'
              render={() => {
                console.log(this.props)
                return this.props.user.isAuthenticated === false
                  ? <Redirect to='/Registrieren' />
                  : <AsyncProfil user={this.props.user} />
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

export default connect(state => {
  return { user: state.user }
})(App);
