// Librairies
import React from 'react';
import LogoSite from '../UI/Logo/LogoSite';
import classes from './Header.module.css';

// Composant
import Navigation from './Navigation/Navigation';

function Header(props) {
    return (
        <header className={classes.Header}>
            <div className={['container', classes.flex].join(' ')}>
                <div>
                    <LogoSite/>
                </div>

                <nav>
                    <Navigation user={props.user} />
                </nav>
            </div>
        </header>
    );
}

export default Header;