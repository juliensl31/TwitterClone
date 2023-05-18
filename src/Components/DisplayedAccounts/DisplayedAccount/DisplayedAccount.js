// Librairies
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import routes from '../../../config/routes';
import classes from './DisplayedAccount.module.css';
import PropTypes from 'prop-types';
import Follow from '../../Follow/Follow';
import axios from '../../../config/axios-firebase';
import fire from '../../../config/firebase';
import { toast } from 'react-toastify';

function DisplayedAccount(props) {

    // State
    const [tweets, setTweets] = useState([]);
    const [followed, setFollowed] = useState(false);
    // eslint-disable-next-line
    const [user, setUser] = useState('');
    const currentUser = user.uid;

    // ComponentDidMount
    useEffect(() => {
        axios.get('/tweets.json')
        .then(response =>{
           
            let tweetsArray = [];

            for (let key in response.data) {
                tweetsArray.push({
                    ...response.data[key],
                    id: key
                });
            }

            // Chronologie
            tweetsArray.reverse();

            // Mise à jour du state
            setTweets(tweetsArray);        

        })
        .catch(error => {
            console.log(error);
        });
    }, []);

    //ComponentDidMount
    useEffect(() => {
        return authListener();
        },[]);

    // Fonction pour vérifier si l'utilisateur est connecté
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
    
     // Fonction pour suivre
     const followClickHandler = () => {

        const follow = {
            follower: currentUser,
            followed: props.account.pseudo
        };

        // Mettre à jour la base de données
        axios.post('/follows.json', follow)
        .then(response => {
            console.log(response);
            setFollowed(true);
            toast("Vous suivez " + props.account.pseudo);
        })
        .catch(error => {
            console.log(error);
        });
    };

    // Fonction pour ne plus suivre
    const unfollowClickHandler = () => {

        // Récupérer l'id du follow
        axios.get('/follows.json?orderBy="follower"&equalTo="' + currentUser + '"')
        .then(response => {
            let followId = '';
            for (let key in response.data) {
                if(response.data[key].followed === props.account.pseudo) {
                    followId = key;
                }
            }
            // Supprimer le follow
            axios.delete('/follows/' + followId + '.json')
            .then(response => {
                console.log(response);
                setFollowed(false);
                toast("Vous ne suivez plus " + props.account.pseudo);
            })
            .catch(error => {
                console.log(error);
            });
        })
        .catch(error => {
            console.log(error);
        });
    };


    return (
        <div className={classes.DisplayedAccount}>
            <Link className={classes.link} to={routes.ACCOUNTS + '/' + props.account.pseudo}>
                <div>
                    <h2>{props.account.pseudo}</h2>
                </div>
            </Link>
            <div className={classes.footer}>
                {tweets.length > 0 ?
                    <div><b>{tweets.filter(tweet => tweet.auteur === props.account.pseudo).length}</b> Tweets</div>
                : 
                null}

                {user.displayName !== props.account.pseudo ?
                <>
                    { followed === false ? <Follow followed={true} followClicked={followClickHandler} /> : <Follow followClicked={unfollowClickHandler} /> }
                </>
                : null
                }

                
            </div>
        </div>
    );
}
DisplayedAccount.propTypes = {
    account: PropTypes.object
};

export default DisplayedAccount;