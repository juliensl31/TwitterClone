// Librairies
import React, { useEffect } from 'react';
import classes from './Contact.module.css';
import { Route } from 'react-router-dom';

function Contact(props) {

    useEffect(() => {
        document.title = 'Contact';
    });

    // Fonctions
    const emailClickedHandler = () => {
        props.history.push(props.match.url + '/email');
    }

    const callClickedHandler = () => {
        props.history.push(props.match.url + '/telephone');
    }

    return (
        <>
            <h1>Contact</h1>
            <p>Par quel moyen de contact souhaitez-vous échanger ?</p>
            <button onClick={emailClickedHandler} className={classes.button}>Email</button>
            <button onClick={callClickedHandler} className={classes.button}>Téléphone</button>
        
            <Route path={props.match.url + "/email"} render={() => <a href="mailto:johndoe@google.fr"><p>johndoe@google.fr</p></a> } />
            <Route path={props.match.url + "/telephone"} render={() => <a href="tel:+33606060606"><p>06 06 06 06 06</p></a> } />
        </>
    );
}

export default Contact;