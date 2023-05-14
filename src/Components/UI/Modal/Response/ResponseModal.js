import React, { useEffect, useState } from 'react';
import classes from './ResponseModal.module.css';
import axios from '../../../../config/axios-firebase';
import fire from '../../../../config/firebase';
import { checkValidity } from '../../../../shared/utility';

// Composant
import Input from '../../../UI/Input/Input';
import { toast } from 'react-toastify';


function ResponseModal(props) {
  
  // States
  const [showResponseModal, setShowResponseModal] = useState(false);
  const [valid, setValid] = useState(false);
  const [user, setUser] = useState(' ');
  const [tweets, setTweets] = useState([]);
  // eslint-disable-next-line
  const [responses, setResponses] = useState([]);

  const [inputs, setInputs] = useState({
    contenu: {
      elementType: 'textarea',
      elementConfig: {},
      value: '',
      valid: false,
      validation: {
        required: true,
        minLength: 5,
        maxLength: 85
      },
      touched: false,
      errorMessage: 'Le contenu ne doit pas être vide.'
    }
  });

  const showResponseModalHandler = () => {
    setShowResponseModal(true);
  };

  const hideResponseModalHandler = () => {
    setShowResponseModal(false);
  };

  // ComponentDidUpdate
  useEffect(() => {
    document.title = "Mon compte";
  });

  //ComponentDidMount
  useEffect(() => {
    fetchTweet();
  }, []);



  useEffect(() => {
    authListener();
  }, []);

  const authListener = () => {
    fire.auth().onAuthStateChanged(user => {
      if (user) {
        setUser(user);
      }
      else {
        setUser('')
      }
    });
  };

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

const fetchTweet = () => {
  axios.get('/tweets/.json')
      .then(response => {
        const tweets = [];
        for (let key in response.data) {
          tweets.push({
            id: key,
            ...response.data[key]
          });
        }
        setTweets(tweets);
      })
        .catch(error => {
        console.log(error);
      });
};

useEffect (() => {
  axios.get('/responses.json')
      .then(response => {
        const responses = [];
        for (let key in response.data) {
          responses.push({
            id: key,
            ...response.data[key]
          });
        }
        responses.reverse();
        // responses.filter(response => response.tweet_id === tweets[0].id);
        setResponses(responses);

      })
        .catch(error => {
        console.log(error);
      });
});

const formHandler = event => {
  event.preventDefault();

  const response = {
      contenu: inputs.contenu.value,
      date: Date.now(),
      auteur: user.displayName,
      tweet_id: tweets[0].id
  };

  fire.auth().currentUser.getIdToken()
      .then(token => {
          axios.post('/responses.json?auth=' + token, response)
              .then(response => {
                  console.log(response);
                  toast('réponse ajouté avec succès');
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
            <input type="submit" value="Poster" disabled={!valid} />
        </div>
    </form>
);

  return (
    
    <>
    <svg onClick={showResponseModalHandler} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
        <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-2.5a2 2 0 0 0-1.6.8L8 14.333 6.1 11.8a2 2 0 0 0-1.6-.8H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2.5a1 1 0 0 1 .8.4l1.9 2.533a1 1 0 0 0 1.6 0l1.9-2.533a1 1 0 0 1 .8-.4H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
    </svg>

      {showResponseModal && (
        <div className={classes.ResponseModal}>
          <div className={classes.ResponseModalContent}>
            <div className={classes.header}>
                <h3>Répondre ...</h3>
                <button className={classes.closeButton} onClick={hideResponseModalHandler}>X</button>    
            </div>
            {user ? form : <p>Vous devez être connecté pour répondre à un tweet.</p>}
            

         </div>
        </div>
      )}
    </>
  );
}

export default ResponseModal;