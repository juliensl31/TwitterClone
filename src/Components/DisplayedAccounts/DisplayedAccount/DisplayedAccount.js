// Librairies
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import routes from '../../../config/routes';
import classes from './DisplayedAccount.module.css';
import PropTypes from 'prop-types';
import Follow from '../../Follow/Follow';
import axios from '../../../config/axios-firebase';

function DisplayedAccount(props) {

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

            setTweets(tweetsArray);        

        })
        .catch(error => {
            console.log(error);
        });
    }, []);

    return (
        <div className={classes.DisplayedAccount}>
            <Link className={classes.link} to={routes.ACCOUNTS + '/' + props.account.pseudo}>
                <h2>{props.account.pseudo}</h2>
            </Link>    
            <div className={classes.footer}>
                
                <Follow account={props.account} />
                {tweets.length > 0 ?
                    
                    <div><b>{tweets.filter(tweet => tweet.auteur === props.account.pseudo).length}</b> Tweets</div>
                    
                : null}
                
                
            </div>
        </div>

    );
}
DisplayedAccount.propTypes = {
    account: PropTypes.object
};

export default DisplayedAccount;