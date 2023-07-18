import notFoundImage from '../assets/back_woman.jpg';

export const NotFoundPage = () => {
    const path = window.location.pathname;
    const urlParts = path.split('/');
    const searchedPage = urlParts[1];

    return (
            <div className="not-found-container">
                <div className="not-found__img-container">
                    <img src={notFoundImage} alt="promeneur perdu"/>
                </div>
                <div className="not-found__text-container">
                    <h1 className="not-found__title">404</h1>
                    <p> Aucune page "{searchedPage}" trouvé.</p>
                    <a href="/" >Retour</a>
                </div>
        </div>
    );
  };
  
  export default NotFoundPage;
  
// Source de l'image: Photo de Andrew Neel: https://www.pexels.com/fr-fr/photo/personne-debout-sur-le-chemin-2682462/