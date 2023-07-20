import { useEffect, useState } from "react";
import './CreateProject.css';
import SupabaseService from "./tools/SupabaseClient";


const CreateProject = () => {

    const [projectData, setProjectData] = useState({title: "", subtitle: "",description: "", user_id: null, status: "WAITING", promised_date: new Date});
    const [users, setUsers] = useState([]);
    const [contributor, setContributor] = useState("");
    const handleSubmit = () =>  {
        const sbs = new SupabaseService();
        sbs.createProject(projectData);
    };
      
   useEffect (() => {
      const sbsUsers = new SupabaseService();
        
      sbsUsers.getProducterUsers().then((p) => {
          setUsers(p.data);
          
      })}, []);
  
  const handleTitle =  (e) => {
    setProjectData({...projectData, title: e.target.value});
  };
  const handleSubTitle = (e) => {
    setProjectData({...projectData, subtitle: e.target.value});
};
const handleDescription = (e) => {
    setProjectData({...projectData, description: e.target.value});
}
const handleDate = (e) => {
    setProjectData({...projectData, promised_date: e.target.value});
}
const handleContributors = (e) => {
    const user = JSON.parse(e.target.value)
    setProjectData({...projectData, user_id: user.id});
    setContributor(`${user.firstname} ${user.lastname}`);
}
const handleDeletecontributors = () =>{
    setProjectData({...projectData, user_id: null});
    setContributor("");
}
    return (
    <>
    <h1>Création d'une masterclass</h1>
    <div className="column">
        <div className="row">
            <div className="column">
                <h2>Titre</h2>
                <input type="text" onChange={handleTitle} value={projectData.title}></input>
                <h2>Sous-titre</h2>
                <input type="text" onChange={handleSubTitle} value={projectData.subtitle}></input>
            </div>
            <div className="column">
                <h2>Description</h2>
                <input type="text" onChange={handleDescription} value={projectData.description}></input>
            </div>
        </div>
        <div className="row">
            <div className="column">
                <h2>Ajouter un participant</h2>
                <select name="list" onChange={handleContributors}    >
                    <optgroup label="Recherchez un profil" />
                    {users?.map((user) => <option key={user.id} value={JSON.stringify(user)}>{`${user.firstname} ${user.lastname}`}</option>)}
                </select>
            </div>
            <div className="column">
                <h2>Supprimer un participant</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Producteur</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                        <tr><td>{contributor}</td></tr>
                        
                    </tbody>
                </table>
                <button className="add" onClick={handleDeletecontributors}>x</button>
            </div>
        </div>
        <div className="row">
            <div className="column">
                <h2>Date d'échéance</h2>
                <input type="date" onChange={handleDate} value={projectData.promised_date}></input>
            </div>
            <button className="add" onClick={handleSubmit}>

                </button>
        </div>
    </div>
    </>
        )
};

export default CreateProject;