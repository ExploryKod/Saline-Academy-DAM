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

    const { sessionData, setSessionData } = useContext(AppContext);
    const { handleLogout } = useContext(AppContext);

    const disconnectUser = () => {
        handleLogout();
    };
  const sbsProjects = new SupabaseService();

  useEffect(() => {
    sbsProjects.getAllProjects().then((p) => {
        setProjects(p.data);
    });
  })

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <p>Session test data: {sessionData.session_id} </p>
      <button type="button" onClick={disconnectUser}>Disconnect</button>
      <TestApi />
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      {projects.map((project, index) => (
        <ProjectCard key={index} title={project.title} state="En cours" status={project.status}/>
      ))}
    </>
  )
}

export default App
