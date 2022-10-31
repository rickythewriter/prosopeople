import React from "react";
import { useDispatch } from 'react-redux';
import { login } from '../../../store/session';
import './DemoLoginButton.css'

function DemoLoginButton() {
    const dispatch = useDispatch();

    const onSubmit = async e => {
        e.preventDefault();
        const email = "demo@demoemail.com"
        const password = "password"
        await dispatch(login(email, password));
    }

    return (
        <form onSubmit={onSubmit}>
            <ol>
                <li className='Row'>
                    <input 
                      name='demo-login'
                      id='demo-login'
                      type='submit'
                      // className='Btn Btn_emph Btn_super'
                      className='button-outline'
                      value='Demo Login'
                    />
                </li>
            </ol>
        </form>
    )
}

export default DemoLoginButton