import React, { Component } from 'react';

import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import { Button } from 'material-ui';
import { NavLink } from 'react-router-dom';


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

      this.props.login(this.state.formData)
        .then(
          (res) => console.log(res),
          (err) => {
            alert("Falsche Logindaten");
            this.setState({ submitted: false });
          }
        )
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
          label="Passwort"
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
        <NavLink activeClassName='active' to='/PasswortVergessen'>Passwort Vergessen?</NavLink>
      </ValidatorForm>
    );
  }
}


export default LoginForm;
