// Librairies
import React from 'react';
import classes from './Navigation.module.css';
import routes from '../../../config/routes';
import fire from '../../../config/firebase';
import { withRouter } from 'react-router-dom';

// Composants
import NavigationItem from './NavigationItem/NavigationItem';

function Navigation(props) {

    // Fonction
    const logoutClickedHandler = () => {
        fire.auth().signOut();
        props.history.push(routes.HOME);
    }

    return (
        <ul className={classes.Navigation}>
            <NavigationItem exact to={routes.HOME}>Home</NavigationItem>
            <NavigationItem to={routes.SUBSCRIPTION}>Abonnement</NavigationItem>
            {props.user ? <NavigationItem exact to={routes.TWEETS}>Mes Tweets</NavigationItem> : null}
            {props.user ? <NavigationItem to={routes.MANAGE_TWEET}>Ajouter un Tweet</NavigationItem> : null}
            <NavigationItem to={routes.CONTACT}>Contact</NavigationItem>
            {props.user ?<button onClick={logoutClickedHandler} className={classes.logout}>Déconnexion</button> : null}
        </ul>
    );
}

export default withRouter(Navigation);