import React, { Component } from 'react';
import axios from 'axios';
import { NavLink, withRouter } from 'react-router-dom';
import FacebookLogin from 'react-facebook-login';


import LoginForm from './../components/LoginForm';




class UserNav extends Component {
    constructor(props) {
        super(props);

        this.responseFacebook = this.responseFacebook.bind(this);
        this.logout = this.logout.bind(this);
    }

    logout() {
        this.props.history.push("/");
        this.props.handleLogout();
    }

    responseFacebook(fbRes) {
        if (fbRes.status !== 'unknown' || fbRes.status !== 'not_authorized') {
            axios.post('api/users/oauth/facebook', { 'access_token': fbRes.accessToken })
                .then((response) => {
                    console.log(response);
                    this.props.handleLogin(response);
                })
                .catch(function (error) {
                    console.log(error);
                });

        }
    }

    render() {
        if (this.props.user) {
            return (<div>
                <a onClick={this.logout}>Wieder raus</a>
            </div>);
        }

        return (
            <div>
                <FacebookLogin
                    appId="102026413313755"
                    fields="id,name,first_name,last_name,gender,birthday,picture,email"
                    scope="email,user_birthday,public_profile"
                    callback={this.responseFacebook} />
                <LoginForm handleLogin={this.props.handleLogin}/>
                <NavLink to='/Registrieren'>Registrieren</NavLink>
            </div >
        );
    }
}

export default withRouter(UserNav);