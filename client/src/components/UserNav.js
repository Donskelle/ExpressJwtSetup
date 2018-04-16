import React, { Component } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import FacebookLogin from 'react-facebook-login';

import LoginForm from './../components/LoginForm';



class UserNav extends Component {
    constructor(props) {
        super(props);
    }

    responseFacebook(respone) {
        console.log(respone);

        axios.post('api/users/oauth/facebook')
    }

    render() {
        if (this.props.user) {
            return (<div>
                <a onClick={this.props.handleLogout}>Wieder raus</a>
            </div>);
        }

        return (
            <div>
                <FacebookLogin
                    appId="102026413313755"
                    autoLoad={true}
                    fields="id,name,first_name,last_name,gender,birthday,picture,email"
                    callback={this.responseFacebook} />
                <LoginForm onLogin={this.props.handleLogin} />
                <NavLink to='/Registrieren'>Registrieren</NavLink>
            </div >
        );
    }
}

export default UserNav;