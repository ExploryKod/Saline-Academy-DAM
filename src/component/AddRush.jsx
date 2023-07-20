import SupabaseService from '../tools/SupabaseClient'
import React, {useState, useRef } from 'react';
import './AddRush.css'
 
export default function AddRush (){

    const [videoUrl, setVideoUrl] = useState('');
    const videoUrlInputRef = useRef();
    const handleSubmit = () => {
        const sbs = new SupabaseService();
        const data = {
            video: videoUrl,
            projet_id:116,
        }
        sbs.createRushVideo(data)
    }

    return(
    <div>
        <div className="grayBackground">
            <p>Ajouter des rushs</p>
            <br/>
            <label for="addVideo" className='labelAddVideo'>Ajout de vidéos</label>
            <br/>
            <input type="text" name="addVideo" className='urlVideo' placeholder='Lien Google Drive uniquement'
            ref={videoUrlInputRef}
            onChange={() => setVideoUrl(videoUrlInputRef.current.value)}/> 
            <button className='submitButton' onClick={handleSubmit}> Soumettre</button>
        </div>
    </div>
    )
}