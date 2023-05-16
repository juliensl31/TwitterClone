// Librairies
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import routes from '../../../config/routes';
import classes from './DisplayedTweet.module.css';
import PropTypes from 'prop-types';
import {ShareSocial} from 'react-share-social';
import moment from 'moment';
import 'moment/locale/fr';


import ShareModal from '../../UI/Modal/Share/ShareModal';
import Follow from '../../Follow/Follow';
import fire from '../../../config/firebase';

function DisplayedTweet(props) {

    //State
  const [user, setUser] = useState(' ');

    //ComponentDidMount
    useEffect(() => {
       return authListener();
    },[]);

    const authListener = () => {
        fire.auth().onAuthStateChanged(user => {
        if(user) {
            setUser(user);
        }
        else {
            setUser('')
        }
        });
    } ;

    // Raccourcir affichage post
    const substr = props.tweet.contenu.substr(0, 150);
    
    // Variable
    moment.locale('fr');
    let date = moment.unix(props.tweet.date / 1000).startOf('hour').fromNow();

    return (
        <div className={classes.DisplayedTweet}>
            <Link className={classes.link} to={routes.TWEETS + '/' + props.tweet.slug}>
                <h2>{props.tweet.titre}</h2>
                <p>{substr + " ..."}</p>
                <h6 className={classes.hashtag}>{props.tweet.hashtag}</h6>
            </Link>    
            <div className={classes.footer}>
                <div className={classes.footerLeft}>
                Publié par : <Link to={routes.ACCOUNTS + '/' + props.tweet.auteur}><b>{props.tweet.auteur}</b></Link> 
                    <small>{date}</small>  
                </div>
                <div className={classes.icons}>
                    {props.tweet.auteur !== user.displayName ? <Follow/> : null}

                    <svg  xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-2.5a2 2 0 0 0-1.6.8L8 14.333 6.1 11.8a2 2 0 0 0-1.6-.8H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2.5a1 1 0 0 1 .8.4l1.9 2.533a1 1 0 0 0 1.6 0l1.9-2.533a1 1 0 0 1 .8-.4H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
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