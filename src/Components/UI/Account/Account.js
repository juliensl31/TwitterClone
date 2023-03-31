import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import fire from '../../../config/firebase';
import routes from '../../../config/routes';
import classes from './Account.module.css';



function Account(props) {

    // Fonction
    const logoutClickedHandler = () => {
        fire.auth().signOut();
        props.history.push(routes.HOME);
    }


    return (
        <div className={classes.Account}>
            <h1>Compte</h1>
            <p>userName</p>
            <div className={classes.items}>
                <Link to={routes.SUBSCRIPTION}>Abonnement</Link>
                <Link to={routes.MANAGE_TWEET}>Ajouter un Tweet</Link>
                <Link exact to={routes.TWEETS}>Mes Tweets</Link>
            </div>
            <button onClick={logoutClickedHandler} className={classes.button}>Déconnexion</button>
        </div>
        
    );
}


export default withRouter(Account);