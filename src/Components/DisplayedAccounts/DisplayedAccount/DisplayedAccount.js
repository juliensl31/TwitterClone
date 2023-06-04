// Librairies
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import routes from '../../../config/routes';
import classes from './DisplayedAccount.module.css';
import PropTypes from 'prop-types';
import axios from '../../../config/axios-firebase';
import fire from '../../../config/firebase';
import { toast } from 'react-toastify';

// Composants
import Follow from '../../UI/Logo/Follow';
import UnFollow from '../../UI/Logo/UnFollow';

function DisplayedAccount(props) {

    // State
    const [tweets, setTweets] = useState([]);
    const [follows, setFollows] = useState([]);
    const [user, setUser] = useState('');

    const currentUser = user.uid;
    const userName = user.displayName;

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
    };
    

     // Fonction pour suivre
     const followClickHandler = () => {

      const follow = {
            follower: currentUser,
            followed: props.account.pseudo,
            following: true
        };

        // Vérifier que l'utilisateur ne se suit pas lui-même
        if(follow.followed === userName) {
            toast.error("Vous ne pouvez pas vous suivre vous-même !");
            return;
        }
        // Mettre à jour la base de données
        axios.post('/follows.json', follow)
        .then(response => {
            console.log(response);

            // Mettre à jour le state
            setFollows(prevFollows => [...prevFollows, follow]);            
            toast("Vous suivez " + props.account.pseudo);
        })
        .catch(error => {
            console.log(error);
        });
       };

    // Fonction pour ne plus suivre
    const unFollowClickHandler = () => {

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

                // Mettre à jour le state
                setFollows(follows.filter(follow => follow.id !== followId));
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

    // ComponentDidMount
    useEffect(() => {
        axios.get('/follows.json')
        .then(response =>{
            
            let followsArray = [];

            for (let key in response.data) {
                followsArray.push({
                    ...response.data[key],
                    id: key
                });
            }

            // Mise à jour du state
            setFollows(followsArray);
        })
        .catch(error => {
            console.log(error);
        });
    }, []);



    return (
        <div className={classes.DisplayedAccount}>
                <div className={classes.pseudo}>
                 <Link className={classes.link} to={routes.ACCOUNTS + '/' + props.account.pseudo}>   
                    <h2>{props.account.pseudo}</h2>
                </Link>
                    {follows.length >= 0  ?
                        follows.filter(follow => follow.follower === currentUser && follow.followed === props.account.pseudo).length > 0 ?
                            <div onClick={unFollowClickHandler}><UnFollow /></div>
                        :
                            <div onClick={followClickHandler}><Follow /></div>
                    :
                    null}
                </div>
            
            <div className={classes.footer}>
                {tweets.length > 0 ?
                    <div><b>{tweets.filter(tweet => tweet.auteur === props.account.pseudo).length}</b> Tweet(s)</div>
                : 
                null}
                {follows.length >= 0 ?
                    <div><b>{follows.filter(follow => follow.followed === props.account.pseudo).length}</b> Abonné(s) </div>
                :
                null}
                {follows.length >= 0 && userName === props.account.pseudo ?
                    <div><b>{follows.filter(follow => follow.follower === currentUser).length}</b> Abonnement(s)</div>
                :
                null}

            
                                
            </div>
        </div>
    );
}
DisplayedAccount.propTypes = {
    account: PropTypes.object
};

export default DisplayedAccount;