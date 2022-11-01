import React from 'react';
import { NavLink } from 'react-router-dom';
import './LoginSignupLogo.css'

const LoginSignupLogo = () => {

    return (
        <div className="MinimalFormFrame-prosopeople-logo">
          <NavLink to="/" exact={true} style={{textDecoration: 'none', color: 'inherit'}}>
            <img 
              src='https://github.com/rickythewriter/prosopeople/blob/main/react-app/public/favicon.png?raw=true'
              alt='prosopeople- logo'
            />
            <h1>PROSOPEOPLE</h1>
          </NavLink>
          <p className='tagline'> Deepen Your Relationships </p>
        </div>
    )
}

export default LoginSignupLogo