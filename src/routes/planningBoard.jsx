import { useEffect, useState } from "react";
import SupabaseService from "../tools/SupabaseClient";
import { Box, Container, Fab, Grid, Typography } from "@mui/material";
import ProjectCard from "../component/ProjectCard";
import Navbar from "../component/Navbar";
import styles from "./planningBoard.module.scss";
import TuneRoundedIcon from '@mui/icons-material/TuneRounded';
import { EmailForm } from "../component/emailForm";
import { capitalizeFirstLetter, formatDate } from '../tools/stringTreatment';

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
};

const PlanningBoard = () => {
    const sbs = new SupabaseService().client;
    const [projets, setProjets] = useState([]);
    const [ hasPriority, setHasPriority] = useState([])
    const [ manager, setManager] = useState("Jean Arduino");
    const [ isModalOpen, setModalOpen] = useState(false);

    const [projectPlanningData, setProjectPlanningData] = useState([]);

    const handleProjectData = async () => {
      try {
        const { data, error } = await sbs
          .from('projets')
          .select('*');
  
        if (error) {
          // Handle the error
          console.error(error);
          return;
        }
  
        // If there is data, map over each row and update the projectPlanningData state
        if (data && data.length > 0) {
          const mappedData = data.filter((projectData) => projectData.promised_date && projectData.title && projectData.status).map((projectData) => ({
            ...initialProjectPlanningData,
            ...projectData,
            title: capitalizeFirstLetter(projectData.title),
            status: capitalizeFirstLetter(projectData.status), 
            promised_date: formatDate(projectData.promised_date).toString(),
          }));
          setProjectPlanningData(mappedData);
        }
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };
  
    useEffect(() => {
      handleProjectData();
    }, []);
  
    useEffect(() => {
      const teacher = "Jeanne d'Arc";
      setManager(teacher);
    }, [manager]);
  
  
    const projectsList = [
      {
          name : "Projet X",
          status : "En cours de validation",
          priority: "A",
          manager: ["Jean", "jean@gmail.com"],
      },
      {
        name : "Projet X",
        status : "En cours de validation",
        priority: "A",
        manager: ["Jean", "jean@gmail.com"],
      },
      {
        name : "Projet X",
        status : "En cours de validation",
        priority: "A",
        manager: ["Jean", "jean@gmail.com"],
      },
      {
        name : "Projet X",
        status : "En cours de validation",
        priority: "A",
        manager: ["Jean", "jean@gmail.com"],
      },
    ]

      console.log('planning data', projectPlanningData);
  
    return (
      <div className={styles.globalContainer}>
          <Navbar />

          {/* <EmailForm manager={manager}/> */}

          <div className={styles.firstContainer}>
              <h1>Vos projets en cours</h1>

              <Fab sx={{width: '200px', fontWeight: 'bold', borderRadius: 5, boxShadow: 'none', color: '#A3298B', bgcolor: 'transparent' }}>
                <TuneRoundedIcon sx={{ mr: 1, color: '#A3298B' }} />
                Mes Filtres
            </Fab>
  
              <Container sx={{display:'flex', gap:2 ,padding:2, backgroundColor:'white', borderRadius:2}}>
                  <Container sx={{display:'flex', flexDirection:'column', gap:4 ,padding:3, backgroundColor:'white', border: 0, borderColor:'green', borderRight: 5, borderRadius:0}}>
                  <div className={styles.columnTitles}>
                        <h2>Projets</h2>
                      </div>
                      {projectPlanningData
                          .filter((project) => project.title && project.status) 
                          .map((project, index) => (
                            <Box
                              key={index}
                              sx={{
                                padding: 2,
                                width: 263,
                                height: 120,
                                backgroundColor: 'var(--light-blue, white)',
                                border: '1px solid blue',
                                borderRadius: 5,
                                color: 'black',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                              }}
                            >

                              <h3>{project.title}</h3>
                              <p>{project.status}</p>
                            </Box>
                          ))}

                    
                  </Container>
                  <Container sx={{display:'flex', flexDirection:'column', gap:4 ,padding:3, backgroundColor:'white', border: 0, borderColor:'green', borderRight: 5, borderRadius:0}}>
                  <div className={styles.columnPriority}>
                        <h2>Priorités</h2>
                      </div>
                      {projectsList.map(project => (
                      <Box
                          sx={{
                              padding: 2,
                              width: 50,
                              height: 120,
                              backgroundColor: 'var(--light-blue, white)',
                              display: 'flex',
                              flexDirection: 'column',
                              justifyContent: 'center',
                          }}
                      >
                        <Box sx={{
                                padding: 0,
                                margin: '0 auto',
                                width: 50,
                                height: 50,
                                backgroundColor: 'var(--light-blue, white)',
                                border: '3px solid red',
                                borderRadius: 25,
                                color:'black',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center'
                        }}>
                            <p className="">{project.priority}</p>
                        </Box>
                         
                      </Box>
                      ))}
                  </Container>
                  <Container sx={{display:'flex', flexDirection:'column', gap:4 ,padding:3, backgroundColor:'white', border: 0, borderColor:'green', borderRight: 5, borderRadius:0}}>
                      <div className={styles.columnTitles}>
                        <h2>Echéances</h2>
                      </div>
                      {projectPlanningData
                          .filter((project) => project.promised_date.toString() !== '01/01/1970' ? project.promised_date : 'Pas de date')
                          .map(project => (
                      <Box
                          sx={{
                              width: 100,
                              height: 50,
                              backgroundColor: 'var(--light-blue, white)',
                              color:'black',
                          }}
                      >
                          <p className="">{project.promised_date}</p>
                      </Box>
                      ))}
                  </Container>
                  <Container sx={{display:'flex', flexDirection:'column', gap:4 ,padding:3, backgroundColor:'white', border: 0, borderColor:'green', borderRight: 5, borderRadius:0}}>
                    <div className={styles.columnTitles}>
                        <h2>Délai restant</h2>
                    </div>
                  
                      {projectsList.map(project => (
                      <Box
                          sx={{
                            width: 100,
                            height: 50,
                            backgroundColor: 'var(--light-blue, white)',
                            color:'black',
                          }}
                      >
                          <p className="">{project.name}</p>
                      </Box>
                      ))}
                  </Container>
                  <Container sx={{display:'flex', flexDirection:'column', gap:4 ,padding:3, backgroundColor:'white', border: 0, borderColor:'green', borderRight: 5, borderRadius:0}}>
                  <div className={styles.columnTitles}>
                        <h2>Responsable projet</h2>
                    </div>
                      {projectsList.map(project => (
                      <Box
                          className={styles.projectCard}
                          sx={{
                              padding: 2,
                              width: 200,
                              height: 120,
                              backgroundColor: 'var(--light-blue, white)',
                              border: '1px solid blue',
                              borderRadius: 5,
                              color:'black',
                              display: 'flex',
                              flexDirection: 'column',
                              justifyContent: 'center',
                          }}
                      >
                          <p className="">{project.manager[0]}</p>
                          <p className="">{project.manager[1]}</p>
                      </Box>
                      ))}
                  </Container>
              </Container>
          </div>
      </div>
    );
  };
  
  export default PlanningBoard;