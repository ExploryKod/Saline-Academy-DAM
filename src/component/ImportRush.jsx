export default function(){
    return(
        <div className="grayBackground">
            <p>Importer des rushs</p>

            <br/>
            <form>
                 
                <label for="addVideo" className='labelAddVideo'>Ajout de vidéos</label>
                <br/>
                <input type="file" name="addVideo" className='addFile'/>
                <div className='addRushButtonSecondVersion'>
                    <img src='src/assets/addRush.svg' className='addRushButtonLogo'/>
                 </div>
            </form>
            
        </div>
    )
}