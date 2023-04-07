// Librairie
import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from '../../../config/axios-firebase';
import routes from '../../../config/routes';
import classes from './Tweet.module.css';
import moment from 'moment';
import 'moment/locale/fr';


function Tweet(props) {

    // State
    const [tweet, setTweet] = useState({});

    // ComponentDidMount
    useEffect(() => {
        axios.get('/tweets.json?orderBy="slug"&equalTo="'+ props.match.params.slug +'"')
        .then(response =>{

            if(Object.keys(response.data).length === 0) {
                console.log(response);
                toast.error("Cet tweet n'existe pas !");
                props.history.push(routes.HOME);
            }
         
            for (let key in response.data) {
                setTweet({
                    ...response.data[key],
                    id: key
                });
            }
        })
        .catch(error => {
            console.log(error);
        });

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        document.title = tweet.titre;
    });

    // Fonctions
    const deleteClickedHandler = () => {

        props.user.getIdToken()
        .then(token => {
            axios.delete('/tweets/' + tweet.id + '.json?auth=' + token)
                .then(response =>{
                    toast('Tweet supprimé avec succès.');
                    props.history.push(routes.HOME);
                })
                .catch(error => {
                    console.log(error);
                });
        })
        .catch(error => {
            console.log(error);
        });
    }

    // Variable
    // let date = new Date(tweet.date).toLocaleDateString('fr-FR');
    moment.locale('fr');
    let date = moment.unix(tweet.date / 1000).calendar();

    // let contenu = '';
    // if(tweet.contenu) {
    //     contenu  = tweet.contenu.split('\n').map(str => <p>{str}</p>)
    // }

    return (
        <div className='container'>
            <h1>{tweet.titre}</h1>
            <div className={classes.section}>
                <div className={classes.lead}>
                    {tweet.accroche}
                </div>
                <div className={classes.content}>
                   {tweet.contenu} 
                </div>
                

                {props.user ? 
                
                    <div className={classes.button}>
                        <Link to={{pathname: routes.MANAGE_TWEET, state: { tweet: tweet }}}>
                            <button>Modifier</button> 
                        </Link>
                            <button onClick={deleteClickedHandler}>Supprimer</button>  
                    </div> 
                    
                    :
                    
                    null
                }
                
            </div>
            <div className={classes.author}>
                <b>{tweet.auteur}</b>
                <span>
                    Publié {date}.
                </span>
            </div>
           
        </div>
    );
}

export default withRouter(Tweet);