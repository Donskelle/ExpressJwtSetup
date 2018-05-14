import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import FacebookLogin from 'react-facebook-login';
import { connect } from 'react-redux';


import LoginForm from './../components/LoginForm';
import { login, logout, loginFacebook } from './../actions/authActions'




class UserNav extends Component {
    constructor(props) {
        super(props);

        this.responseFacebook = this.responseFacebook.bind(this);
    }


    responseFacebook(fbRes) {
        if (fbRes.status !== 'unknown' || fbRes.status !== 'not_authorized') {
            this.props.loginFacebook({ 'access_token': fbRes.accessToken });
        }
    }

    render() {
        if (this.props.user.isAuthenticated) {
            return (<div>
                <a onClick={this.props.logout}>Wieder raus</a>
            </div>);
        }

        return (
            <div>
                <FacebookLogin
                    appId="102026413313755"
                    fields="id,first_name,last_name,gender,birthday,picture,email"
                    scope="email,user_birthday,public_profile"
                    callback={this.responseFacebook} />
                <LoginForm login={this.props.login} />
                <NavLink to='/Registrieren'>Registrieren</NavLink>
            </div >
        );
    }
}

function mapStateToProps(state) {
    return { user: state.user };
}

const mapDispatchToProps = {
    login,
    logout,
    loginFacebook
}


export default connect(mapStateToProps, mapDispatchToProps)(UserNav);
