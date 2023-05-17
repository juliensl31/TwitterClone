// Librairie
import axios from '../../config/axios-firebase';
import React, { useEffect, useState } from 'react';

// Composant
import DisplayedTweets from '../../Components/DisplayedTweets/DisplayedTweets';
import Spinner from '../../Components/UI/Spinner/Spinner';

function Home() {

       // State
       const [tweets, setTweets] = useState([]);
       const [chargement, setChargement] = useState(false);

       useEffect(() => {

            //Récupérer les tweets
            fetchTweets();

            return () => {
                console.log('useEffect (didUnmount)');
            }
        }, []);

       // ComponentDidMount
       const fetchTweets = () => {
        setChargement(true);
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
               setChargement(false);
           })
           .catch(error => {
               console.log(error);
               setChargement(false);
           });
       };

       useEffect(() => {
        document.title = 'Accueil';
    });
   
    return (
        <div className='container'> 
            <h1>Explorer</h1>
            {chargement ? <><div className="container">Chargement...</div> <Spinner /></> :
            <DisplayedTweets tweets={tweets} />
            }
        </div>
    );
}

export default Home;