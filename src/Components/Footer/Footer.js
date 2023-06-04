import React from 'react';
import classes from './Footer.module.css';


function Footer() {

    // Affichage du copyright + date automatique
    let date = new Date().getFullYear();
 
    return (
        <footer className={classes.Footer}>
            <div className="container">
                {date} <a href="http://jslcode.com/"> © JSL Code</a> 
            </div>
            
        </footer>
    );
}

export default Footer;