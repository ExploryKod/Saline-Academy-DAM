import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import './ProjectSummary.css'
import * as React from 'react';
import { useEffect, useState } from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import PauseIcon from '@mui/icons-material/Pause';
import CancelIcon from '@mui/icons-material/Cancel';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import ProjectCard from './ProjectCard'
import SupabaseService from '../tools/SupabaseClient';


function ProjectSummary() {

    const [projects, setProjects] = useState([]);
    const sbsProjects = new SupabaseService;
    const [page, setPage] = React.useState("")

    const havePage = (page) => {
      setPage(page);
    };

    useEffect(() => {
        sbsProjects.getAllProjects().then((p) => {
            setProjects(p.data);
        });
      })

    const [description, setDescription] = React.useState('');
    const handleChange = (event) => {
    setDescription(event.target.value);
  };

  const navigate = useNavigate();

  const steps = [
    'Programmation',
    'Captation',
    'Post-production',
    'Editorial',
    'Publication',
  ];

  const [openPriority, setPriorityOpen] = React.useState(false);
  const [openPause, setPauseOpen] = React.useState(false);
  const [openDelete, setDeleteOpen] = React.useState(false);

  const priorityDialogOpen = () => {
    setPriorityOpen(true);
  };

  const pauseDialogOpen = () => {
    setPauseOpen(true);
  };

  const deleteDialogOpen = () => {
    setDeleteOpen(true);
  };

  const handleClose = () => {
    setPriorityOpen(false);
    setPauseOpen(false);
    setDeleteOpen(false);
  };

  return (
<div className='splitscreen'>
        <div className='leftSide'>
          <h1>Projets</h1>
          <h4>{projects.length} projets</h4>
        {projects.map((project, index) => (
        <ProjectCard key={index} title={project.title} status={project.status}/>
      ))}
        </div>    
        <div className='rightSide'>
   <div className='project-detail-background'>
        <h2 className='project-detail-title'>Projet interview</h2>
        <section className='project-detail-section'>
            <div className='edit-button'>
                <Link to="/project-detail-general-update" className='editButton'><EditIcon className='editIcon'></EditIcon></Link>
            </div>
            <div className='project-detail-section1-content'>
                <span>Professeur : Mathilda Catcher</span>
                <br></br>
                <span className='project-detail-instrument'>Spécialisation : Chant</span>
                <div className='project-detail-description-section'>
                     <EmojiEventsIcon className='trophyIcon'></EmojiEventsIcon>
                     <Accordion>
                         <AccordionSummary
                         expandIcon={<ExpandMoreIcon />}
                          aria-controls="project-detail-description-content"
                            id="project-detail-description-header">
                            <Typography>Description</Typography>
                         </AccordionSummary>
                         <AccordionDetails>
                            <Typography>
                            Professor of cello at the Geneva University of Music and the Bern University of Arts.
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                </div>
                <div className='division'> </div>
                <section>
                    <div className='project-detail-section2-content'>
                        <h3 className='project-detail-title2'>Statut du projet</h3>
                        <div className='project-detail-stepper'>
                        <Box sx={{ width: '200%' }}>
                            <Stepper activeStep={0} alternativeLabel>
                                {steps.map((label) => (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                </Step> ))}
                            </Stepper>
                        </Box>
                        </div>
                    </div>
                </section>
            </div>
        </section>
        <div className='project-detail-footer'>
        <Stack spacing={2} direction="row">
            <Button variant="contained" color='secondary' onClick={priorityDialogOpen} startIcon={<PriorityHighIcon />}>Prioriser</Button>
            <Dialog
        open={openPriority}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title-priority">
          {"Prioriser le projet"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-priority">
          Appuyer sur le bouton valider mettra le projet en priorité dans les projet en cours.<br></br><br></br> Êtes vous sûr de vouloir continuer ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color='secondary' startIcon={<CancelIcon />} onClick={handleClose}>Annuler</Button>
          <Button variant="contained" color='secondary' startIcon={<CheckCircleIcon />} onClick={handleClose} autoFocus>
            Valider
          </Button>
        </DialogActions>
      </Dialog>
            <Button variant="contained" color='secondary' onClick={pauseDialogOpen} startIcon={<PauseIcon />}>Mettre en pause</Button>
            <Dialog
        open={openPause}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title-pause">
          {"Mettre en pause le projet"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-pause">
          Appuyer sur le bouton valider mettra en pause toute avancée du projet pour une durée indéterminée. <br></br><br></br> Êtes vous sûr de vouloir continuer ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color='secondary'startIcon={<CancelIcon />} onClick={handleClose}>Annuler</Button>
          <Button variant="contained" color='secondary' startIcon={<CheckCircleIcon />} onClick={handleClose} autoFocus>
            Valider
          </Button>
        </DialogActions>
      </Dialog>
            <Button variant="contained" color='error' onClick={deleteDialogOpen} startIcon={<DeleteIcon />}>Supprimer</Button>
            <Dialog
        open={openDelete}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title-delete"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Supprimer le projet"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-delete">
          Appuyer sur le bouton supprimer supprimera définitivement le projet. Ceci empêchera toutes modifications par la suite.<br></br><br></br> Êtes vous sûr de vouloir continuer ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color='secondary' startIcon={<CancelIcon />} onClick={handleClose}>Annuler</Button>
          <Button variant="contained" color='secondary' startIcon={<DeleteIcon />} onClick={() => navigate("/")} autoFocus>
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>
        </Stack>
        </div>
    </div>
        </div>
     
    </div>
    )
}

export default ProjectSummary