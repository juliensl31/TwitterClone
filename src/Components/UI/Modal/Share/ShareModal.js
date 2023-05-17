// Librairies
import React, { useState } from 'react';
import classes from './ShareModal.module.css';


function ShareModal(props) {

  // State
  const [showShareModal, setShowShareModal] = useState(false);

  // Fonctions pour afficher ou cacher le modal
  const showShareModalHandler = () => {
    setShowShareModal(true);
  };

  const hideShareModalHandler = () => {
    setShowShareModal(false);
  };

  return (
    <>
     <svg onClick={showShareModalHandler} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
        <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
        <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z"/>
    </svg> 

      {showShareModal && (
        <div className={classes.ShareModal}>
          <div className={classes.ShareModalContent}>
            <div className={classes.header}>
                <h3>Partager avec ...</h3>
                <button className={classes.closeButton} onClick={hideShareModalHandler}>X</button>    
            </div>
            {props.children}
          </div>
        </div>
      )}
    </>
  );
}

export default ShareModal;