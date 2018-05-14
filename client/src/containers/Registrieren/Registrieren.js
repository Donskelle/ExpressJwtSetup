import React, { Component } from 'react';

import { TextValidator, ValidatorForm, SelectValidator } from 'react-material-ui-form-validator';
import { Button } from 'material-ui';
import { connect } from 'react-redux';


import { withRouter } from 'react-router-dom';
import { userSignupRequest } from '../../actions/signupActions'



import './registrieren.css';

class Registrieren extends Component {
    constructor(props) {
        super(props);


        this.state = {
            formData: {
                first_name: 'Demo',
                last_name: 'Daten',
                email: '',
                gender: 'Herr',
                password: '123456',
                repeatPassword: '123456',
                birth_year: '1990',
            },
            submited: false,

        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillMount() {
        ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
            if (value !== this.state.formData.password) {
                return false;
            }
            return true;
        });
    }

    handleInputChange(event) {
        const { formData } = this.state;
        formData[event.target.name] = event.target.value;
        this.setState({ formData });
    }


    handleSubmit(e) {
        e.preventDefault();
        this.setState({ submited: true });

        let { repeatPassword, birth_year, ...formDataClear } = this.state.formData;

        formDataClear.birth_year = parseInt(birth_year);


        this.props.userSignupRequest(formDataClear)
            .then(
                (data) => {
                    console.log(data);
                    this.props.history.push("/")
                },
                (err) => {
                    if (err.response && err.response.data) {
                        if (err.response.data.error)
                            alert(err.response.data.error);
                    }
                }
            )

        /*axios.post(config.URL + 'api/v1/users/', formDataClear, { headers: { 'Cache-Control': 'no-cache' } })
            .then((response) => {
                this.setState({ submited: false });
                
                this.props.handleLogin(response);
            })
            .catch((error) => {
                this.setState({ submited: false });

                if (error.response.data && error.response.data.error)
                    alert(error.response.data.error);
            })*/
    }

    render() {
        const { formData, submitted } = this.state;
        const possibleYears = [];
        const currentYear = new Date().getFullYear();
        for (let index = 0; index < 100; index++) {
            let year = currentYear - 17 - index;
            possibleYears.push(year);
        }


        return (
            <ValidatorForm
                onSubmit={this.handleSubmit}
                ref="form"
                debounceTime={500}
            >
                <h2>Erstelle neuen Nutzer</h2>
                <SelectValidator
                    name="gender"
                    label="Anrede"
                    size="1"
                    onChange={this.handleInputChange}
                    value={formData.gender}
                    validators={['required']}
                    errorMessages={['Dieses Feld ist benötigt.']}
                >
                    <option value="Frau">Frau</option>
                    <option value="Herr">Herr</option>
                </SelectValidator>
                <TextValidator
                    label="Email"
                    onChange={this.handleInputChange}
                    name="email"
                    validators={['required', 'isEmail']}
                    errorMessages={['Dieses Feld ist benötigt.', 'Ungültige E-Mail']}
                    value={formData.email}
                />
                <TextValidator
                    label="Passwort"
                    onChange={this.handleInputChange}
                    name="password"
                    type="password"
                    validators={['required', 'minStringLength:6']}
                    errorMessages={['Dieses Feld ist benötigt.', 'Password hat mindestens 6 Buchstaben.']}
                    value={formData.password}
                />
                <TextValidator
                    label="Passwort wiederholen"
                    onChange={this.handleInputChange}
                    name="repeatPassword"
                    type="password"
                    validators={['isPasswordMatch', 'required']}
                    errorMessages={['Passwörter unterschiedlich', 'Dieses Feld ist benötigt.']}
                    value={formData.repeatPassword}
                />
                <TextValidator
                    label="Vorname"
                    onChange={this.handleInputChange}
                    name="first_name"
                    validators={['required', 'minStringLength:2']}
                    errorMessages={['Dieses Feld ist benötigt.', 'Vorname hat mindestens zwei Buchstaben.']}
                    value={formData.first_name}
                />
                <TextValidator
                    label="Nachname"
                    onChange={this.handleInputChange}
                    name="last_name"
                    validators={['required', 'minStringLength:2']}
                    errorMessages={['Dieses Feld ist benötigt.', 'Nachname hat mindestens zwei Buchstaben.']}
                    value={formData.last_name}
                />
                <SelectValidator
                    name="birth_year"
                    size="1"
                    label="Geburtsjahr"
                    onChange={this.handleInputChange}
                    value={formData.birth_year}
                    validators={['required']}
                    errorMessages={['Dieses Feld ist benötigt.']}
                >
                    {possibleYears.map((ele) => {
                        return <option key={ele.toString()} value={ele.toString()}>{ele}</option>
                    })}
                </SelectValidator>


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


function mapStateToProps(state) {
    console.log("mapState", state);
    return { user: state.user };
}

const mapDispatchToProps = {
    userSignupRequest,
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Registrieren));
