// Librairies
import React, { useEffect, useState } from "react";
import axios from "../../../config/axios-firebase";
import classes from "./Followed.module.css";
import { Link } from "react-router-dom";
import routes from "../../../config/routes";


function Followed(props) {

    const [followed, setFollowed] = useState([]);
    const [accounts, setAccounts] = useState([]);
    const [tweets, setTweets] = useState([]);

    const userName = props.user.displayName;
    const currentUser = props.user.uid;
  

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

            setTweets(tweetsArray);
        })
        .catch(error => {
            console.log(error);
        });
    }, []);


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
            setFollowed(followsArray);
        })
        .catch(error => {
            console.log(error);
        });
    }, []);

    // ComponentDidMount
    useEffect(() => {
        axios.get('/users.json')
        .then(response =>{

            let accountsArray = [];

            for (let key in response.data) {
                accountsArray.push({
                    ...response.data[key],
                    id: key
                });
            }
            
            // Mise à jour du state
            setAccounts(accountsArray);

        })
        .catch(error => {
            console.log(error);
        });
    }, []);



    // ComponentDidUpdate
    useEffect(() => {
        document.title = 'Comptes suivis';
    });

    return (
        <div>
        <h1>Vos comptes suivis</h1>
        {followed.map(follow => (
            <div key={follow.id} >
                {follow.follower === currentUser ? 
                <>
                    <div className={classes.Followed}>
                        <Link className={classes.link} to={routes.ACCOUNTS + '/' + follow.followed}>
                            <div>
                                <h2>{follow.followed}</h2> 
                            </div>
                        </Link>                   
                        <div className={classes.footer}>
                            {tweets.length > 0 ?
                                <div><b>{tweets.filter(tweet => tweet.auteur === follow.followed).length}</b> Tweet(s)</div>
                            : 
                            null}
                            
                            {accounts.map(account => (
                                <div key={account.id}>
                                    {account.pseudo === follow.followed ?
                                        <>
                                            {followed.length > 0 ?
                                                <div><b>{followed.filter(follow => follow.followed === account.pseudo).length}</b> Abonné(s) </div>
                                            :
                                            null}

                                            {followed.length > 0 && userName === account.pseudo ?
                                                <div><b>{followed.filter(follow => follow.follower === currentUser).length}</b> Abonnement(s)</div>
                                            :
                                            null}
                                        </>
                                    :
                                    null}
                                </div>
                            ))}
                        </div>
                    </div>
                </>
                :
                    null
                }
            </div>
        ))}
        </div>
    );
}


export default Followed;