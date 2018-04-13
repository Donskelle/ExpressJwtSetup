import React, { Component } from 'react';
import './App.css';

import LoginForm from './components/LoginForm'

class App extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.state = { isLoggedIn: false };
  }

  handleLogout() {
    if (localStorage) {
      localStorage.removeItem("jwt")
    }

    this.setState({ isLoggedIn: false });
  }

  handleLogin(jwt) {
    if (localStorage) {
      localStorage.jwt = jwt;
    }

    this.setState({ isLoggedIn: true, jwt });
  }

  render() {
    const isLoggedIn = this.state.isLoggedIn;

    const content = isLoggedIn ? (
      <a onClick={this.handleLogout}>Wieder raus</a>
    ) : (
        <LoginForm onLogin={this.handleLogin} />
      );

    return (
      <div>
        {content}
      </div>
    );
  }
}



export default App;
