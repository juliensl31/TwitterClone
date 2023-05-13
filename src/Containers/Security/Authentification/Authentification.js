// Librairies
import React, { useState } from 'react';
import { checkValidity } from '../../../shared/utility';
import classes from './Authentification.module.css';
import fire, { provider } from '../../../config/firebase';

// Composant
import Input from '../../../Components/UI/Input/Input';
import routes from '../../../config/routes';
import { toast } from 'react-toastify';
import LogoGoogle from '../../../Components/UI/Logo/LogoGoogle';
import axios from '../../../config/axios-firebase';

function Authentification(props) {

    // States
    const [inputs, setInputs] = useState({
        pseudo: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: "Pseudo"
            },
            value: '',
            label: 'pseudo',
            valid: true,
            validation: {
                required: true
            },
            touched: false,
            errorMessage: "Le pseudo n'est pas valide."
        },
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: "Email"
            },
            value: '',
            label: 'email',
            valid: false,
            validation: {
                required: true,
                email: true
            },
            touched: false,
            errorMessage: "L'email n'est pas valide."
        },
        password: {
            elementType: 'input',
            elementConfig: {
                type: 'password',
                placeholder: "Mot de passe"
            },
            value: '',
            label: 'Mot de passe',
            valid: false,
            validation: {
                required: true,
                minLength: 6
            },
            touched: false,
            errorMessage: "Le mot de passe doit faire au moins 6 caractères."
        }
    });

    const [valid, setValid] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [loginError, setLoginError] = useState(false);
    // eslint-disable-next-line
    let displayName;
    // let photoURL;  

    // Fonctions
    const inputChangedHandler = (event, id) => {

        // Change la valeur
        const nouveauxInputs = {...inputs};
        nouveauxInputs[id].value = event.target.value;
        nouveauxInputs[id].touched = true;

        // Vérification de la valeur
        nouveauxInputs[id].valid = checkValidity(event.target.value, nouveauxInputs[id].validation);

        setInputs(nouveauxInputs);

        // Vérification du formulaire
        let formIsValid = true;
        for (let input in nouveauxInputs) {
            formIsValid = nouveauxInputs[input].valid && formIsValid;
        }
        setValid(formIsValid);
    };

     // Concaténer et capitaliser le pseudo 
    const toCapitalizeFirst = str => {
        const capitalizeFirst = str
            .toLowerCase()
            .split(' ')
            .map(word => {
            return word.charAt(0).toUpperCase() + word.slice(1);
            })
            .join('');
        
            return capitalizeFirst;
        };

    const registerClickedHandler = () => {
        
        const user = {
            email: inputs.email.value,
            password: inputs.password.value
        };

        
        fire.auth()
            .createUserWithEmailAndPassword(user.email, user.password)
            .then(response => {
                toast('Bienvenue');
                props.history.push(routes.HOME);
            })
            .catch(error => {
                switch (error.code) {
                    case 'auth/email-already-in-use':
                        setEmailError(true);
                        break;
                    default:
                        break;
                }
            });

           fire.auth().onAuthStateChanged( (user) => {
            if (user) {
                user.updateProfile({ 
                displayName: '@' + toCapitalizeFirst(inputs.pseudo.value),
                // photoURL: "https://example.com/jane-q-user/profile.jpg"
                })
                .then(response => {
                    const accountInformation = {
                        pseudo: '@' + toCapitalizeFirst(inputs.pseudo.value),
                        follow: false,
                        user_id: user.uid
                    };
                    axios.post('/users.json', accountInformation)
                    .then(response => {
                        console.log(response);
                    })
                    .catch(error => {
                        console.log(error);
                    });
                    displayName = user.displayName;
                    // photoURL = user.photoURL;
                })
                .catch(error => {
                    console.log(error);
                });     
            }
        });
            
    };

    const loginClickedHandler = () => {

        const user = {
            email: inputs.email.value,
            password: inputs.password.value
        };

        fire.auth()
            .signInWithEmailAndPassword(user.email, user.password)
            .then(response => {
                toast('Vous revoici !');
                props.history.push(routes.HOME);
            })
            .catch(error => {
                switch(error.code) {
                    case "auth/invalide-email":
                    case "auth/user-disabled":
                    case "auth/user-not-found":
                        setLoginError(true);
                        break;
                    default:
                        break;
                }
            });
        }

    const loginGoogleClickedHandler = () => {

        fire.auth().signInWithPopup(provider)
        .then(response => {
            toast('Bienvenue');
            props.history.push(routes.HOME);
        })
        .catch(error => {
           console.log(error);
        });

        fire.auth().onAuthStateChanged( (user) => {
            if (user) {
                user.updateProfile({ 
                displayName: '@' + toCapitalizeFirst(inputs.pseudo.value),
                // photoURL: "https://example.com/jane-q-user/profile.jpg"
                })
                .then(response => {
                const accountInformation = {
                    pseudo: '@' + toCapitalizeFirst(inputs.pseudo.value),
                    follow: false,
                    user_id: user.uid
                };
                axios.post('/users.json', accountInformation)
                .then(response => {
                    console.log(response);
                })
                .catch(error => {
                    console.log(error);
                });
                    displayName = user.displayName;
                    // photoURL = user.photoURL;
                })
                .catch(error => {
                    console.log(error);
                });     
            }
        });
    };
    

    const formHandler = event => {
        event.preventDefault();
    };

    // Variables
    const formElementsArray = [];
    for (let key in inputs) {
        formElementsArray.push({
            id: key,
            config: inputs[key]
        });
    };

    let form = (
        <form onSubmit={(e) => formHandler(e)}>
            <h1>Authentification</h1>
            {formElementsArray.map(formElement => (
                <Input
                    key={formElement.id}
                    id={formElement.id}
                    value={formElement.config.value}
                    label={formElement.config.label}
                    type={formElement.config.elementType}
                    config={formElement.config.elementConfig}
                    valid={formElement.config.valid}
                    touched={formElement.config.touched}
                    errorMessage={formElement.config.errorMessage}
                    changed={(e) => inputChangedHandler(e, formElement.id)} />
            ))}
            <div className={classes.buttons}>
                    <button onClick={registerClickedHandler} disabled={!valid} className={classes.button}>Inscription</button>
                    <button onClick={loginClickedHandler} disabled={!valid} className={classes.button}>Connexion</button>  
                    <button className={classes.buttonGoogle} disabled={!inputs.pseudo.value} onClick={loginGoogleClickedHandler}>Se connecter avec Google<LogoGoogle/></button>


            </div>
        </form>
    );

    return (
        <>
            <div className={classes.form}>
                {loginError ? <div className={classes.alert}>Impossible de vous authentifier.</div> : null }
                {emailError ? <div className={classes.alert}>Cette adresse email est déjà utilisée.</div> : null }
                {form}
            </div>
        </>
    );
}

export default Authentification;