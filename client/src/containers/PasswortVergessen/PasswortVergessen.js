import React, { Component } from 'react';
import axios from 'axios';

import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import { Button } from 'material-ui';

class PasswortVergessen extends Component {

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      submitted: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ email: event.target.value });
  }

  handleSubmit() {
    this.setState({ submitted: true }, () => {
      axios.post('api/v1/users/forgot/', { email: this.state.email })
        .then((response) => {
          console.log(response);
          alert(response.data.message);
          this.setState({
            email: '',
            submitted: false,
          });
        })
        .catch((error) => {
          console.log(error);
          this.setState({ submitted: false });
          if (error.response.status === 400) {
            alert(error.response.data.error);
          }
        })
    });
  }

  render() {
    const { email, submitted } = this.state;
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
          value={email}
          validators={['required', 'isEmail']}
          errorMessages={['Dieses Feld ist benötigt.', 'Ungültige E-Mail']}
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


export default PasswortVergessen;
