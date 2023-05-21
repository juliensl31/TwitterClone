// Librairie
import axios from '../../config/axios-firebase';
import React, { useEffect, useState } from 'react';
import classes from './Home.module.css';

// Composant
import DisplayedTweets from '../../Components/DisplayedTweets/DisplayedTweets';
import Spinner from '../../Components/UI/Spinner/Spinner';

function Home() {

       // State
       const [tweets, setTweets] = useState([]);
       const [chargement, setChargement] = useState(false);

        // ComponentDidMount
       useEffect(() => {
        //Récupérer les tweets
        fetchTweets();

        // ComponentWillUnmount
        return () => {
            console.log('useEffect (didUnmount)');
        }
        }, []);

       // Récupérer les tweets
       const fetchTweets = () => {
            // Début du chargement
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
    
                    // Mise à jour du state
                setTweets(tweetsArray);

                // Fin du chargement
                setChargement(false);
            })
            .catch(error => {
                console.log(error);
                setChargement(false);
            });
       };

    // ComponentDidUpdate
    useEffect(() => {
    document.title = 'Accueil';
    });
   
    return (
        <div className={[classes.Home, 'container'].join(' ')}> 
            <h1>Explorer</h1>
            {chargement ? 
                <>
                    <div className="container">Chargement...</div>
                    <Spinner />
                </> 
            :
                <DisplayedTweets tweets={tweets} />
            }
        </div>
    );
}

export default Home;