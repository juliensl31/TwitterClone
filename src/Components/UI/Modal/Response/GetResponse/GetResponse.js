import React, { useState, useEffect } from 'react';
import axios from '../../../../../config/axios-firebase';
import classes from './GetResponse.module.css';
import moment from 'moment';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import routes from '../../../../../config/routes';

function GetResponse(props) {
  
    // State  
    const [responses, setResponses] = useState([]);

    // ComponentDidMount
    useEffect(() => {
    axios.get('/responses.json')
        .then(response => {
        const responseData = response.data;
        const fetchedResponses = [];
        for (let key in responseData) {
            fetchedResponses.push({
            ...responseData[key],
            id: key,
            });
        }
        fetchedResponses.reverse();
        setResponses(fetchedResponses);
        })
        .catch(error => {
        console.log(error);
        });
    }, []);



    return (
        <div className={classes.GetResponse}>
            {responses.map(response => (
                <div key={response.id}>
                    <p className={classes.content}>{response.contenu}</p>
                    <div >
                        <div className={classes.footer}>
                            <div>Publié par : <Link to={routes.ACCOUNTS + '/' + response.auteur}><b>{response.auteur}</b></Link></div> 
                            <small>{moment(response.date).fromNow()}</small>   
                        </div>
                    </div>
                </div>
            ))}
            
        </div>
    );
}

export default GetResponse;
