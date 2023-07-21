# Saline-Academy-DAM
Projet 1 - projet de fin d'année 2 pour le bachelor Web Hetic - Document Asset Management System for the Saline Academy

L'app sur l'addresse en aparté est couplé avec une api qui est dans un autre repo et déployé sur Render. 

Addresse du repo de générationn de token (api) : https://github.com/ExploryKod/tokenapi

Addresse du site de l'api (aucune interface): https://tokengenerator-zqnt.onrender.com

Addresse du site en front (avec supabase) : https://eloquent-wisp-28324a.netlify.app/

Une fois le login engagé, il y aun temps de chargement qui peut être important (peu d'optimisation sur ce point). Il n'y a pas encore de loader donc il faut attendre et on est bien redirigé sur la homepage.

Technologies: 
- Node js avec Express js (pour l'API)
- React Js avec React Router Dom
- Supabase pour la BDD
- Le Store de Supabase : pour y stocker les assets.
- Style: Node sass (scss) et Material UI 
- Sécurité: jsonwebtoken (librairie qui encode), jwt decode, bcryptjs (hash du mot de passe).
- Utilities: des date picker, un custom hook et des  (traitement des timestamp etc...). 
- Usage de la context API (usage minimal).
- Docker (pour déployer l'API sur Render) et Netifly (déploiement du front). 


