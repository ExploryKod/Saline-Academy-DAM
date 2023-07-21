import { useEffect, useState } from "react";
import SupabaseService from "../tools/SupabaseClient";
import { Container, Fab, Grid } from "@mui/material";
import ProjectCard from "../component/ProjectCard";
import Navbar from "../component/Navbar";
import styles from "./planningBoard.module.scss";
import TuneRoundedIcon from '@mui/icons-material/TuneRounded';
import { EmailForm } from "../component/emailForm";
import { capitalizeFirstLetter, formatDate, calculateDelayFromToday } from '../tools/stringTreatment';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';

const style = {
  width: 400,
  height: 400,
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'rgba(255, 255, 255)',
  borderRadius: 2,
  border: '2px solid #fff',
  boxShadow: 24,
  p: 4,
};


// Objet de base qui regroupe toutes les données pour le board
const initialProjectPlanningData = {
  id: null,
  title: "",
  description: "",
  course: "",
  manager: "",
  status: null,
  teacher_id: null,
  room_id: null,
  promised_date: null,
  finished_at: null,
  user_id: null,
  crew_id: null,
  delay: null,
  hasPriority: false,
  state: null,
};

const PlanningBoard = () => {
    const sbs = new SupabaseService().client;
    const [open, setOpen] = useState(false);
    const [isModalOpen, setModalOpen] = useState(false)
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);  
    const [projectPlanningData, setProjectPlanningData] = useState([]);
    const [selectedManager, setSelectedManager] = useState(null);

    const handleOpenManagerModal = (managerData) => {
      setSelectedManager(managerData);
      setModalOpen(true);
    };
  
    const handleCloseModal = () => {
      setModalOpen(false);
    };

    const handleProjectData = async () => {
      try {
        const { data, error } = await sbs
          .from('projets')
          .select('*, manager:user_id(email, firstname, lastname)')
          .order('id');
  
        if (error) {
          console.error(error);
          return;
        }
  
        if (data && data.length > 0) {
          const allDataFromProject = data
          .filter((projectData) => projectData.promised_date && projectData.title && projectData.status && projectData.manager)
          .map((projectData) => ({
            ...initialProjectPlanningData,
            ...projectData,
            title: capitalizeFirstLetter(projectData.title),
            status: capitalizeFirstLetter(projectData.status), 
            promised_date: formatDate(projectData.promised_date).toString(),
            delay: calculateDelayFromToday(projectData.promised_date).toString(),
          }));
         
          setProjectPlanningData(allDataFromProject);
        }
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };
  
    useEffect(() => {
      handleProjectData();
    }, []);
  

    console.log('planning data', projectPlanningData);
  
    return (
      <div className={styles.globalContainer}>
          <Navbar />
          <div className={styles.firstContainer}>
              <h1 className="firstContainer__title">Vos projets en cours</h1>

              <Fab sx={{width: '200px', fontWeight: 'bold', borderRadius: 5, boxShadow: 'none', color: '#A3298B', bgcolor: 'transparent' }}>
                <TuneRoundedIcon sx={{ mr: 1, color: '#A3298B' }} />
                Mes Filtres
            </Fab>
  
              <Container sx={{display:'flex', gap:2 ,padding:2, backgroundColor:'white', borderRadius:2}} className="s-planning-board">
                  <div className="s-planning-cols" style={{display:'flex', flexDirection:'column', gap:4 ,padding:3, backgroundColor:'white', border: 0, borderColor:'black', borderRight: 5, borderRadius:0}}>
                  <div className={`${styles.columnTitles} s-project-card-container`}>
                        <h2>Projets</h2>
                      </div>
                      {projectPlanningData
                          .filter((project) => project.title && project.status) 
                          .map((project, index) => (
                            <>
                              <div key={index} onClick={handleOpen} className='planning-cols__card-wrapper planning-cols__project-card'>
                              <ProjectCard title={project.title} state={project.state ? project.state : ""} status={project.status}/>
                            </div>
                              <Modal
                                className="s-modal-project"
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                              >
                                <Box sx={style}>
                                  <Typography id="modal-modal-title" variant="h6" component="h2">
                                    {project.title}
                                  </Typography>
                                  <Typography id="modal-modal-description" sx={{ mt: 2, fontSize: 16, fontWeight: 'bold' }}>
                                    Description du projet:
                                    <Typography sx={{ mt: 2, fontSize: 16, fontWeight: 'normal' }}>
                                    {project.description}
                                    </Typography>
                                  </Typography>
                                </Box>
                              </Modal>
                            </>
                          
                          ))}

                    
                  </div>
                  <div className="s-planning-cols" style={{display:'flex', flexDirection:'column', gap:4 ,padding:3, backgroundColor:'white', border: 0, borderColor:'green', borderRight: 5, borderRadius:0}}>
                  <div className={styles.columnPriority}>
                        <h2>Priorités</h2>
                      </div>
                      {projectPlanningData
                        .map((project, index) => (
                     <div key={index} className="planning-cols__card-wrapper planning-cols__priority">
                        <Box sx={{
                                padding: 0,
                                margin: '0 auto',
                                width: 50,
                                height: 50,
                                backgroundColor: 'var(--light-blue, white)',
                                borderRadius: 25,
                                color:'black',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center'
                        }}
                        className={project.hasPriority ? styles.hasPriority : styles.noPriority}
                        >
                            <p className="">{project.hasPriority ? 'A' : 'B'}</p>
                        </Box>
                  </div>
                      ))}
                  </div>
                  <div className="s-planning-cols" style={{display:'flex', flexDirection:'column', gap:4 ,padding:3, backgroundColor:'white', border: 0, borderColor:'green', borderRight: 5, borderRadius:0}}>
                      <div className={styles.columnTitles}>
                        <h2>Echéances</h2>
                      </div>
                    
                      {projectPlanningData.map((project, index) => (
                       <div key={index} className='planning-cols__card-wrapper  planning-cols__promised-date'>
                          <p className="">{project.promised_date}</p>
                      </div>
                      ))}
                  </div>
                  <div className="s-planning-cols" style={{display:'flex', flexDirection:'column', gap:4 ,padding:3, backgroundColor:'white', border: 0, borderColor:'green', borderRight: 5, borderRadius:0}}>
                    <div className={styles.columnTitles}>
                        <h2>Délai restant</h2>
                    </div>
                  
                    {projectPlanningData.map((project, index) => (
                      <div key={index} style={{height: '300px'}} className='planning-cols__card-wrapper  planning-cols__delay'>
                          <p className="">{project.delay} jours</p>
                      </div>
                      
                      ))}
                  </div>
                  <div className="s-planning-cols" style={{display:'flex', flexDirection:'column', gap:4 ,padding:3, backgroundColor:'white', border: 0, borderColor:'green', borderRight: 5, borderRadius:0}}>
                  <div className={styles.columnTitles}>
                        <h2>Responsable projet</h2>
                    </div>
                      {projectPlanningData
                        .map((project, index) => (
                          <>
                        <div key={index} className="planning-cols__card-wrapper  planning-cols__manager">
                          <div onClick={() => handleOpenManagerModal(project.manager)} className='project-card project-card-padding'>
                          <div></div>
                          <div className="project-card-infos">
                            <div>
                              <AccountCircleIcon className='project-card-logo__svg' />
                              <h3 className='project-card-infos__title'>{project.manager.firstname ? project.manager.firstname : ""} {project.manager.lastname ? project.manager.lastname : ""}</h3>
                            </div>
                            
                            <div className='project-card-infos-state'>
                                      <EmailIcon/>
                              <p className='project-card-infos-state__status'>{project.manager.email ? project.manager.email : "Aucun email fourni"}</p>
                            </div>
                          </div>
                        </div>
                        {isModalOpen && <EmailForm manager={selectedManager} onClose={handleCloseModal}/>}
                     </div>
                
                          </>
                
                      
                    
                      ))}
                  </div>
              </Container>
          </div>
      </div>
    );
  };
  
  export default PlanningBoard;