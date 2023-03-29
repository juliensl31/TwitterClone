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
            value: props.location.state && props.location.state.tweet ? props.location.state.tweet.titre : '',
            label: 'Titre',
            valid: props.location.state && props.location.state.tweet ? true : false,
            validation: {
                required: true,
                minLength: 5,
                maxLength: 85
            },
            touched: false,
            errorMessage: 'Le titre doit faire entre 5 et 85 caractères.'
        },
        accroche: {
            elementType: 'textarea',
            elementConfig: {},
            value: props.location.state && props.location.state.tweet ? props.location.state.tweet.accroche : '',
            label: "Accroche",
            valid: props.location.state && props.location.state.tweet ? true : false,
            validation: {
                required: true,
                minLength: 10,
                maxLength: 140
            },
            touched: false,
            errorMessage: "L'accroche ne doit pas être vide et doit être comprise entre 10 et 140 caractères."
        },
        contenu: {
            elementType: 'textarea',
            elementConfig: {},
            value: props.location.state && props.location.state.tweet ? props.location.state.tweet.contenu : '',
            label: "Contenu",
            valid: props.location.state && props.location.state.tweet ? true : false,
            validation: {
                required: true
            },
            touched: false,
            errorMessage: 'Le contenu ne doit pas être vide.'
        },
        hashtag: {
            elementType: 'textarea',
            elementConfig: {},
            value: props.location.state && props.location.state.tweet ? props.location.state.tweet.hashtag : '',
            label: "Hashtag",
            valid: props.location.state && props.location.state.tweet ? true : false,
            validation: {
                required: true
            },
            touched: false,
            errorMessage: 'Les hashtags ne doivent pas être vide.'
        }
    });

    const [valid, setValid] = useState(props.location.state && props.location.state.tweet ? true : false);

    // ComponentDidUpdate
    useEffect(() => {
        document.title = "Mon compte";
    });

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

    const strRandom = (auteur) => {
        let a = 10,
            b = 'abcdefghijklmnopqrstuvwxyz',
            c = '',
            d = 0,
            e = ''+b;
        if (auteur) {
          if (auteur.startsWithLowerCase) {
            c = b[Math.floor(Math.random() * b.length)];
            d = 1;
          }
          if (auteur.length) {
            a = auteur.length;
          }
          if (auteur.includeUpperCase) {
            e += b.toUpperCase();
          }
          if (auteur.includeNumbers) {
            e += '1234567890';
          }
        }
        for (; d < a; d++) {
          c += e[Math.floor(Math.random() * e.length)];
        }
        return c;
    };

    const formHandler = event => {
        event.preventDefault();

        const slug = generateSlug(inputs.titre.value);
        const auteur = strRandom();

        const tweet = {
            titre: inputs.titre.value,
            contenu: inputs.contenu.value,
            accroche: inputs.accroche.value,
            hashtag: inputs.hashtag.value,
            date: Date.now(),
            slug: slug,
            auteur: auteur
        };

        fire.auth().currentUser.getIdToken()
            .then(token => {

                if(props.location.state && props.location.state.tweet) {
                    axios.put('/tweets/' + props.location.state.tweet.id + '.json?auth=' + token, tweet)
                    .then(response => {
                        console.log(response);
                        toast.success('tweet modifié avec succès');
                        props.history.replace(routes.TWEETS + '/' + tweet.slug);
                    })
                    .catch(error => {
                        console.log(error);
                    });
                }
                else {
                    axios.post('/tweets.json?auth=' + token, tweet)
                        .then(response => {
                            console.log(response);
                            toast.success('tweet ajouté avec succès');
                            props.history.replace(routes.TWEETS);
                        })
                        .catch(error => {
                            console.log(error);
                        });
                }
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
                <input type="submit" value={props.location.state && props.location.state.tweet ? 'Modifier un tweet' : 'Ajouter un tweet'} disabled={!valid} />
            </div>
        </form>
    );

    return (
        <div className="container">
            {props.location.state && props.location.state.tweet ?
                <h1>Modifier</h1>
                :
                <h1>Ajouter</h1>
            }
            {form}
        </div>
    );
}

export default ManageTweet;