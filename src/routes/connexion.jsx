import React, {useEffect, useState} from 'react';
import salineLogoLight from '../assets/saline_logo/logo_light.svg';
import SupabaseService from "../tools/SupabaseClient";
import supabase from "../APIconfig/config.jsx";

const Connexion = () => {
  const [toggle, setToggle] = useState(true);
  const [auth, setAuth] = useState([]);
  const [flashMessage, setFlashMessage] = useState('');
  const [sessionStatus, setSessionStatus] = useState({});

  const [registerData, setRegisterData] = useState({
    firstname: '',
    lastname: '',
    password: '',
    langue: '',
    role: '',
    phone: '',
    email: '',
  });

  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const handleToggle = () => {
    setToggle(!toggle);
  };


  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase
          .from('users')
          .insert([registerData]);

      if (error) {
        setFlashMessage('Registration failed. Please try again.');
      } else {
        setFlashMessage('Registration successful!');
        // You can perform additional actions after successful registration if needed.
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase
          .from('users')
          .select('*')
          .match({ email: loginData.email, password: loginData.password });
      if (error) {
        setFlashMessage('Login failed. Please check your credentials.');
      } else {
        if (data.length > 0) {
          setFlashMessage('Login successful!');
          // You can perform additional actions after successful login if needed.
        } else {
          setFlashMessage('Login failed. Please check your credentials.');
        }
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterData((prevData) => ({ ...prevData, [name]: value }));
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
                {flashMessage && <div className="output-message x-center-position">{flashMessage}</div>}
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
                            <input type="email" name="email" id="email" placeholder="arnaud@ymail.com" onChange={handleChange} required />
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