import React, { useState, useEffect } from "react";
import axios from "../../../config/axios-firebase";
import classes from "./Account.module.css";

// Functions
function Account(props) {

    // States
    const [user, setUser] = useState([]);

    useEffect(() => {

        // Axios
        axios.get('/users.json')
        .then(response => {
            const newUser = [];
            
            for (let key in response.data) {
            newUser.push({
                ...response.data[key],
                id: key
            });
            }
            setUser(newUser);
        })
        .catch(error => {
            console.log(error);
        });
    
    return () => {
        console.log('[App.js] useEffect (didUnmount)');
    }
    }, []);

    return (
        <>
        {user.map(user => ( 
        <div className={classes.Account} key={user.id}>
            {!user.follow === true ? <p>{user.pseudo}</p> : null}
        </div>
        ))}
        </>
    );
};

export default Account;

