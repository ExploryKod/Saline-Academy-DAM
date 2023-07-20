import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import './Project-detail-general-update.css'
import './component/ProjectSummary'
import * as React from 'react';
import { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';
import './component/ProjectPlanning.css'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import CancelIcon from '@mui/icons-material/Cancel';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useNavigate } from "react-router-dom";
import ProjectCard from './component/ProjectCard'
import SupabaseService from "./tools/SupabaseClient";
import Navbar from './component/Navbar';


function ProjectDetailGeneralUpdate() {

    const navigate = useNavigate();
    const [projects, setProjects] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [teacher, setTeacher] = useState();
    const [specialisation, setSpecialisation] = useState ();
    const sbs = new SupabaseService();

    useEffect(() => {
        sbs.getAllProjects().then((p) => {
            setProjects(p.data);
        });
      })
  
    const [openCancel, setCancelOpen] = React.useState(false);
    const [openSave, setSaveOpen] = React.useState(false);

  
    const cancelDialogOpen = () => {
      setCancelOpen(true);
    };
  
    const saveDialogOpen = () => {
      setSaveOpen(true);
    };
  
    const handleClose = () => {
      setCancelOpen(false);
      setSaveOpen(false);
    };

    const handleTeacher = (event) => {
      setTeacher(event.target.value)
    };

    const handleSpecialisation = (event) => {
      setSpecialisation (event.target.val)
    }

    const handleSpecialisations = () => {
      sbs.getAllSpecialisations().then((p) => {
          setSpecialisation(p.data);
      });}
    
    const handleTeachers = () => {
      sbs.getAllTeachers().then((p) => {
          setTeachers(p.data);
      });}

    return (
      <>
      <div className='splitscreen'>
        <Navbar/>
        <div className='leftSide'>
        {projects.map((project, index) => (
        <ProjectCard key={index} title={project.title} state="En cours" status={project.status}/>
      ))}
        </div>    
        <div className='rightSide'></div>
      <div className='project-detail-background'>
          <h2 className='project-detail-title'>Enregistrement Cello</h2>
          <section className='project-detail-section'>
              <div className='project-detail-section1-content'>
              <h3 className='project-detail-update-title'>Modifier les informations</h3>
                <div className='select-flex'>
                <span className='select-span'>Professeur :</span>
            <select className='project-detail-planning-group-form-select' name="list" value={teacher} onClick={handleTeachers} onChange={handleTeacher}>
						<option>Choisir un guest</option>
							{teachers?.map((teacher) => <option value={teacher.id}>{`${teacher.name}`}
						</option>)}
						</select>
                </div>
                  <br></br>
                  <div className='select-flex'>
                    <span className='project-detail-instrument select-span'>Instrument :</span>
                    <select className='project-detail-planning-group-form-select' name="list" value={specialisation} onClick={handleSpecialisations} onChange={handleSpecialisation}>
						<option>Choisir un guest</option>
							{teachers?.map((teacher) => <option value={teacher.id}>{`${teacher.specialisation}`}
						</option>)}
						</select>
                  </div>

                  <div className='project-detail-description-section'>
                       <EmojiEventsIcon className='trophyIcon'></EmojiEventsIcon>
                       <select controlShouldRenderValue={false} className='project-detail-planning-group-form-select' name="list" value={teacher} onClick={handleTeachers} onChange={handleTeacher}>
						<option>Choisir un guest</option>
							{teachers?.map((teacher) => <option value={teacher.id}>{`${teacher.description}`}
						</option>)}
						</select>
                  </div>
              </div>
          </section>
          <div className='project-detail-footer'>
          <Stack spacing={2} direction="row">
              <Button variant="contained" color='secondary' onClick={cancelDialogOpen} startIcon={<CancelIcon />}>Annuler</Button>
              <Dialog
          open={openCancel}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title-cancel"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Annuler les modifications"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description-cancel">
            Appuyer sur le bouton annuler annulera toutes vos modifications. <br></br><br></br> Êtes vous sûr de vouloir continuer ?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" color='secondary' startIcon={<CancelIcon />} onClick={handleClose}>Annuler</Button>
            <Button variant="contained" color='secondary' startIcon={<CheckCircleIcon />} onClick={() => navigate("/project-detail-general")} autoFocus>
              Valider
            </Button>
          </DialogActions>
        </Dialog>
              <Button variant="contained" color='error' onClick={saveDialogOpen} startIcon={<SaveIcon />}>Enregistrer</Button>
              <Dialog
          open={openSave}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title-update">
            {"Enregistrer les modifications"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description-update">
            Appuyer sur le bouton valider enregistrera toutes vos modifications et engendrera la perte des informations précédentes. <br></br><br></br> Êtes vous sûr de vouloir enregistrer vos modifications ?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" color='secondary'startIcon={<CancelIcon />} onClick={handleClose}>Annuler</Button>
            <Button variant="contained" color='secondary' startIcon={<CheckCircleIcon />} onClick={handleClose} autoFocus>
              Valider
            </Button>
          </DialogActions>
        </Dialog>
          </Stack>
          </div>
      </div>
      </div>
      </>
    )
  }

export default ProjectDetailGeneralUpdate
