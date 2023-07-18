import React, {useEffect, useState} from 'react';
import salineLogoLight from '../assets/saline_logo/logo_light.svg';
import SupabaseService from "../tools/SupabaseClient";
import bcrypt from 'bcryptjs';
import FlashMessage from '../component/flashMessage';
import { useNavigate } from 'react-router-dom';

const Connexion = () => {
  const [toggle, setToggle] = useState(false);
  const [auth, setAuth] = useState([]);
  const [flashMessage, setFlashMessage] = useState('');
  const [sessionStatus, setSessionStatus] = useState({});

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

  const isPasswordStrong = (password) => {
    const regexUpperCase = /[A-Z]/;
    const regexLowerCase = /[a-z]/;
    const regexNumber = /[0-9]/;
    const regexSpecial = /[!@#$%^&*()_+[\]{};':"\\|,.<>?]/;

    return (
        password.length >= 8 &&
        regexUpperCase.test(password) &&
        regexLowerCase.test(password) &&
        regexNumber.test(password) &&
        regexSpecial.test(password)
    );
  };

const handleRegisterSubmit = async (e) => {
  e.preventDefault();
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
        if (!isPasswordStrong(registerData.password)) {
          setFlashMessage(
              'Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial.'
          );
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
        }
      }
    }
  } catch (error) {
    console.error('Error during registration:', error);
  }
};



  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const email = String(loginData.email).toString();
      const password = String(loginData.password).toString();

      console.log(loginData);
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
            setFlashMessage('Bienvenue !');
            navigate(`/homepage/${data[0].id}`);
          } else {
            setFlashMessage('Mot de passe incorrect');
          }
        } else {
          setFlashMessage('Utilisateur non trouvé');
        }
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };


  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterData((prevData) => ({
      ...prevData,
      [name]: name === 'langue' ? value : value.trim(),
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({ ...prevData, [name]: value }));
  };

  // useEffect(() => {
  //   const session = supabase.auth.session();
  //   setSessionStatus({ session });
  // }, []);

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
                        {/*<div className="form-elem">*/}
                        {/*  <select name="langue" id="langue" onChange={handleRegisterChange} required>*/}
                        {/*    <option value="">Votre langue</option>*/}
                        {/*    <option value="English">Anglais</option>*/}
                        {/*    <option value="French">Français</option>*/}
                        {/*    <option value="Spanish">Espagnol</option>*/}
                        {/*    <option value="Allemand">Français</option>*/}
                        {/*    <option value="Ewé">Espagnol</option>*/}
                        {/*  </select>*/}
                        {/*</div>*/}

                        <div className="form-elem">
                          <label htmlFor="password"></label>
                          <input type="password" name="password" id="password" placeholder="Choisir un mot de passe" onChange={handleRegisterChange} required />
                        </div>

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