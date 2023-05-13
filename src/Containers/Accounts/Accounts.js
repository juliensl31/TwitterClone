import React, { useEffect, useState } from "react";
import classes from './Accounts.module.css';
import axios from "../../config/axios-firebase";
import DisplayedAccounts from "../../Components/DisplayedAccounts/DisplayedAccounts";

function Accounts() {

    const [accounts, setAccounts] = useState([]);

    useEffect(() => {
        axios.get('/users.json')
        .then(response => {
            let newAccounts = [];
            for (let key in response.data) {
                newAccounts.push({
                    ...response.data[key],
                    id: key
                });
            }
            setAccounts(newAccounts);
        })
        .catch(error => {
            console.log(error);
        });
    }, []);

    useEffect(() => {
        document.title = 'Comptes';
    });


    return (
        <div > 
            <h1>Comptes</h1>
            <p>Voici la liste des comptes</p>
            <div className={classes.Accounts}>
                <DisplayedAccounts accounts={accounts}/>
            </div>
            
        </div>
    );
}


export default Accounts;