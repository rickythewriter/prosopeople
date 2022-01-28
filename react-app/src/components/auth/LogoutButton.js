import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';
import { removePerson } from '../../store/person';

const LogoutButton = () => {
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    await dispatch(logout());
    dispatch(removePerson());
  };

  return <button id='button-logout' onClick={onLogout}>Sign Out</button>;
};

export default LogoutButton;
