// Librairies
import React, { useState, useEffect } from 'react';
import axios from '../../config/axios-firebase';

// Composant
import DisplayedTweets from '../../Components/DisplayedTweets/DisplayedTweets';
import fire from '../../config/firebase';

function Tweets() {
  
    // State
    const [tweets, setTweets] = useState([]);
    // eslint-disable-next-line
    const [user, setUser] = useState('');

    //ComponentDidMount
    useEffect(() => {
      authListener();
    },[]);
  
    const authListener = () => {
      fire.auth().onAuthStateChanged(user => {
        if(user) {
          setUser(user);
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
                        
                  tweetsArray = tweetsArray.filter(tweet => tweet.auteur === user.displayName);

                  setTweets(tweetsArray);
              })
              .catch(error => {
                  console.log(error);
              });
        }
        else {
          setUser('')
          
        }
      });
    } ;

    useEffect(() => {
        document.title = 'Mes tweets';
    });

    return (
        <>
            <h1>Mes Tweets</h1>
            <DisplayedTweets tweets={tweets} />
        </>
    );
}

export default Tweets;