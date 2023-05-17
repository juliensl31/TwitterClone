// Librairies
import React, { useEffect, useState } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import routes from './config/routes';
import fire from './config/firebase';

// Composants
import Layout from './hoc/Layout/Layout';
import Home from './Containers/Home/Home';
import Contact from './Components/Contact/Contact';
import Tweets from './Containers/Tweets/Tweets';
import Tweet from './Containers/Tweets/Tweet/Tweet';
import ManageTweet from './Containers/Admin/ManageTweet/ManageTweet';
import Authentification from './Containers/Security/Authentification/Authentification';
import Accounts from './Containers/Accounts/Accounts';
import Account from './Containers/Accounts/Account/Account';

function App() {

  //State
  const [user, setUser] = useState(' ');

  //ComponentDidMount
  useEffect(() => {
    authListener();
  },[]);

  // Authentification
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
    <div className="App">
      <Layout user={user}>
        <Switch>
          <Route exact path={routes.HOME} component={Home} />
          <Route path={routes.CONTACT} component={Contact} />
          <Route exact path={routes.TWEETS} component={Tweets} />
          <Route exact path={routes.TWEETS + "/:slug"} render={() => <Tweet user={user} />} />
          <Route exact path={routes.ACCOUNTS} component={Accounts}/>
          <Route exact path={routes.ACCOUNTS + "/:pseudo"} render={() => <Account/>} />
          {user ? <Route exact path={routes.MANAGE_TWEET} component={ManageTweet} /> : null}
          {!user ? <Route exact path={routes.AUTHENTIFICATION} component={Authentification} /> : null}
          <Route render={() => <h1>404</h1>} />
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
