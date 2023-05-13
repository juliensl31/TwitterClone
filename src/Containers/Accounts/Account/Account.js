// Librairie
import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from '../../../config/axios-firebase';
import routes from '../../../config/routes';
import classes from './Account.module.css';

import Follow from '../../../Components/Follow/Follow';
import DisplayedTweets from '../../../Components/DisplayedTweets/DisplayedTweets';

// Functions
function Account(props) {

    // States
    const [account, setAccount] = useState([]);
    const [tweets, setTweets] = useState([]);

    // ComponentDidMount
    useEffect(() => {

        // Axios
        axios.get('/users.json?orderBy="pseudo"&equalTo="'+ props.match.params.pseudo +'"')
        .then(response => {
            if(Object.keys(response.data).length === 0) {
                console.log(response);
                toast.error("Cet utilisateur n'existe pas !");
                props.history.push(routes.HOME);
            }
            let newAccount = [];
            for (let key in response.data) {
                newAccount.push({
                    ...response.data[key],
                    id: key
                });
            }
            setAccount(newAccount);
        })
        .catch(error => {
            console.log(error);
        });

    }, [props.match.params.pseudo]); // Si le pseudo change, le useEffect se relance

    // ComponentDidUpdate
    useEffect(() => {
    axios.get('/tweets.json?')
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
        
        tweetsArray = tweetsArray.filter(tweet => tweet.auteur === props.match.params.pseudo);

        setTweets(tweetsArray);
    }
    )
    .catch(error => {
        console.log(error);
    });
    }, []); // Si le slug change, le useEffect se relance


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
                    <Follow user={props.user} account={account} />
                </div>
                
            </div>
            <h2>Les Tweets de {props.match.params.pseudo}</h2>
            <DisplayedTweets tweets={tweets} />

        </>
    );
};

export default withRouter(Account);

