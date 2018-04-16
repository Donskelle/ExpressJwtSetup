import React from 'react';
import {NavLink} from 'react-router-dom';

function Nav (props) {
  if (props.isLoggedIn) {
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

export default Nav;