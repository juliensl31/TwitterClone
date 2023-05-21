// Librairie
import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from '../../../config/axios-firebase';
import routes from '../../../config/routes';
import classes from './Account.module.css';

// Composants
import DisplayedTweets from '../../../Components/DisplayedTweets/DisplayedTweets';
import UnFollow from '../../../Components/UI/Logo/UnFollow';
import Follow from '../../../Components/UI/Logo/Follow';

// Functions
function Account(props) {

    // States
    // eslint-disable-next-line
    const [account, setAccount] = useState([]);
    const [tweets, setTweets] = useState([]);
    const [follows, setFollows] = useState([]);

    const currentUser = props.user.uid;
    const userName = props.user.displayName;

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
            setFollows(followsArray);
        })
        .catch(error => {
            console.log(error);
        });
    }, []);

    useEffect(() => {
        // Récupérer les données de l'utilisateur
        axios.get('/users.json?orderBy="pseudo"&equalTo="'+ props.match.params.pseudo +'"')
        .then(response => {
            // Vérifier si l'utilisateur existe
            if(Object.keys(response.data).length === 0) {
                console.log(response);
                toast.error("Cet utilisateur n'existe pas !");
                props.history.push(routes.HOME);
            }
            // Mettre les données dans un tableau
            let newAccount = [];
            for (let key in response.data) {
                newAccount.push({
                    ...response.data[key],
                    id: key
                });
            }
            // Mettre à jour le state
            setAccount(newAccount);
        })
        .catch(error => {
            console.log(error);
        });

    }, [props.match.params.pseudo]); // Si le pseudo change, le useEffect se relance

    // Récupérer les tweets
    useEffect(() => {
    axios.get('/tweets.json?')
    .then(response =>{
        // Mettre les données dans un tableau
        let tweetsArray = [];
        for (let key in response.data) {
            tweetsArray.push({
                ...response.data[key],
                id: key
            });
        }

        // Chronologie
        tweetsArray.reverse();
        
        // Filtrer les tweets
        tweetsArray = tweetsArray.filter(tweet => tweet.auteur === props.match.params.pseudo);

        // Mettre à jour le state
        setTweets(tweetsArray);
    }
    )
    .catch(error => {
        console.log(error);
    });
    }, []);
    
    // Fonction pour suivre
    const followClickHandler = () => {

        const follow = {
              follower: currentUser,
              followed: props.match.params.pseudo,
              following: true
          };
  
          // Vérifier que l'utilisateur ne se suit pas lui-même
          if(follow.followed === userName) {
              toast.error("Vous ne pouvez pas vous suivre vous-même !");
              return;
          }
          // Mettre à jour la base de données
          axios.post('/follows.json', follow)
          .then(response => {
              console.log(response);
  
              // Mettre à jour le state
              setFollows(prevFollows => [...prevFollows, follow]);            
              toast("Vous suivez " + props.match.params.pseudo);
          })
          .catch(error => {
              console.log(error);
          });
         };
  
      // Fonction pour ne plus suivre
      const unFollowClickHandler = () => {
  
          // Récupérer l'id du follow
          axios.get('/follows.json?orderBy="follower"&equalTo="' + currentUser + '"')
          .then(response => {
              let followId = '';
              for (let key in response.data) {
                  if(response.data[key].followed === props.match.params.pseudo) {
                      followId = key;
                  }
              }
              // Supprimer le follow
              axios.delete('/follows/' + followId + '.json')
              .then(response => {
                  console.log(response);
  
                  // Mettre à jour le state
                  setFollows(prevFollows => prevFollows.filter(follow => follow.id !== followId));
                  toast("Vous ne suivez plus " + props.match.params.pseudo);
              })
              .catch(error => {
                  console.log(error);
              });
          })
          .catch(error => {
              console.log(error);
          });
      };


    // ComponentDidUpdate
    useEffect(() => {
        document.title = props.match.params.pseudo;
    });

    return (
        <>
            <div className={[classes.Account, 'container'].join(' ')}>
                <h2>{props.match.params.pseudo}</h2>
                <div className={classes.Account_info}>
                    <p><b>{tweets.length}</b> tweet(s)</p>
                    {follows.length >= 0 ?
                        <p><b>{follows.filter(follow => follow.followed === props.match.params.pseudo).length}</b> abonné(s)</p>
                    :
                    null}
                    {follows.length >= 0 && props.match.params.pseudo === userName ?
                        <p><b>{follows.filter(follow => follow.follower === currentUser).length}</b> abonnement(s)</p>
                    :
                    null}
                     {follows.length >= 0  ?
                    follows.filter(follow => follow.follower === currentUser && follow.followed === props.match.params.pseudo).length > 0 ?
                        <div onClick={unFollowClickHandler}><UnFollow /></div>
                    :
                        <div onClick={followClickHandler}><Follow /></div>
                :
                null}

                </div>
                
            </div>
            <h2>Les Tweets de {props.match.params.pseudo}</h2>
            <DisplayedTweets tweets={tweets} />

        </>
    );
};

export default withRouter(Account);

