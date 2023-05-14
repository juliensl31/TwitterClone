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
import ResponseModal from '../../UI/Modal/Response/ResponseModal';
import fire from '../../../config/firebase';

function DisplayedTweet(props) {

    //State
  const [user, setUser] = useState(' ');

    //ComponentDidMount
    useEffect(() => {
        authListener();
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
                    Publié par : <b>{props.tweet.auteur}</b>
                    <small>{date}</small>  
                </div>
                <div className={classes.icons}>
                    {props.tweet.auteur !== user.displayName ? <Follow/> : null}

                    <ResponseModal>
                        {props.children}
                    </ResponseModal>

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