import './AddRush.css'

export default function (){
    return(

        <div className="grayBackground">
            <p>Ajouter des rushs</p>

            <br/>
            <form>
                 
                <label for="addVideo" className='labelAddVideo'>Ajout de vidéos</label>
                <br/>
                <input type="file" name="addVideo" className='addFile'/>
                <div className='addRushButtonSecondVersion'>
                    <img src='src/assets/addRush.svg' className='addRushButtonLogo'/>
                 </div>

                <label for="addSound" className='labelAddSound'>Ajout de pistes audios</label>
                <br/>
                <input type="file" name="addSound" className='addFile'/>
                <div className='addRushButtonSecondVersion'>
                    <img src='src/assets/addRush.svg' className='addRushButtonLogo'/>
                 </div>
                <button className='submitButton'>Soumettre</button>
            </form>
            
        </div>
    )
}