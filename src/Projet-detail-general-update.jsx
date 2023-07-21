import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import './Project-detail-general-update.css'
import './component/ProjectSummary'
import * as React from 'react';
import { useEffect, useState } from 'react'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';
import './component/ProjectPlanning.css'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ProjectCard from './component/ProjectCard'
import SupabaseService from "./tools/SupabaseClient";
import Navbar from './component/Navbar';
import { useLocation, useNavigate } from 'react-router-dom';


function ProjectDetailGeneralUpdate() {

  const location = useLocation();
  const { project } = location.state;
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [teacher, setTeacher] = useState();
  const [newTeacher, setNewTeacher] = useState(project.teacher_id);
  const [newDescription, setNewDescription] = useState(project.description);
  const [specialisation, setSpecialisation] = useState();
  const sbs = new SupabaseService();

  useEffect(() => {
    sbs.getAllProjects().then((p) => {
      setProjects(p.data);
    });
  })

  useEffect(() => {
    handleTeachers();
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
    setSpecialisation(event.target.val)
  }

  const handleSpecialisations = () => {
    sbs.getAllSpecialisations().then((p) => {
      setSpecialisation(p.data);
    });
  }

  const handleTeachers = () => {
    sbs.getAllTeachers().then((p) => {
      setTeachers(p.data);
    });
  }

  const handleChangeTextArea = (e) => {
    setNewDescription(e);
  }

  const handleChangeSelector = (e) => {
    setNewTeacher(e);
  }

  const handleSubmitForm = () => {
    sbs.updateProject(project.id, newTeacher, newDescription).then((res) => {
      setSaveOpen(false);
      navigate("/project-detail-general");
    })
  }

  return (
    <>
      <div className='splitscreen'>
      <div className='navbar'>
        <Navbar/>
      </div>
        <div className='leftSide'>
          {projects.map((prj, index) => (
            <ProjectCard key={index} title={prj.title} state="En cours" status={prj.status} />
          ))}
        </div>
        <div className='rightSide'></div>
        <div className='project-detail-background'>
          <h2 className='project-detail-title'>{project.title}</h2>
          <section className='project-detail-section'>
            <div className='project-detail-section1-content'>
              <h3 className='project-detail-update-title'>Modifier les informations</h3>
              <div className='select-flex'>
                <span className='select-span'>Professeur :</span>
                <select value={newTeacher} className='project-detail-planning-group-form-select' name="list" onChange={e => handleChangeSelector(e.target.value)}>
                  {teachers?.map((teacher) => <option key={teacher.id} value={teacher.id}>{`${teacher.name}`}
                  </option>)}
                </select>
              </div>
              <br></br>
              <div className='project-detail-description-section'>
                <EmojiEventsIcon className='trophyIcon'></EmojiEventsIcon>
                <textarea  onChange={e => handleChangeTextArea(e.target.value)} className='project-detail-planning-group-form-select' name="list" value={newDescription}>
                </textarea>
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
                  <Button variant="contained" color='secondary' startIcon={<CancelIcon />} onClick={handleClose}>Annuler</Button>
                  <Button variant="contained" color='secondary' startIcon={<CheckCircleIcon />} onClick={handleSubmitForm} autoFocus>
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
