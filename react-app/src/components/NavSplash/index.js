
import React from 'react';
import { NavLink } from 'react-router-dom';
import DemoLoginButton from '../DemoLoginButton'
// import LogoutButton from './auth/LogoutButton';
import './NavSplash.css'

const NavSplash = () => {
  return (
    <div className='global-header'>
      <div className='top'>
        <NavLink 
          to='/' 
          exact={true} 
          activeClassName='active'
          style={{textDecoration: 'none', color: 'inherit'}}
        >
          <img 
            src='https://github.com/rickythewriter/prosopeople/blob/main/react-app/public/favicon.png?raw=true'
            alt='prosopeople-logo'
          />
        </NavLink>
        <div className='global-logo'>
          <NavLink 
            to='/' 
            exact={true} 
            activeClassName='active'
            style={{textDecoration: 'none', color: 'inherit'}}
          >
            <h2>Prosopeople</h2>
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
                <p>Log In</p>
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

export default NavSplash;
