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


class App extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.state = { isLoggedIn: false };
  }

  handleLogout() {
    localStorage.removeItem('jwt')

    this.setState({ isLoggedIn: false });
  }

  handleLogin(jwt) {
    localStorage.setItem('jwt', jwt);

    this.setState({ isLoggedIn: true, jwt });
  }

  render() {
    const isLoggedIn = this.state.isLoggedIn;

    return (
      <BrowserRouter>
        <div className='container'>
          <Nav />
          <UserNav />
          <Switch>
            <Route exact path='/' component={AsyncHome} />
            <Route exact path='/Impressum' component={AsyncImpressum} />
            <Route exact path='/Registrieren' component={AsyncRegistrieren} />
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
