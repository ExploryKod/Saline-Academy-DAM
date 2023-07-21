import './AddRushPage.css' 
import React, {useEffect, useState } from 'react';
import AddRush from './AddRush';
import ImportRush from './ImportRush'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import RushComponent from './RushComponent';
import FinalRush from './FinalRush';
import './ProjectSummary.css'
import ProjectCard from './ProjectCard'
import SupabaseService from '../tools/SupabaseClient';


export default function () {

    const [showComponent, setShowComponent] = useState(false);
    const [showSecondComponent, setShowSecondComponent] = useState(false);
     
    const [projects, setProjects] = useState([]);
    const sbsProjects = new SupabaseService;

    useEffect(() => {
        sbsProjects.getAllProjects().then((p) => {
            setProjects(p.data);
        });
      })

    const handleClick = () => {
      setShowComponent(true);
    };

    const handleClickSecond = () => {
        setShowSecondComponent(true);
      };



    return(
        <div className='splitscreen'>
            <div>
                {showComponent ? <AddRush /> : null}
                {showSecondComponent ? <ImportRush /> : null}
            </div>


            <div className='leftSide'>
                {projects.map((project, index) => (
                <ProjectCard key={index} title={project.title} state="En cours" status={project.status}/>
            ))}
            </div>    

            <div className='rightSiderush lightGreyContent'>
                <Accordion>
                    <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header">

                        <Typography>Rush</Typography>
                    </AccordionSummary>
                    <br/>
                    <AccordionDetails>
                        <Typography>
                            <div className='addRushDiv'>
                                <div className='addRushContent' onClick={handleClick}>
                                    <div className='addRushButton'>
                                        <img src='src/assets/addRush.svg' className='addRushButtonLogo'/>
                                    </div>
                                </div>
                            </div>
                        </Typography>
                    </AccordionDetails>
                </Accordion>

                <br/> <br/>
            <RushComponent/>

            <br/> <br/>
            <FinalRush/>
            </div>

          
    </div>
    )
    
}