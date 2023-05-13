// MLibrairie
import React from 'react';
import DisplayedAccount from './DisplayedAccount/DisplayedAccount';
import classes from './DisplayedAccounts.module.css';

function DisplayedAccounts(props) {

    let accounts = props.accounts.map(account => (
        <DisplayedAccount key={account.id} account={account}/>
    ));

    return (
        <section className={[classes.DisplayedAccounts, 'container'].join(' ')}>
            {accounts}
        </section>

    );
    
}

export default DisplayedAccounts;