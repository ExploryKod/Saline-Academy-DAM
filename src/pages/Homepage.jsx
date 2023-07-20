import { useEffect, useState } from "react";
import SupabaseService from "../tools/SupabaseClient";
import { Accordion, AccordionDetails, AccordionSummary, Box, Container, Typography } from "@mui/material";
import styles from "./Homepage.module.scss"
import ProjectCard from "../component/ProjectCard";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Navbar from "../component/Navbar";

const Homepage = (props) => {
  const { sessionId } = props
  const [projets, setProjets] = useState([]);
  const [ hasPriority, setHasPriority] = useState([])
  const [ videoNotValidated, setVideoNotValidated] = useState([])

  useEffect(() => {
    const sbs = new SupabaseService();

    sbs.getAllProjects().then((p) => {
        setProjets(p.data);
        setHasPriority(p.data.filter((p) => p.hasPriority === true))
    });

    sbs.getUnvalidatedVideoEditing().then((p) => {
        setVideoNotValidated(p.data)
    })

  }, []);

  console.log(videoNotValidated)
  const informationDashboard = [
    {
        number : projets.filter((p) => p.promised_date < new Date()).length,
        title : "Projets En Retard"
    },
    {
        number : projets.filter((p) => p.status === "DELETED").length,
        title : "Projets Annulés"
    },
    {
        number : projets.filter((p) => p.status !== 'DELETED' &&  p.status !== 'FINISHED').length,
        title : "Projets En Cours"
    },
    {
        number : projets.filter((p) => p.status === "FINISHED").length,
        title : "Projets Terminés"
    },
  ]

  return (
    <div className={styles.globalContainer}>
        <Navbar />

        <div className={styles.firstContainer}>
            <h1>Bienvenue sur le cockpit</h1>

            <Container sx={{display:'flex', gap:5}}>
                <Container className={styles.smallBlock} sx={{flexBasis:'150%'}}>
                    <h2>To do</h2>

                    <Accordion>
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        >
                            <Typography>Projet prioritaire</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <ProjectCard title="Nom du Projet" state="État" status="Status"/>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion>
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        >
                            <Typography>Projet à valider</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <ProjectCard title="Nom du Projet" state="État" status="Status"/>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion>
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        >
                            <Typography>Vidéo à valider</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <ProjectCard title="Nom du Projet" state="État" status="Status"/>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion>
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        >
                            <Typography>Projet à venir</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <ProjectCard title="Nom du Projet" state="État" status="Status"/>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion>
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        >
                            <Typography>Retour projet</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <ProjectCard title="Nom du Projet" state="État" status="Status"/>
                        </AccordionDetails>
                    </Accordion>
                </Container>

                <Container className={styles.smallBlock}>
                    <h2>Activité</h2>
                    <h3>Dernier projet rendu :</h3>
                    <ProjectCard title="Nom du Projet" state="État" status="Status"/>
                    <h3>Prochain projet à rendre :</h3>
                    <ProjectCard title="Nom du Projet" state="État" status="Status"/>
                </Container>
            </Container>
            

            <Container>
                <h2>Dashboard</h2>
                <Container sx={{display:'flex',justifyContent:"space-around", gap:4 ,padding:3, backgroundColor:'white', borderRadius:2}}>
                    {informationDashboard.map(information => (
                    <Box
                        sx={{
                            width: 263,
                            height: 144,
                            backgroundColor: 'var(--light-blue, #364496)',
                            borderRadius: 5,
                            color:'white',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                        }}
                    >
                        <p className={styles.numberBlock}>{information.number}</p>
                        <p className={styles.titleBlock}>{information.title}</p>
                    </Box>
                    ))}
                </Container>
            </Container>
        </div>
        
        
    </div>
  );
};

export default Homepage;