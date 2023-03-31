// Librairies
import React from 'react';
import classes from './Navigation.module.css';
import routes from '../../../config/routes';
import { withRouter } from 'react-router-dom';

// Composants
import NavigationItem from './NavigationItem/NavigationItem';

function Navigation(props) {

    return (
        <ul className={classes.Navigation}>
            <NavigationItem exact to={routes.HOME}>Home</NavigationItem>
            <NavigationItem to={routes.CONTACT}>Contact</NavigationItem>
        </ul>
    );
}

export default withRouter(Navigation);