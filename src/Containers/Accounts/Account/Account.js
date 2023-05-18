// Librairie
import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from '../../../config/axios-firebase';
import routes from '../../../config/routes';
import classes from './Account.module.css';

// Composants
import DisplayedTweets from '../../../Components/DisplayedTweets/DisplayedTweets';

// Functions
function Account(props) {

    // States
    // eslint-disable-next-line
    const [account, setAccount] = useState([]);
    const [tweets, setTweets] = useState([]);

    useEffect(() => {
        // Récupérer les données de l'utilisateur
        axios.get('/users.json?orderBy="pseudo"&equalTo="'+ props.match.params.pseudo +'"')
        .then(response => {
            // Vérifier si l'utilisateur existe
            if(Object.keys(response.data).length === 0) {
                console.log(response);
                toast.error("Cet utilisateur n'existe pas !");
                props.history.push(routes.HOME);
            }
            // Mettre les données dans un tableau
            let newAccount = [];
            for (let key in response.data) {
                newAccount.push({
                    ...response.data[key],
                    id: key
                });
            }
            // Mettre à jour le state
            setAccount(newAccount);
        })
        .catch(error => {
            console.log(error);
        });

    }, [props.match.params.pseudo]); // Si le pseudo change, le useEffect se relance

    // Récupérer les tweets
    useEffect(() => {
    axios.get('/tweets.json?')
    .then(response =>{
        // Mettre les données dans un tableau
        let tweetsArray = [];
        for (let key in response.data) {
            tweetsArray.push({
                ...response.data[key],
                id: key
            });
        }

        // Chronologie
        tweetsArray.reverse();
        
        // Filtrer les tweets
        tweetsArray = tweetsArray.filter(tweet => tweet.auteur === props.match.params.pseudo);

        // Mettre à jour le state
        setTweets(tweetsArray);
    }
    )
    .catch(error => {
        console.log(error);
    });
    }, []); 


    // ComponentDidUpdate
    useEffect(() => {
        document.title = props.match.params.pseudo;
    });

    return (
        <>
            <div className={[classes.Account, 'container'].join(' ')}>
                <h2>{props.match.params.pseudo}</h2>
                <div className={classes.Account_info}>
                    <p><b>{tweets.length}</b> tweets</p>
                </div>
                
            </div>
            <h2>Les Tweets de {props.match.params.pseudo}</h2>
            <DisplayedTweets tweets={tweets} />

        </>
    );
};

export default withRouter(Account);

