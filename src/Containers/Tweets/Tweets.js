// Librairies
import React, { useState, useEffect } from 'react';
import axios from '../../config/axios-firebase';
import classes from './Tweets.module.css';

// Composant
import DisplayedTweets from '../../Components/DisplayedTweets/DisplayedTweets';
import { Link } from 'react-router-dom';
import routes from '../../config/routes';

function Tweets() {

    // State
    const [tweets, setTweets] = useState([]);

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

            // Trier
            tweetsArray = tweetsArray.filter(tweet => tweet.brouillon === "false");

            setTweets(tweetsArray);
        })
        .catch(error => {
            console.log(error);
        });
    }, []);

    useEffect(() => {
        document.title = 'tweets';
    });


    return (
        <>
            <h1>Tweets</h1>
            <Link exact to={routes.MANAGE_TWEET} >
                <button className={classes.button}>Ajouter un Tweet</button>
            </Link>
            <DisplayedTweets tweets={tweets} />
        </>
    );
}

export default Tweets;