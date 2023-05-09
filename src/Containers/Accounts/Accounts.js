import React from "react";
import Account from "./Account/Account";
import classes from './Accounts.module.css';

function Accounts() {

    return (
        <div > 
            <h1>Comptes</h1>
            <p>Voici la liste des comptes</p>
            <div className={classes.Accounts}>
              <Account/>  
            </div>
            
        </div>
    );
}


export default Accounts;