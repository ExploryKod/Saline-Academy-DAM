import React, { useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';

export const EmailForm = ({onClose, manager}) => {

  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    // ajoutez les élèments issu de emailjs si besoin de restaurer l'envoi d'email
    emailjs.sendForm('', '', form.current, '')
      .then((result) => {
          console.log('Envoi email', result.text);
      }, (error) => {
          console.log(error.text);
      });
  };



  
  return (
    <div onClick={onClose} className={`email-modal-wrapper`}>
      <div className={`email-modal`}>
      <form className="email-form" ref={form} onSubmit={sendEmail}>
      <h2>Contacter {manager.firstname} {manager.lastname}</h2>
      <div className="s-input-wrapper">
        <label htmlFor='objet'>Objet</label>
        <input id='objet' type="text" name="user_name" className="s-input-light" />
      </div>
    
      <div className="s-input-wrapper">
        <label htmlFor='user_email'>Email</label>
        <input className="s-input-light" type="email" id="user_email" name="user_email" />
      </div>
      <div className="s-input-wrapper email-textarea-wrapper">
        <label htmlFor='message'>Message</label>
        <textarea name="message"
                  id='message' 
                  className="s-input-light s-textarea-size no-resize" 
                  rows="100" 
                  cols="30"
                  minLength="10" 
                  maxLength="500" 
                  placeholder="Ecrivez votre message" />
      </div>
      <div className="s-input-wrapper">
      <button className="btn-1 s-input-submit-purple" type="submit">Envoyer</button>
    </div>
      
    </form>
      </div>
    </div>
   
  );
};