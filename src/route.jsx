import { useState, useEffect, useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AppContext } from './AppContext';
import Connexion from "./routes/connexion"
import NotFoundPage from './routes/404';
import AddRushPage from './component/AddRushPage';
import CreateProject from "./CreateProject";
import ProjectDetailGeneral from "./Project-detail-general";
import ProjectDetailGeneralUpdate from "./Projet-detail-general-update";
import Login from "./component/Login/Login";
import useToken from './tools/useToken';

import './styles/style.scss'
import Homepage from "./pages/Homepage";

const RoutesComponent = () => {
    const { sessionData, setSessionData } = useContext(AppContext);
    const { token, setToken } = useToken();


   console.log('token', token);
   console.log('session_id', sessionData.session_id);

    return (
        <>
            {token ? (
            <Routes>
                <Route path="/" element={<Navigate to="/homepage" replace />} />
                <Route path="/homepage" element={<Homepage />} />
                <Route path="/test" element={<div>Not found</div>} />
                <Route path="/create" element={<CreateProject />} />
                <Route path="/project-detail-general" element={<ProjectDetailGeneral/>} />
                <Route path="/project-detail-general-update" element={<ProjectDetailGeneralUpdate/>} />
                <Route path="/projet-detail-add-rush" element={<AddRushPage/>}/>
                <Route path='*' element={<NotFoundPage />} />
            </Routes>):(
                <Routes>
                    <Route path="/" element={<Navigate to="/connexion" replace />} />
                    {/* <Route path="/login" element={<Login setToken={setToken} />} /> */}
                    <Route path="/connexion" element={<Connexion setToken={setToken} />} />
                    <Route path='*' element={<NotFoundPage />} />
                </Routes>)}
        </>
    );
};

export default RoutesComponent;