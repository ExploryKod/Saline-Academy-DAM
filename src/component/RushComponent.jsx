import React, { useState } from 'react';
import ImportRush from './ImportRush'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import RushComponent from './RushComponent';

export default function () {

    const [showSecondComponent, setShowSecondComponent] = useState(false);

    const handleClickSecond = () => {
        setShowSecondComponent(true);
      };
      
    return(
        <div>  
             <div>
                
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
                                <div className='addRushContent' >
                                    <div className='addRushButton'>
                                        <img src='src/assets/addRush.svg' className='addRushButtonLogo'/>
                                    </div>
                                </div>
                            </div>

                            <button className='importVideo' onClick={handleClickSecond}>Importer une vidéo</button>
                            </Typography>
                        </AccordionDetails>
                </Accordion>
            </div>

            <br/><br/>

            <div className='addComment'>
                <label for="addComment" className='addCommentLabel' >Ajouter un commentaire</label>
                <br/>
                <input type="text" name="addComment" className='addCommentInput'/> 
            </div>
        </div>
    )
}