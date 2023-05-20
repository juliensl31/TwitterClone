// Librairies
import React, { useEffect, useState } from "react";
import axios from "../../../config/axios-firebase";
import classes from "./Followed.module.css";


function Followed(props) {

    const [followed, setFollowed] = useState([]);
    const [accounts, setAccounts] = useState([]);
    const userName = props.user.displayName;
    const currentUser = props.user.uid;

    // ComponentDidMount
    useEffect(() => {
        axios.get('/users.json')
        .then(response =>{

            let accountsArray = [];

            for (let key in response.data) {
                accountsArray.push({
                    ...response.data[key],
                    id: key
                });
            }

            // Mise à jour du state
            setAccounts(accountsArray);
        })
        .catch(error => {
            console.log(error);
        });
    }, []);


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
            setFollowed(followsArray);
        })
        .catch(error => {
            console.log(error);
        });
    }, []);

    return (
        <div>
        <h1>Vos comptes suivis</h1>
        {followed.map(follow => (
            <div key={follow.id} >
                {follow.follower === currentUser ? 
                <div className={classes.Followed}>
                    <h2>{follow.followed}</h2> 
                </div>
                :
                    null
                }
            </div>
        ))}
        
        </div>
    );
}


export default Followed;