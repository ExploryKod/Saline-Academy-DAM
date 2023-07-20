import React, { useState } from 'react';
import ImportRush from './ImportRush'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import RushComponent from './RushComponent';

export default function () {
    return(

        <div className='lightGreyContent'>
            <p>...</p>
            <img />


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
                            <div className='addRushContent'  >
                                <div className='addRushButton'>
                                    <img src='src/assets/addRush.svg' className='addRushButtonLogo'/>
                                </div>
                            </div>
                        </div>
                        </Typography>
                    </AccordionDetails>
            </Accordion>



            <div>
                <p>Commentaire</p>
                <div>...</div>
            </div>
        </div>
    )
}