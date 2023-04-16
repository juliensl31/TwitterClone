import React, { useEffect, useState } from "react";
import fire from "../../config/firebase";

function Accounts() {

    //State
    // eslint-disable-next-line
    const [user, setUser] = useState(' ');

    //ComponentDidMount
    useEffect(() => {
        authListener();
    },[]);

    const authListener = () => {
        fire.auth().onAuthStateChanged(user => {
        if(user) {
            setUser(user);
        }
        else {
            setUser('')
        }
        });
    } ;

    return (
        <>
            <h1>Mes Abonnements</h1>
            <p>
                
            </p>
        </>
    );
}


export default Accounts;