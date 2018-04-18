import React, { Component } from 'react';
import axios from 'axios';

class Registrieren extends Component {
    constructor(props) {
        super(props);
        this.state = {
            form: {
                first_name: '',
                last_name: '',
                email: '',
                gender: '',
                password: '',
                password_repeat: '',
                birth_year: '',
            },
            submited: false,

        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleInputChangeEmail = this.handleInputChangeEmail.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({ form: { ...this.state.form } });
    }


    // check if email is valid
    handleInputChangeEmail(event) {
        const { name, value } = event.target;

        this.setState({
            [name]: value
        });
    }


    handleSubmit(e) {
        e.preventDefault();

        axios.post('/api/users/signin/', this.state)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        return (
            <div>
                <h2>Erstelle neuen Nutzer</h2>
                <form onSubmit={this.handleSubmit}>
                    email<input name="email" type="text" onChange={this.handleInputChangeEmail} />
                    password: <input type="password" name="password" onChange={this.handleInputChange} />
                    password: <input type="password" name="password_repeat" onChange={this.handleInputChange} />
                    Firt: <input type="text" name="first_name" onChange={this.handleInputChange} />
                    Last <input type="text" name="last_name" onChange={this.handleInputChange} /> 
                    Gender: <select name="anrede" size="1">
                        <option value="frau">Frau</option>
                        <option value="herr">Herr</option>
                    </select>
                    <button name="Login">Login</button>
                </form>
            </div>
        );
    }
}




export default Registrieren;
