// Librairies
import React from 'react';
import { Link } from 'react-router-dom';
import routes from '../../../config/routes';
import classes from './DisplayedTweet.module.css';

function DisplayedTweet(props) {
    return  (
        <Link className={classes.link} to={routes.TWEETS + '/' + props.tweet.slug}>
            <div className={classes.DisplayedTweet}>
                <h2>{props.tweet.titre}</h2>
                <p>{props.tweet.accroche}</p>
                {/* <small>{props.tweet.auteur}</small> */}
                
            </div>
        </Link>
        
    );
    
}


export default DisplayedTweet;