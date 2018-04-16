import React from 'react';
import {NavLink} from 'react-router-dom';

function Nav () {
  return (
    <ul className='nav'>
      <li>
        <NavLink exact activeClassName='active' to='/'>Home</NavLink>
      </li>
      <li>
        <NavLink activeClassName='active' to='/Impressum'>Battle</NavLink>
      </li>
      <li>
        <NavLink activeClassName='active' to='/Registrieren'>Popular</NavLink>
      </li>
    </ul>
  )
}

export default Nav;