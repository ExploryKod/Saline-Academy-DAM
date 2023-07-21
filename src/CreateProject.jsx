import { useEffect, useState } from "react";
import './CreateProject.css';
import SupabaseService from "./tools/SupabaseClient";
import Navbar from "./component/Navbar";
import { TextField, Container, Button, InputLabel, Select, MenuItem, Box } from "@mui/material";
import {LocalizationProvider, DatePicker} from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'; 
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { useNavigate } from "react-router";

const CreateProject = () => {
    const navigate = useNavigate();
    const [projectData, setProjectData] = useState({title: "", subtitle: "",description: "", user_id: null, status: "WAITING",created_at: new Date, promised_date: null});
    const [users, setUsers] = useState([]);
    const [contributor, setContributor] = useState("");
    
    useEffect (() => {
        const sbsUsers = new SupabaseService();
        
        sbsUsers.getProducterUsers().then((p) => {
            setUsers(p.data);
            
        })}, []);

    const handleSubmit = async () =>  {
        const sbs = new SupabaseService();
        await sbs.createProject(projectData);
        navigate('/homepage');
    };
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
    <div className="globalContainer">
    <Navbar />
    <div className="firstContainer">
    <h1>Création d'une masterclass</h1>
        <Container sx={{display:'flex', gap:10}}>
            <div className="column">
                <h2>Titre</h2>
                <Box sx={{width: 460, maxWidth: '100%',}}>
                    <TextField fullWidth sx={{ backgroundColor: 'var(--lightblue, #CACBDF)', }} 
                    onChange={handleTitle} value={projectData.title} label="Entrez un titre..." />
                </Box>
                <h2>Sous-titre</h2>
                <Box sx={{ width: 460, maxWidth: '100%', }}>
                   <TextField 
                    multiline
                    rows={2} 
                    fullWidth
                    sx={{ backgroundColor: 'var(--lightblue, #CACBDF)', }}
                    label="Entrez un sous-titre..." onChange={handleSubTitle} value={projectData.subtitle}/>
                </Box>    
            </div>
            <div className="column">
                <h2>Description</h2>
                <Box sx={{
                    width: 540,
                    maxWidth: '100%',
                }}>
                <TextField 
                    multiline
                    rows={7.6}
                    fullWidth 
                    sx={{
                    backgroundColor: 'var(--lightblue, #CACBDF)',
                }}
                label="Entrez une description..." onChange={handleDescription} value={projectData.description}/>
                </Box>
            </div>
        </Container>
        <Container  sx={{display:'flex', gap:34}}>
            <div className="column">
                <h2>Ajouter un participant</h2>
                <InputLabel value={''} id="search" >Recherchez un profil...</InputLabel>
                <Select label="Recherchez un profil..." labelId='search' onChange={handleContributors}    >
                    {users?.map((user) => <MenuItem key={user.id} value={JSON.stringify(user)}>{`${user.firstname} ${user.lastname}`}</MenuItem>)}
                </Select>
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
                        
                        <tr><td className="row">{contributor}</td>
                        {!(projectData.user_id == null) && (<td>
                            <Button sx={{
                                width: 24,
                                height: 24,
                                backgroundColor: 'var(--lightpink, #DA6CC4)',
                                borderRadius: 5,
                                color:'white',
                            }}
                            className="add" 
                            onClick={handleDeletecontributors}>x</Button>
                            </td>)}
                        </tr>
                    </tbody>
                </table>
            </div>
        </Container>
        <Container>
            <div className="column">
                <h2>Date d'échéance</h2>
            <Container sx={{display:'flex', gap:50}}>
                <LocalizationProvider dateAdapter={AdapterDayjs} >
                    <DemoContainer components={['DatePicker']}>
                    <DatePicker onChange={(newValue) => setProjectData({...projectData, promised_date: newValue})} value={projectData.promised_date} />
                    </DemoContainer>
                </LocalizationProvider>
            <Button sx={{
                width: 300,
                height: 64,
                backgroundColor: 'var(--darkblue, #263069)',
                borderRadius: 2.5,
                color:'white',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
            }}
            className="add" 
            onClick={handleSubmit}>Enregistrer</Button>
            </Container>
            </div>
        </Container>
    </div>
    </div>
    
        )
};

export default CreateProject;