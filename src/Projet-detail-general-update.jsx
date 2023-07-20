import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import './Project-detail-general-update.css'
import * as React from 'react';
import { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';
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
import Tabmenu from './component/Tabmenu';



function ProjectDetailGeneralUpdate() {

    const navigate = useNavigate();
    const [description, setDescription] = React.useState('');
    const [professor, setProfessor] = React.useState('');
    const [projects, setProjects] = useState([]);
    const sbsProjects = new SupabaseService();

    useEffect(() => {
        sbsProjects.getAllProjects().then((p) => {
            setProjects(p.data);
        });
      })

    const handleChange = (event) => {
      setDescription(event.target.value);
      setProfessor(event.target.value);
    };
  
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

    const denisSeverinDescription = 'Denis Severin est un musicien de grande envergure qui a fait beaucoup de blah blah blah blah blah blah blah'
  
    return (
      <>
      <div className='splitscreen'>
        <div className='leftSide'>
        {projects.map((project, index) => (
        <ProjectCard key={index} title={project.title} state="En cours" status={project.status}/>
      ))}
        </div>    
        <div className='rightSide'></div>
      <div className='project-detail-background'>
          <h1 className='project-detail-title'>Enregistrement Cello</h1>
          <section className='project-detail-section'>
          <div className='tab-menu'>
                <Tabmenu></Tabmenu>
            </div>
              <div className='project-detail-section1-content'>
              <h2 className='project-detail-update-title'>Modifier les informations</h2>
                <div className='select-flex'>
                <span className='select-span'>Professeur :</span>
                    <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Professeur</InputLabel>
                        <Select
                        labelId="professor-select-label"
                        id="professor-select"
                        value={professor}
                        label="Professeur"
                        onChange={handleChange}
                        >
                        <MenuItem value={'Denis Severin'}>Denis Severin</MenuItem>
                        <MenuItem value={'Mathilda Catcher'}>Mathilda Catcher</MenuItem>
                        <MenuItem value={'Louis Leland'}>Louis Leland</MenuItem>
                        </Select>
                    </FormControl>
                    </Box>
                </div>
                  <br></br>
                  <div className='select-flex'>
                    <span className='project-detail-instrument select-span'>Instrument :</span>
                  <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                        <InputLabel id="instrument-select-label">Instrument</InputLabel>
                        <Select
                        labelId="instrument-select-label"
                        id="instrument-select"
                        value={professor}
                        label="Instrument>"
                        onChange={handleChange}
                        >
                        <MenuItem value={'Denis Severin'}>Cello</MenuItem>
                        <MenuItem value={'Mathilda Catcher'}>Violon</MenuItem>
                        <MenuItem value={'Louis Leland'}>Piano</MenuItem>
                        </Select>
                    </FormControl>
                    </Box>
                  </div>

                  <div className='project-detail-description-section'>
                       <EmojiEventsIcon className='trophyIcon'></EmojiEventsIcon>
                       <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                        <InputLabel id="description-select-label">Description</InputLabel>
                        <Select
                        labelId="description-select-label"
                        id="description-select"
                        value={professor}
                        label="Description"
                        onChange={handleChange}
                        >
                        <MenuItem value={'Denis Severin'}>{denisSeverinDescription}</MenuItem>
                        <MenuItem value={'Mathilda Catcher'}>Mathilda Catcher est une très belle violoniste d'origine portugaise qui blah blah blah blah blah blah</MenuItem>
                        <MenuItem value={'Louis Leland'}>Louis Leland est un pianiste agée mais toujours dans la recherche de nouveauté blah blah blah blah blah</MenuItem>
                        </Select>
                    </FormControl>
                    </Box>
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
