// Librairies
import React from 'react';
import { Link } from 'react-router-dom';
import routes from '../../../config/routes';
import classes from './DisplayedTweet.module.css';
import PropTypes from 'prop-types';
import {ShareSocial} from 'react-share-social';
import moment from 'moment';
import 'moment/locale/fr';


import ShareModal from '../../UI/Modal/Share/ShareModal';

function DisplayedTweet(props) {

    // Fonction 
    // Raccourcir affichage post
    const substr = props.tweet.contenu.substr(1, 150);

    // Variable
    moment.locale('fr');
    let date = moment.unix(props.tweet.date / 1000).startOf('hour').fromNow();

    return (
        <div className={classes.DisplayedTweet}>
            <Link className={classes.link} to={routes.TWEETS + '/' + props.tweet.slug}>
                <h2>{props.tweet.titre}</h2>
                <p>{substr + " ..."}</p>
                <small className={classes.hashtag}>{props.tweet.hashtag}</small>
            </Link>    
            <div className={classes.footer}>
                <div className={classes.footerLeft}>
                    <b>{props.tweet.auteur}</b>
                    <small>{date}</small>  
                </div>
                <div className={classes.icons}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                        <path fillRule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-2.5a2 2 0 0 0-1.6.8L8 14.333 6.1 11.8a2 2 0 0 0-1.6-.8H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2.5a1 1 0 0 1 .8.4l1.9 2.533a1 1 0 0 0 1.6 0l1.9-2.533a1 1 0 0 1 .8-.4H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                    </svg>
                    <ShareModal>
                        <ShareSocial
                            className={classes.ShareSocial}
                            url={"http://localhost:3000/TwitterClone/tweets/" + props.tweet.slug}
                            socialTypes={['facebook', 'twitter', 'whatsapp', 'reddit', 'linkedin', 'telegram']}
                            onSocialButtonClicked={data => console.log(data)}
                        />
                    </ShareModal>
                </div>
            </div>
        </div>

    );
}
DisplayedTweet.propTypes = {
    tweet: PropTypes.object
};

export default DisplayedTweet;