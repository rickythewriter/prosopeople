import React from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import NavSplash from './NavSplash';

import './SplashPage.css'

const SplashPage = () => {
    const user = useSelector(state => state.session.user);

    if (user) {
        return (
        <Redirect to="/app" />
        )
    }

    else return (
        <div className='splashpage'>
            <NavSplash />
            <section id='splashpage-body-container'>
                <h2 id='splashpage-heading'>Deepen Your Relationships</h2>
                <div className='splashpage-body-row' id='row-1'>
                    <div className='spashpage-body-row-left' id='row-1-left'>
                        <img id='splashpage-img' src='https://github.com/rickythewriter/prosopeople/blob/main/docs/images/demo-dossiers-create.gif?raw=true' />
                    </div>
                    <div className='splashpage-body-row-right' id='row-1-right'>
                        <h3>Strengthen bonds, by writing about them.</h3>
                        <p>Every <em>entry</em>, in your collection – of moments you've shared, conversations you've had – forms a <strong>treasure trove</strong>, to help you <strong>make future plans</strong>, and <strong>find conversation topics</strong>.</p>
                        <p>Keep a record, of your feelings, memories, and ideas, about the people in your life, here, in your auto-prosopography.</p>
                        <a href="/sign-up" id='splashpage-signup-button'>Sign Up Free</a>
                    </div>
                </div>
            </section>
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
