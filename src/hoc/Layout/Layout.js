// Librairie
import React from 'react';
import classes from './Layout.module.css';
import 'react-toastify/dist/ReactToastify.css';

// Composant
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import { ToastContainer } from 'react-toastify';
import Authentification from '../../Containers/Security/Authentification/Authentification';
import Account from '../../Components/UI/Account/Account';


function Layout(props) {
    return (
        <div className={classes.Layout}>
            <div className={classes.body}>
                <div>
                  <Header user={props.user}/>  
                </div>

                <div className={[classes.content, 'container'].join(' ')}>
                    {props.children}    
                </div>

                <div className={classes.auth}>
                   {!props.user ? <Authentification/> : <Account/> }
                </div>

                <ToastContainer 
                    autoClose="10000" 
                    // hideProgressBar="false" 
                    // closeOnClick="false" 
                    pauseOnHover="true" 
                    position='bottom-right' 
                />   
                </div>
            <Footer />
        </div>
    );
}

/*
    - Header
        - logo
        - Navigation
            - NavigationItem
*/

export default Layout;