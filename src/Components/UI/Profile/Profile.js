
// Librairies
import React, { useEffect, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import fire from '../../../config/firebase';
import routes from '../../../config/routes';
import classes from './Profile.module.css';
import { toast } from 'react-toastify';


function Profile(props) {

    //State
    const [user, setUser] = useState(' ');

    //ComponentDidMount
    useEffect(() => {
        return authListener();
    },[]);

    // Fonction pour vérifier si l'utilisateur est connecté
    const authListener = () => {
    return fire.auth().onAuthStateChanged(user => {
        if(user) {
        setUser(user);
        } else {
        setUser('');
        }
    });
    };

    // Fonction pour se déconnecter
    const logoutClickedHandler = () => {
        fire.auth().signOut();
        toast('Au revoir !');
        props.history.push(routes.HOME);
    };

    return (
        <div className={classes.Profile}>
            <h1>Compte</h1>
            <p>{user.displayName}</p>
            <div className={classes.items}>
                    <Link to={routes.FOLLOW}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
                        </svg>
                        Abonnements
                    </Link>
                    
                    <Link to={routes.MANAGE_TWEET}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                        </svg>
                        Ajouter un Tweet
                    </Link>

                    <Link to={routes.TWEETS}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z"/>
                        </svg>
                         Mes Tweets
                    </Link>
                    
            </div>
            <button onClick={logoutClickedHandler} className={classes.button}>Déconnexion</button>
        </div>
        
    );
}


export default withRouter(Profile);