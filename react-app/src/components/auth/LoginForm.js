import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import DemoLoginButton from '../DemoLoginButton';
import './LoginSignupForm.css'

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (

    <div className='minimal-frame'>

      <div className='minimal-wrapper'>

        <div className='minimal-body'>

          <div className='heading'>

            <div className="MinimalFormFrame-prosopeople-logo">
              <p>Insert Logo Here</p>
              <h1>PROSOPEOPLE</h1>
              <p className='tagline'> Chronicle Your Relationships </p>
            </div>

          </div>

          <div className='minimal-form'>
            <form onSubmit={onLogin}>
              <ol>

                <li className='Row'>
                  <div>
                    {errors.map((error, ind) => (
                      <div key={ind}>{error}</div>
                    ))}
                  </div>
                </li>

                <li className='Row'>

                  <div className='input-wrapper' id='email-wrapper'>
                    <label htmlFor='email'>Email</label>
                    <input
                      name='email'
                      type='text'
                      id='email'
                      className='TextInput TextInput_large error FieldState-input FieldState_error-input'
                      maxLength={254}
                      placeholder='Email'
                      value={email}
                      onChange={updateEmail}
                    />
                    {/*<div className="error-status FieldState-message FieldState_error-message qa-ValidationError-email"> Email address is a required field </div>*/}
                  </div>


                </li>

                <li className='Row'>

                  <div className='input-wrapper' id='password-wrapper'>
                    <label htmlFor='password'>Password</label>
                    <input
                      name='password'
                      type='password'
                      id='password'
                      className='TextInput TextInput_large testResult badPass'
                      placeholder='Password'
                      value={password}
                      onChange={updatePassword}
                    />
                  {/*<div className="passMsg badPass"> A strong password is blah blah blah </div>*/}
                  </div>

                </li>

                <li className='Row'>
                  <div>
                    <input 
                      name='login'
                      id='login'
                      type='submit'
                      className='Btn Btn_emph Btn_super'
                      value='Log In'
                    />
                  </div>
                </li>

              </ol>  

            </form>

            <DemoLoginButton />

          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
