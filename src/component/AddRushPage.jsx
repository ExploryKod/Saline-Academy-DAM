import './AddRushPage.css' 
import React, { useState } from 'react';
import AddRush from './AddRush';
import ImportRush from './ImportRush'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import RushComponent from './RushComponent';
import FinalRush from './FinalRush';


export default function () {

    const [showComponent, setShowComponent] = useState(false);
    const [showSecondComponent, setShowSecondComponent] = useState(false);

    const handleClick = () => {
      setShowComponent(true);
    };

    const handleClickSecond = () => {
        setShowSecondComponent(true);
      };


    return(
        <div>
            <div>
                {showComponent ? <AddRush /> : null}
                {showSecondComponent ? <ImportRush /> : null}
            </div>

            <div className='lightGreyContent'>

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
            </div>

            <br/> <br/>
            <RushComponent/>

            <br/> <br/>
            <FinalRush/>
    </div>
    )
    
}