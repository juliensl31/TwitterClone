// MLibrairie
import React from 'react';
import DisplayedTweet from './DisplayedTweet/DisplayedTweet';
import classes from './DisplayedTweets.module.css';

function DisplayedTweets(props) {

    let tweets = props.tweets.map(tweet => (
        <DisplayedTweet key={tweet.id} tweet={tweet}/>
    ));

    return (
        <section className={[classes.DisplayedTweets, 'container'].join(' ')}>
            {tweets}
        </section>

    );
    
}


export default DisplayedTweets;