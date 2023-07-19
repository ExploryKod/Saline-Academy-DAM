import { useState } from "react";
import './CreateProject.css';
import SupabaseService from "./tools/SupabaseClient";


const CreateProject = () => {

    const [projectData, setProjectData] = useState({});
    const [inputTitle, setInputTitle] = useState("");
    const [inputSubTitle, setInputSubTitle] = useState("");
    const [inputDescription, setInputDescription] = useState("");
    const [inputDate, setInputDate] = useState(Date);
    const [users, setUsers] = useState([]);

    const handleSubmit = () =>  {
        setProjectData({ title: inputTitle, subtitle: inputSubTitle, promised_date: new Date})
        const sbs = new SupabaseService();
        console.log(projectData)
    
        sbs.createProject(projectData);
    };
      
    const handleUsers = () => {
      const sbsUsers = new SupabaseService();
  
      sbsUsers.getAllUsers().then((p) => {
          setUsers(p.data);
      });}
  
  const handleTitle = (e) => {
    setInputTitle(e.target.value);
  };
  const handleSubTitle = (e) => {
    setInputSubTitle(e.target.value);
  }
  const handleDescription = (e) => {
    setInputDescription(e.target.value);
  }
  const handleDate = (e) => {
    setInputDate(e.target.value);
  }
    return (
    <>
    <h1>Création d'une masterclass</h1>
    <div className="column">
        <div className="row">
            <div className="column">
                <h2>Titre</h2>
                <input type="text" onChange={handleTitle} value={inputTitle}></input>
                <h2>Sous-titre</h2>
                <input type="text" onChange={handleSubTitle} value={inputSubTitle}></input>
            </div>
            <div className="column">
                <h2>Description</h2>
                <input type="text" onChange={handleDescription} value={inputDescription}></input>
            </div>
        </div>
        <div className="row">
            <div className="column">
                <h2>Ajouter des participants</h2>
                <select name="list" onClick={handleUsers}>
                    <option>Recherchez un profil</option>
                    {users?.map((user) => <option value={user.id}>{`${user.firstname} ${user.lastname}`}</option>)}
                </select>
            </div>
            <div className="column">
                <h2>Liste des participants</h2>
            </div>
        </div>
        <div className="row">
            <div className="column">
                <h2>Date d'échéance</h2>
                <input type="date" onChange={handleDate} value={inputDate}></input>
            </div>
            <button onClick={handleSubmit}>

                </button>
        </div>
    </div>
    </>
        )
};

export default CreateProject;