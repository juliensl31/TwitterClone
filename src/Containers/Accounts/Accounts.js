// Librairies
import React, { useEffect, useState } from "react";
import classes from './Accounts.module.css';
import axios from "../../config/axios-firebase";

// Composants
import DisplayedAccounts from "../../Components/DisplayedAccounts/DisplayedAccounts";

function Accounts() {

    // State
    const [accounts, setAccounts] = useState([]);

    // Récupérer les comptes
    useEffect(() => {
        // Récupérer les comptes
        axios.get('/users.json')
        .then(response => {
            // Mettre les données dans un tableau
            let newAccounts = [];
            for (let key in response.data) {
                newAccounts.push({
                    ...response.data[key],
                    id: key
                });
            }
            // Mettre à jour le state
            setAccounts(newAccounts);
        })
        .catch(error => {
            console.log(error);
        });
    }, []);

    // ComponentDidUpdate
    useEffect(() => {
        document.title = 'Comptes';
    });


    return (
        <div className={classes.Accounts} > 
            <h1>Comptes</h1>
            <DisplayedAccounts accounts={accounts}/>
        </div>
    );
}


export default Accounts;