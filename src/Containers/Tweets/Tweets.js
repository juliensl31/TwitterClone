// Libraries
import React, { useState, useEffect } from 'react'; 
import axios from '../../config/axios-firebase';
import fire from '../../config/firebase';

// Composant
import DisplayedTweets from '../../Components/DisplayedTweets/DisplayedTweets';

function Tweets() {
  
    // State
    const [tweets, setTweets] = useState([]);

    // ComponentDidMount
    useEffect(() => {
      // Récupérer les tweets
      const authListener = () => {
        // Vérifier si l'utilisateur est connecté
        fire.auth().onAuthStateChanged(user => {
          if(user) {
            axios.get('/tweets.json')
              .then(response => {
                let tweetsArray = [];

                for (let key in response.data) {
                    tweetsArray.push({
                        ...response.data[key],
                        id: key
                    });
                }
                
                // Filtrer les tweets
                tweetsArray = tweetsArray.filter(tweet => tweet.auteur === user.displayName);
                
                // Chronologie
                setTweets(tweetsArray.reverse());
              })
              .catch(error => {
                  console.log(error);
              });
          }
        });
      }
      // Lancer la fonction
      authListener();
    },[]);
  
    // ComponentDidUpdate
    useEffect(() => {
        document.title = 'Mes tweets';
    }, []);

    return (
        <>
            <h1>Mes Tweets</h1>
            <DisplayedTweets tweets={tweets} />
        </>
    );
}

export default Tweets;
