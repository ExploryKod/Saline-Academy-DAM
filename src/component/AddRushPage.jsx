import './AddRushPage.css' 
import React, { useState } from 'react';
import AddRush from './AddRush';
import ImportRush from './ImportRush'


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
            <div className='addRushAccordion'>
                <span>Rush</span>
                
            </div> 
            <br/> 
            <div className='addRushDiv'>
                <div className='addRushContent' onClick={handleClick}>
                    <div className='addRushButton'>
                        <img src='src/assets/addRush.svg' className='addRushButtonLogo'/>
                    </div>
                </div>
            </div>
        </div>

        <br/>


        <div className='lightGreyContent'>
            <div className='addRushAccordion'>
                <span>Rush</span>
                
            </div> 
            <br/> 
            <div className='addRushDiv'>
                <div className='addRushContent' onClick={handleClickSecond}>
                    <div className='addRushButton'>
                        <img src='src/assets/addRush.svg' className='addRushButtonLogo'/>
                    </div>
                </div>
            </div>
            <input type="file" name="addRush" className='addRush'/>
            <button className='importVideo'>Importer une vidéo</button>
        </div>

        <div className='addRushDiv'>
            <p>Ajouter un commentaire</p>
        </div>
    </div>
    )
    
}