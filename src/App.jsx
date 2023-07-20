import { useState, useContext, useEffect } from 'react'
import './styles/style.scss'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import TestApi from './component/testApi'
import ProjectCard from './component/ProjectCard'
import { AppContext } from './AppContext';
import SupabaseService from "./tools/SupabaseClient";

function App() {
  const [projects, setProjects] = useState([]);
  const [count, setCount] = useState(0)

    const { handleLogout } = useContext(AppContext);

    const disconnectUser = () => {
        handleLogout();
    };
  const sbsProjects = new SupabaseService();

  return (
    <>
      <p>Session test data: {sessionData.session_id} </p>
      <button type="button" onClick={disconnectUser}>Disconnect</button>
    </>
  )
}

export default App
