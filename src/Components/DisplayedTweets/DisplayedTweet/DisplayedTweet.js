// Librairies
import React from 'react';
import { Link } from 'react-router-dom';
import routes from '../../../config/routes';
import classes from './DisplayedTweet.module.css';
import PropTypes from 'prop-types';

function DisplayedTweet(props) {
    return (
        <Link className={classes.link} to={routes.TWEETS + '/' + props.tweet.slug}>
            <div className={classes.DisplayedTweet}>
                <h2>{props.tweet.titre}</h2>
                <p>{props.tweet.accroche}</p>
                <div className={classes.footer}>
                    <small>{props.tweet.auteur}</small>
                    <small className={classes.hashtag}>{props.tweet.hashtag}</small>
                </div>
            </div>
        </Link>
    );
}
DisplayedTweet.propTypes = {
    tweet: PropTypes.object
};

export default DisplayedTweet;