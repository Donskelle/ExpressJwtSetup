import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';


import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import { Button } from 'material-ui';

import { resetPasswort } from '../../actions/authActions'


import config from './../../config';

class PasswortReset extends Component {

    constructor(props) {
        super(props);

        this.state = {
            formData: {
                password: '',
                repeatPassword: '',
                token: props.match.params.token,
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

    componentWillMount() {
        ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
            if (value !== this.state.formData.password) {
                return false;
            }
            return true;
        });
    }

    handleSubmit() {
        let { repeatPassword, ...formDataClear } = this.state.formData;


        this.setState({ submitted: true },
            () => {
                this.props.resetPasswort(formDataClear)
                    .then(
                        data => alert("Passwort erfolgreich zurückgesetzt."),
                        err => {
                            if (err.response && err.response.data) {
                                if (err.response.data.error)
                                    alert(err.response.data.error);
                            }
                        }
                    )
                /*axios.post(`${config.URL}api/v1/users/forgot/reset`, formDataClear)
                    .then((response) => {
                        this.setState({ submitted: false });
                        this.props.handleLogin(response);
                    })
                    .catch((error) => {
                        this.setState({ submitted: false });
                        if (error.response.status === 400) {
                            alert(error);   
                        }
                    })*/
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
                    label="Password"
                    onChange={this.handleChange}
                    name="password"
                    type="password"
                    validators={['required', 'minStringLength:6']}
                    errorMessages={['Dieses Feld ist benötigt.', 'Password hat mindestens 6 Buchstaben.']}
                    value={formData.password}
                />
                <TextValidator
                    label="Passwort wiederholen"
                    onChange={this.handleChange}
                    name="repeatPassword"
                    type="password"
                    validators={['required', 'isPasswordMatch']}
                    errorMessages={['Dieses Feld ist benötigt.', 'Passwörter unterschiedlich']}
                    value={formData.repeatPassword}
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
const mapDispatchToProps = {
    resetPasswort,
}

export default connect(null, mapDispatchToProps)(withRouter(PasswortReset));
