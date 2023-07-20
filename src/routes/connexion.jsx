import React, {useEffect, useState, useContext} from 'react';
import salineLogoLight from '../assets/saline_logo/logo_light.svg';
import SupabaseService from "../tools/SupabaseClient";
import PasswordStrengthIndicator from "../component/passwordStrengthIndicator.jsx";
import bcrypt from 'bcryptjs';
import FlashMessage from '../component/flashMessage';
import { useNavigate } from 'react-router-dom';
import zxcvbn from 'zxcvbn';
import { AppContext } from '../AppContext';

async function loginUser(credentials, id) {
  return fetch(`http://localhost:5326/login/${id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json());
}

const Connexion = ({setToken}) => {
  const [toggle, setToggle] = useState(false);
  const [flashMessage, setFlashMessage] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [loading, setLoading] = useState(false)
  const { sessionData, setSessionData } = useContext(AppContext); 
  const supabaseService = new SupabaseService();
  const navigate = useNavigate();



  const [registerData, setRegisterData] = useState({
    firstname: '',
    lastname: '',
    password: '',
    langue: '',
    role: 'user',
    email: ''
  });

  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const handleToggle = () => {
    setToggle(!toggle);
  };
  
  const checkPasswordStrength = (password) => {
    const result = zxcvbn(password);
    return {
      score: result.score,
      feedback: result.feedback,
    };
  };


const handleRegisterSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  try {
    // Check if the email already exists in the database
    const { data: existingUsers, error } = await supabaseService.client
        .from('users')
        .select('email')
        .eq('email', registerData.email);

    if (error) {
      setFlashMessage('Error during email existence check');
    } else {
      if (existingUsers.length > 0) {
        setFlashMessage('Cette adresse email est déjà enregistrée.');
      } else {
        if(passwordStrength < 2) {
          setFlashMessage('Renforcez votre mot de passe');
          return;
        }
        // If the email doesn't exist, proceed with user registration
        const hashedPassword = await bcrypt.hash(registerData.password, 10);
        const userData = {
          ...registerData,
          password: hashedPassword,
        };

        const { data, error } = await supabaseService.client
            .from('users')
            .insert([userData]);

        if (error) {
          setFlashMessage('Il y a eu une erreur dans l\'enregistrement');
        } else {
          setFlashMessage('Vous êtes bien inscrit');
        
          setToggle(false);
          setLoading(false);
        }
      }
    }
  } catch (error) {
    console.error('Erreur lors de l\' inscription:', error);
    setLoading(false);
  }
};



  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const email = String(loginData.email).toString();
      const password = String(loginData.password).toString();
  
      const { data, error } = await supabaseService.client
          .from('users')
          .select('id, email, password')
          .eq('email', email);

      if (error) {
        setFlashMessage('Vos données ne permettent pas l\'identification');
      } else {
        if (data.length > 0) {
          // Access the hashed password from the first object in the data array
          const hashPassword = data[0].password;
          const isPasswordMatch = await bcrypt.compare(password, hashPassword);
          if (isPasswordMatch) {
            
            // Mise en place de la session utilisateur
            const idToken = data[0].id;
            idToken.toString();
            const token = await loginUser({
              email,
              password
            }, data[0].id);
            setToken(token);
            navigate("/homepage");
          } else {
            setFlashMessage('Mot de passe incorrect');
            
          }
        } else {
          setFlashMessage('Utilisateur non trouvé');
        }
      }
    } catch (error) {
      console.error('Error during login:', error);
      setLoading(false);
    }
  };


  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterData((prevData) => ({
      ...prevData,
      [name]: name === 'langue' ? value : value.trim(),
    }));
    if(name === 'password') {
      console.log(value)
    const strengthInfo = checkPasswordStrength(value);
    setPasswordStrength(strengthInfo.score);
   }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({ ...prevData, [name]: value }));
  };


  console.log('session', sessionData);
  console.log('pasword strength', passwordStrength);
  console.log('loading', loading);

  return (
      <main className="page-connexion">
            <div className="outer-connexion">
              <div className="inner-connexion">
                {flashMessage && <FlashMessage message={flashMessage}/>}
                {toggle ? (
                    <div className="container-inscription">
                      <div className="img-container">
                        <img src={salineLogoLight} alt="logo" />
                      </div>
                      <form className="form-container" onSubmit={handleRegisterSubmit} method="post">
                        <div className="form-elem">
                          <label htmlFor="email"></label>
                          <input type="email" name="email" id="email" placeholder="arnaud@ymail.com" onChange={handleRegisterChange} required  />
                        </div>
                        <div className="form-elem">
                          <div className="form-elem__inner">
                            <label htmlFor="firstname"></label>
                            <input type="text" name="firstname" id="firstname" placeholder="Prénom" onChange={handleRegisterChange} required />
                            <label htmlFor="lastname"></label>
                            <input type="text" name="lastname" id="lastname" placeholder="Nom" onChange={handleRegisterChange} required />
                          </div>
                        </div>
                        <div className="form-elem">
                          <label htmlFor="password"></label>
                          <input type="password" name="password" id="password" placeholder="Choisir un mot de passe" onChange={handleRegisterChange} required />
                        </div>
                        {passwordStrength > 0 && (
                            <PasswordStrengthIndicator strength={passwordStrength} />
                        )}

                        <div className="form-elem">
                          <button className="btn-1" type="submit">Créer son compte</button>
                        </div>
                        <div className="form-elem">
                          <p> Déjà inscris ?
                            <span className="to-connexion-link" onClick={handleToggle}> Se connecter</span></p>
                        </div>
                      </form>
                    </div>
                ) : (
                    <div className="container-connexion">
                      <div className="img-container">
                        <img src={salineLogoLight} alt="logo" />
                      </div>
                      <div className="form-container">
                        <form id="login-form" method="post" onSubmit={handleLoginSubmit}>
                          <div className="form-elem">
                            <label htmlFor="email" className="connexion__username"></label>
                            <input type="text" name="email" id="email" placeholder="arnaud@ymail.com" onChange={handleChange} required />
                          </div>
                          <div className="form-elem">
                            <input type="password" name="password" id="password" placeholder="Mot de passe" onChange={handleChange} required />
                          </div>
                          <div className="form-elem">
                            <button type="submit" className="btn-1">Se connecter</button>
                          </div>
                          <div className="form-elem">
                            <p>
                              <span className="to-connexion-link" onClick={handleToggle}>Créer son compte</span>
                            </p>
                          </div>
                        </form>
                      </div>
                    </div>
                )}
              </div>
            </div>
      </main>
  );
};

export default Connexion;