
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import './TopNav.css'

const TopNav = () => {
  return (
    <>
      <div id='top-nav-left'>
        <NavLink 
          to='/' 
          exact={true} 
          activeClassName='active'
          style={{textDecoration: 'none', color: 'inherit'}}
        >
              <h2>Prosopeople</h2>
        </NavLink>
      </div>
      <div id='top-nav-right'>
        <LogoutButton />
      </div>
    </>

  );
}

export default TopNav;
