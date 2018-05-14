import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';



function Nav(props) {
  if (props.isAuthenticated) {
    return (
      <ul className='nav'>
        <li>
          <NavLink exact activeClassName='active' to='/'>Home</NavLink>
        </li>
        <li>
          <NavLink activeClassName='active' to='/Profil'>Profil</NavLink>
        </li>
        <li>
          <NavLink activeClassName='active' to='/Impressum'>Impressum</NavLink>
        </li>
      </ul>
    )
  }
  return (
    <ul className='nav'>
      <li>
        <NavLink exact activeClassName='active' to='/'>Home</NavLink>
      </li>
      <li>
        <NavLink activeClassName='active' to='/Impressum'>Impressum</NavLink>
      </li>
      <li>
        <NavLink activeClassName='active' to='/Registrieren'>Registrieren</NavLink>
      </li>
    </ul>
  )
}

function mapStateToProps(state) {
  return { isAuthenticated: state.user.isAuthenticated };
}

export default connect(mapStateToProps)(Nav);