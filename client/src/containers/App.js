import React, { Component } from 'react';

import { Route, Switch, BrowserRouter } from 'react-router-dom';

import Loadable from 'react-loadable';

/* eslint-disable import/first */
import LoadingComponent from './LoadingComponent';
import UserNav from './../components/UserNav';
import Nav from './../components/Nav';

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


    let jwt = null;
    let user = null;
    if (localStorage.getItem('jwt')) {
      jwt = localStorage.getItem('jwt');
    }
    if (localStorage.getItem('user')) {
      try {
        user = JSON.parse(localStorage.getItem('user'));
      } catch (error) {
      }
    }

    this.state = { user, jwt };
  }

  handleLogout() {
    

    localStorage.removeItem('jwt')
    this.setState({ user: null });
  }

  handleLogin(response) {
    console.log(response.data)
    localStorage.setItem('jwt', response.data.jwt);
    localStorage.setItem('user', JSON.stringify(response.data.user));

    this.setState({ jwt: response.data.jwt, user: response.data.user });
    console.log(this.state);
  }

  render() {
    const isLoggedIn = this.state.user ? true : false;

    return (
      <BrowserRouter>
        <div className='container'>
          <Nav isLoggedIn={isLoggedIn}/>
          <UserNav user={this.state.user} handleLogout={this.handleLogout} handleLogin={this.handleLogin} />
          <Switch>
            <Route exact path='/' component={AsyncHome} />
            <Route exact path='/Impressum' component={AsyncImpressum} />
            <Route exact path='/Registrieren' component={AsyncRegistrieren} />
            <Route exact path='/Profil' render={()=><AsyncProfil user={this.state.user}/>}  />
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
