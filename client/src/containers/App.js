import React, { Component } from 'react';

import { Route, Switch, BrowserRouter } from 'react-router-dom';
/* eslint-disable import/first */

import Impressum from './Impressum'
import Home from './Home'
import Registrieren from './Registrieren'
import UserNav from './../components/UserNav';
import Nav from './../components/Nav';

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
            <Route exact path='/' component={Home} />
            <Route exact path='/Impressum' component={Impressum} />
            <Route exact path='/Registrieren' component={Registrieren} />
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
