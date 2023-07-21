import SupabaseService from '../tools/SupabaseClient'
import React, {useState, useRef } from 'react';
import './AddRush.css'

export default function ImportRush (){

    const [rushUrl, setRushUrl] = useState('');
    const rushUrlInputRef = useRef();
    const handleSubmit = () => {
        const sbs = new SupabaseService();
        const data = {
            video: rushUrl,
        }
        sbs.insertRushVideo(data)
        window.location.reload();

    }
    
    return(
        <div className="grayBackground">
            <p>Importer des rushs</p>
            <br/>
            <label for="addVideo" className='labelAddVideo'>Ajout de vidéos</label>
            <br/>
            <input type="text" name="addVideo" className='urlVideo' placeholder='Lien YouTube uniquement'
            ref={rushUrlInputRef}
            onChange={() => setRushUrl(rushUrlInputRef.current.value)}
           /> 
            <button className='submitButton' onClick={handleSubmit}> Soumettre</button>
        </div>
    )
}


 