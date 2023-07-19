import { createContext, useState } from 'react';

const AppContext = createContext();

const AppProvider = ({ children }) => {

  const [sessionData, setSessionData] = useState({});

    // Logout from the connexion session 
  const handleLogout = () => {
    sessionStorage.removeItem('idToken');
    sessionStorage.removeItem('emailToken');
    sessionStorage.clear();
    setSessionData({}); 
  };


  return (
    <AppContext.Provider value={{ sessionData, setSessionData, handleLogout }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
