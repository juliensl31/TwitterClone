// Librairie
import React, { useEffect, useState } from 'react';
import classes from './ManageTweet.module.css';
import axios from '../../../config/axios-firebase';
import routes from '../../../config/routes';
import { checkValidity } from '../../../shared/utility';
import fire from '../../../config/firebase';
import { toast } from 'react-toastify';

// Composant
import Input from '../../../Components/UI/Input/Input';

function ManageTweet(props) {

    // States
    const [inputs, setInputs] = useState({
        titre: {
            elementType: 'input',
            elementConfig: {
                type: 'text'
            },
            value: '',
            label: 'Titre',
            valid: false,
            validation: {
                required: true,
                minLength: 5,
                maxLength: 85
            },
            touched: false,
            errorMessage: 'Le titre doit faire entre 5 et 85 caractères.'
        },
        contenu: {
            elementType: 'textarea',
            elementConfig: {},
            value: '',
            label: "Contenu",
            valid: false,
            validation: {
                required: true
            },
            touched: false,
            errorMessage: 'Le contenu ne doit pas être vide.'
        },
        hashtag: {
            elementType: 'textarea',
            elementConfig: {},
            value: '',
            label: "Hashtag",
            valid: false,
            validation: {
                required: true
            },
            touched: false,
            errorMessage: 'Les hashtags ne doivent pas être vide.'
        }
    });

    //State
    const [user, setUser] = useState(' ');
    const [valid, setValid] = useState(false);

    // ComponentDidUpdate
    useEffect(() => {
        document.title = "Mon compte";
    });

    // ComponentDidMount
    useEffect(() => {
        authListener();
    },[]);

    // Fonction pour vérifier si l'utilisateur est connecté
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

    // Fonction de changement de valeur
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

    // Générer un slug
    const generateSlug = str => {
        str = str.replace(/^\s+|\s+$/g, ''); // trim
        str = str.toLowerCase();
      
        // remove accents, swap ñ for n, etc
        var from = "àáãäâèéëêìíïîòóöôùúüûñç·/_,:;";
        var to   = "aaaaaeeeeiiiioooouuuunc------";
    
        for (var i=0, l=from.length ; i<l ; i++) {
            str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
        }
    
        str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
            .replace(/\s+/g, '-') // collapse whitespace and replace by -
            .replace(/-+/g, '-'); // collapse dashes
    
        return str;
    };

    // Fonction pour envoyer le formulaire
    const formHandler = event => {
        event.preventDefault();

        // Créer un slug
        const slug = generateSlug(inputs.titre.value);

        // Créer un objet tweet
        const tweet = {
            titre: inputs.titre.value,
            contenu: inputs.contenu.value,
            hashtag: inputs.hashtag.value,
            date: Date.now(),
            slug: slug,
            auteur: user.displayName,
            user_id: user.uid
        };

        // Envoyer le tweet
        fire.auth().currentUser.getIdToken()
            .then(token => {
                axios.post('/tweets.json?auth=' + token, tweet)
                    .then(response => {
                        console.log(response);
                        toast('tweet ajouté avec succès');
                        props.history.replace(routes.TWEETS);
                    })
                    .catch(error => {
                        console.log(error);
                    });
                })
            .catch(error => {
                console.log(error);
            });
    };

    // Variables
    const formElementsArray = [];
    for (let key in inputs) {
        formElementsArray.push({
            id: key,
            config: inputs[key]
        });
    };

    // Formulaire
    let form = (
        <form className={classes.Ajouter} onSubmit={(e) => formHandler(e)}>
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
            <div className={classes.submit}>
                <input type="submit" value="Ajouter un tweet" disabled={!valid} />
            </div>
        </form>
    );

    return (
        <div className="container">
            <h1>Ajouter</h1>
            {form}
        </div>
    );
}

export default ManageTweet;