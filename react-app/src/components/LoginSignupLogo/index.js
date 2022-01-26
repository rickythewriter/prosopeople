import React from 'react';
import { NavLink } from 'react-router-dom';

const LoginSignupLogo = () => {

    return (
        <div className="MinimalFormFrame-prosopeople-logo">
          <NavLink to="/" exact={true} style={{textDecoration: 'none', color: 'inherit'}}>
            <p>Insert Logo Here</p>
            <h1>PROSOPEOPLE</h1>
          </NavLink>
          <p className='tagline'> Chronicle Your Relationships </p>
        </div>
    )
}

export default LoginSignupLogo