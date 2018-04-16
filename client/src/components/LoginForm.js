import React, { Component } from 'react';
import axios from 'axios';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }


  handleSubmit(e) {
    e.preventDefault();
    console.log(e)
    console.log(this.state)


    axios.post('api/users/signin/', this.state)
      .then(function (response) {
        console.log("response");
        console.log(response);
        this.props.handleLogin(response.token)
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <h2>E-Mail Login</h2>
        <form onSubmit={this.handleSubmit}>
          <input name="email" type="text" onChange={this.handleInputChange} />
          <input type="password" name="password" onChange={this.handleInputChange} />
          <button name="Login">Login</button>
        </form>
      </div>
    );
  }
}




export default LoginForm;
