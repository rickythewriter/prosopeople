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
        <div className='splashpage-body-container'>
            <h2 id='splashpage-body'>Chronicle Your Relationships</h2>
            {/*<img id='splashpage-img' src='https://github.com/rickythewriter/prosopeople/raw/main/docs/images/views/view-person_and_entries.png?raw=true'/>*/}
            <a href="/sign-up" id='splashpage-signup-button'>Sign Up Free</a>
            <footer id='splashpage-footer'>
                <div className='footer-container'>
                    <div className='footer-nav-div'>
                        <ul className="nav-footer-list">
                            <li className='nav-footer-header'>
                                <a 
                                    className="portfolio-link footer-link" 
                                    href="https://rickythewriter.github.io">
                                    Ricky Thang
                                </a>
                            </li>
                            <li>
                                <a 
                                    className="gitHub-link footer-link" 
                                    href="https://github.com/rickythewriter">
                                    Github
                                </a>
                            </li>
                            <li>
                                <a className="linkedIn-link footer-link" href="https://www.linkedin.com/in/ricky-thang-88307a100">LinkedIn</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </footer>
        </div>
    );
}


export default SplashPage;
