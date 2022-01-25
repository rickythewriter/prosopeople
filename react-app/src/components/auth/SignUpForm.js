import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import LoginSignupLogo from '../LoginSignupLogo';
import './LoginSignupForm.css'

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data)
      }
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
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
    <div className='minimal-frame'>

      <div className='minimal-wrapper'>

        <div className='minimal-body'>

          <div className='heading'>

            <LoginSignupLogo />

          </div>

          <div className='minimal-form'>

            <form onSubmit={onSignUp}>

              <ol>

                <li className='Row'>
                  <div>
                    {errors.map((error, ind) => (
                    <div key={ind}>{error}</div>
                    ))}
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
          </div>
        </div>
      </div>
  );
};

export default SignUpForm;
