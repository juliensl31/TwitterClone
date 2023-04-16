// Librairie
import axios from '../../config/axios-firebase';
// import routes from '../../config/routes';
import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import classes from './Home.module.css';

// Composant
import DisplayedTweets from '../../Components/DisplayedTweets/DisplayedTweets';

function Home() {

       // State
       const [tweets, sets] = useState([]);

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
   
               sets(tweetsArray);
           })
           .catch(error => {
               console.log(error);
           });
       }, []);

       useEffect(() => {
        document.title = 'Accueil';
    });
   
    return (
        <div className='container'> 
            <h1>Actu</h1>
            <DisplayedTweets tweets={tweets} />
        </div>
    );
}

export default Home;