import React, { useState } from 'react';
import classes from './ResponseModal.module.css';


function ResponseModal(props) {
  const [showResponseModal, setShowResponseModal] = useState(false);

  const showResponseModalHandler = () => {
    setShowResponseModal(true);
  };

  const hideResponseModalHandler = () => {
    setShowResponseModal(false);
  };

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
            <div className={classes.body}>
              <textarea className={classes.textarea} placeholder="Quoi de neuf ?"></textarea>
              <button className={classes.button}>Répondre</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ResponseModal;