import React, { Component } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

import LoginForm from './../components/LoginForm';


class UserNav extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const content = this.props.user ? (
            <div>
                <a onClick={this.props.handleLogout}>Wieder raus</a>
            </div>
        ) : (
                <div>
                    <LoginForm onLogin={this.handleLogin} />
                    <NavLink />
                </div>
            );

        return (
            { content }
        )
    }
}

export default UserNav;