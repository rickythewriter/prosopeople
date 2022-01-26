
import React from 'react';
import { NavLink } from 'react-router-dom';
import DemoLoginButton from '../DemoLoginButton'
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
              <h2>PROSOPEOPLE</h2>
        </NavLink>
      </div>
      <div id='top-nav-right'>
        <LogoutButton />
      </div>
    </>

  );
}

export default TopNav;
