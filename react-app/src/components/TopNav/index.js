
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { removePerson } from '../../store/person'
import { removeEntries } from '../../store/entries'
import { removeEntry } from '../../store/entry'
import LogoutButton from '../auth/LogoutButton';
import './TopNav.css'

const TopNav = () => {
  const dispatch = useDispatch();

  return (
    <>
      <div id='top-nav-left'>
        <NavLink 
          to='/' 
          exact={true} 
          activeClassName='active'
          style={{textDecoration: 'none', color: 'inherit'}}
          onClick={ () => {
            dispatch(removePerson());
            dispatch(removeEntries());
            dispatch(removeEntry());
          }}
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
