import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, NavLink } from 'react-router-dom';
import { signUp } from '../../store/session';
import LoginSignupLogo from './LoginSignupLogo';
import './LoginSignupForm.css'
import formatValidationError from './authHelperFunctions';

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, firstName, lastName, password));
      if (data) {
        setErrors(data)
      }
    } else if (password !== repeatPassword) {
        setErrors(['repeat_password : Passwords must match.'])
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updateFirstName = e => {
    setFirstName(e.target.value);
  };

  const updateLastName = (e) => {
    setLastName(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (

    <div className='auth-form-block'>

      <div className='auth-form-frame'>

          <div className='heading'>

            <LoginSignupLogo />

          </div>

          <div className='minimal-form'>

            <form className='form-authentication' onSubmit={onSignUp}>

              <ol>

                <li className='Row'>
                  <div>

                  </div>
                </li>

                <li className='Row'>
                  <div className='input-wrapper'>
                    <label>Username</label>
                    <input
                      type='text'
                      name='username'
                      className='TextInput TextInput_large'
                      placeholder='Username'
                      onChange={updateUsername}
                      value={username}
                    ></input>
                    <div className='error-message'>
                      {formatValidationError(errors, 'username')}
                    </div>
                  </div>
                </li>

                <li className='Row'>
                  <div className='input-wrapper'>
                    <label>First Name</label>
                    <input
                      type='text'
                      name='firstName'
                      className='TextInput TextInput_large'
                      placeholder='First Name'
                      onChange={updateFirstName}
                      value={firstName}
                    ></input>
                    <div className='error-message'>
                      {formatValidationError(errors, 'first_name')}
                    </div>
                  </div>
                </li>

                <li className='Row'>
                  <div className='input-wrapper'>
                    <label>Last Name</label>
                    <input
                      type='text'
                      name='lastName'
                      className='TextInput TextInput_large'
                      placeholder='Last Name (Optional)'
                      onChange={updateLastName}
                      value={lastName}
                    ></input>
                    <div className='error-message'>
                      {formatValidationError(errors, 'last_name')}
                    </div>
                  </div>
                </li>

                <li className='Row'>
                  <div className='input-wrapper'>
                    <label>Email</label>
                    <input
                      type='text'
                      name='email'
                      className='TextInput TextInput_large'
                      placeholder='Email'
                      onChange={updateEmail}
                      value={email}
                    ></input>
                    <div className='error-message'>
                      {formatValidationError(errors, 'email')}
                    </div>
                    </div>
                  </li>

                  <li className='Row'>
                    <div className='input-wrapper'>
                      <label>Password</label>
                      <input
                        type='password'
                        name='password'
                        className='TextInput TextInput_large'
                        placeholder='Password'
                        onChange={updatePassword}
                        value={password}
                      ></input>
                      <div className='error-message'>
                        {formatValidationError(errors, 'password')}
                      </div>
                    </div>
                  </li>

                  <li className='Row'>
                    <div className='input-wrapper'>
                      <label>Repeat Password</label>
                      <input
                        type='password'
                        name='repeat_password'
                        className='TextInput TextInput_large'
                        placeholder='Confirm Password'
                        onChange={updateRepeatPassword}
                        value={repeatPassword}
                        required={true}
                      ></input>
                      <div className='error-message'>
                        {formatValidationError(errors, 'repeat_password')}
                      </div>
                    </div>
                  </li>

                  <li className='Row'>
                    <div>
                      <input 
                        name='sign-up'
                        id='sign-up'
                        type='submit'
                        className='Btn Btn_emph Btn_super'
                        value='Sign Up'
                      />
                    </div>
                  </li>

                </ol>

              </form>
            </div>

            <div id="context-switch">
              <div className='context-switch-explanation'>
                  <p> Already have an account? </p>
              </div>
              <div className="switch">
                  <NavLink 
                    to="/login" 
                    exact={true}
                    style={
                      {textDecoration: 'none', color: '#61714d'}
                    }
                    >
                    <p>
                    Sign In
                    </p>
                  </NavLink>
              </div>
            </div>

      </div>
    </div>
  );
};

export default SignUpForm;
