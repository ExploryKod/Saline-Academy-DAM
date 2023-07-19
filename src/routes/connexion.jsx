import React, {useEffect, useState} from 'react';
import salineLogoLight from '../assets/saline_logo/logo_light.svg';
import SupabaseService from "../tools/SupabaseClient";
import PasswordStrengthIndicator from "../component/passwordStrengthIndicator.jsx";
import bcrypt from 'bcryptjs';
import FlashMessage from '../component/flashMessage';
import { useNavigate } from 'react-router-dom';
import zxcvbn from 'zxcvbn';
import jwt_decode from "jwt-decode";


const Connexion = () => {
  const [toggle, setToggle] = useState(false);
  const [flashMessage, setFlashMessage] = useState('');
  const [sessionStatus, setSessionStatus] = useState({});
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [loading, setLoading] = useState(false)

  const supabaseService = new SupabaseService();
  const navigate = useNavigate();

  const [registerData, setRegisterData] = useState({
    firstname: '',
    lastname: '',
    password: '',
    langue: '',
    role: 'user',
    email: '',
  });

  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const handleToggle = () => {
    setToggle(!toggle);
  };


  const checkUserSession = () => {
    const jwtToken = localStorage.getItem("jwtToken");
    if (jwtToken) {
      const decodedToken = jwt_decode(jwtToken);
      const currentTime = Date.now() / 1000; // Convert to seconds
      if (decodedToken.exp < currentTime) {
        // Token has expired, clear the user session
        clearUserSession();
      } else {
        // Token is valid, set the user session status
        setSessionStatus({ session: true });
      }
    }
  };
  
  const clearUserSession = () => {
    localStorage.removeItem("jwtToken");
    setSessionStatus({ session: false });
  };
  
  useEffect(() => {
    checkUserSession();
  }, []);

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
          // Saving JWT in local storage if successful registration 
          // TODO: implement better security session management (https://hasura.io/blog/best-practices-of-using-jwt-with-graphql/)
          // const jwtToken = createJwtToken(data[0].id); 
          // localStorage.setItem("jwtToken", jwtToken);
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
      // const token = localStorage.getItem("jwtToken");
      // const decoded = jwt_decode(token);
  
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
            setLoading(false);
            setFlashMessage('Bienvenue !');
            // Session 
            // const jwtToken = createJwtToken(data[0].id); 
            // localStorage.setItem("jwtToken", jwtToken);

            // Redirect
            navigate(`/homepage/${data[0].id}`);
          } else {
            setFlashMessage('Mot de passe incorrect');
            setLoading(false);
          }
        } else {
          setFlashMessage('Utilisateur non trouvé');
          setLoading(false);
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


  console.log('session', sessionStatus);
  console.log('pasword strength', passwordStrength);
  console.log('loading', loading);

  return (
      <main className="page-connexion">
        {!sessionStatus.session ? (
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
        ): (<div className="no-session">Vous êtes déjà connecté</div>)}
      </main>
  );
};

export default Connexion;