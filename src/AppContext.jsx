import { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
const AppContext = createContext();

const AppProvider = ({ children }) => {
  const navigate = useNavigate();
  const [sessionData, setSessionData] = useState({});

    // Logout from the connexion session 
  const handleLogout = () => {
    sessionStorage.clear();
    setSessionData({}); 
    navigate('/');
  };


  return (
    <AppContext.Provider value={{ sessionData, setSessionData, handleLogout }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
