import React from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import './SplashPage.css'

const SplashPage = () => {
    const user = useSelector(state => state.session.user);

    if (user) {
        return (
        <Redirect to="/app" />
        )
    }

    else return (
        <>
            <div className='splashpage-body-container'>
                <h2 id='splashpage-header'>Chronicle Your Relationships</h2>
                <p id='splashpage-body'>Deepen them, by writing about them.<br/>Find them in one place: your auto-prosopography</p>
                <a href="/sign-up" id='splashpage-signup-button'> Sign Up Free</a>
            </div>
            <footer id='splashpage-footer'>
                <div className='footer-container'>
                    <div className='footer-nav-div'>
                        <ul className="nav-footer-list">
                            <li className='nav-footer-header'>
                                Ricky Thang
                            </li>
                            <li>
                                <a className="gitHub-link footer-link" href="https://github.com/rickythewriter">Github</a>
                            </li>
                            <li>
                                <a className="linkedIn-link footer-link" href="https://www.linkedin.com/in/ricky-thang-88307a100">LinkedIn</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </footer>
        </>
    );
}


export default SplashPage;
