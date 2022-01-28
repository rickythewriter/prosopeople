
import React from 'react';
import { NavLink } from 'react-router-dom';
import DemoLoginButton from '../DemoLoginButton'
// import LogoutButton from './auth/LogoutButton';
import './NavBar.css'

const NavBar = () => {
  return (
    <div className='global-header'>
      <div className='top'>
        <div className='global-logo'>
          <NavLink 
            to='/' 
            exact={true} 
            activeClassName='active'
            style={{textDecoration: 'none', color: 'inherit'}}
          >
                <h2>PROSOPEOPLE</h2>
          </NavLink>
        </div>
        <nav className='utility-nav'>
          <ul>
            <li>
              <NavLink 
                to='/login' 
                exact={true} 
                activeClassName='active'
                style={{textDecoration: 'none', color: 'inherit'}}
              >
                <p>Login</p>
              </NavLink>
            </li>
    {/*        <li>
              <NavLink to='/sign-up' exact={true} activeClassName='active'>
                Sign Up
              </NavLink>
            </li>*/}
{/*            <li>
              <NavLink to='/users' exact={true} activeClassName='active'>
                Users
              </NavLink>
            </li>*/}
    {/*        <li>
              <LogoutButton />
            </li>*/}

            <li>
              <DemoLoginButton />
            </li>

          </ul>
        </nav>
      </div>
    </div>
  );
}

export default NavBar;
