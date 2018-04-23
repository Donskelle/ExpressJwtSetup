import React, { Component } from 'react';
import axios from 'axios';

import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import { Button } from 'material-ui';

/*
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

    axios.post('api/users/signin/', this.state)
      .then(function (response) {
        this.props.handleLogin(response)
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
}*/


class LoginForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      formData: {
        email: '',
        password: '',
      },
      submitted: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { formData } = this.state;
    formData[event.target.name] = event.target.value;
    this.setState({ formData });
  }

  handleSubmit() {
    this.setState({ submitted: true }, () => {
      axios.post('api/users/signin/', this.state.formData)
      .then(function (response) {
        this.props.handleLogin(response)
      })
      .catch(function (error) {
        if(error.response.status == 401) {
          alert("Falscher Logindaten");
        }
        console.log(error);
      })
      .finally(() => {
        this.setState({ submitted: false })
      }) 
    });
  }

  render() {
    const { formData, submitted } = this.state;
    return (
      <ValidatorForm
        ref="form"
        onSubmit={this.handleSubmit}
        debounceTime={500}
      >
        <TextValidator
          label="Email"
          onChange={this.handleChange}
          name="email"
          value={formData.email}
          validators={['required', 'isEmail']}
          errorMessages={['Dieses Feld ist benötigt.', 'Ungültige E-Mail']}
        />
        <br />
        <TextValidator
          label="Password"
          onChange={this.handleChange}
          name="password"
          type="password"
          value={formData.password}
          validators={['required', 'minStringLength:6']}
          errorMessages={['Dieses Feld ist benötigt.', 'Password hat mindestens 6 Buchstaben.']}
        />
        <br />
        <Button
          variant="raised"
          color="primary"
          type="submit"
          disabled={submitted}
        >
          {
            (submitted && 'Lädt')
            || (!submitted && 'Absenden')
          }
        </Button>
      </ValidatorForm>
    );
  }
}


export default LoginForm;
