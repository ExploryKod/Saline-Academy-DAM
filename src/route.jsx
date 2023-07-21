import { Navigate, Route, Routes } from "react-router-dom";
import Connexion from "./routes/connexion"
import NotFoundPage from './routes/404';
import AddRushPage from './component/AddRushPage';
import CreateProject from "./CreateProject";
import ProjectDetailGeneral from "./Project-detail-general";
import ProjectDetailGeneralUpdate from "./Projet-detail-general-update";
import useToken from './tools/useToken';
import './styles/style.scss'
import Homepage from "./pages/Homepage";
import PlanningBoard from "./routes/planningBoard";


const RoutesComponent = () => {
    const { token, setToken } = useToken();

    return (
        <>
            {token ? (
            <Routes>
                <Route path="/" element={<Navigate to="/homepage" replace />} />
                <Route path="/homepage" element={<Homepage tokenId={token} />} />
                <Route path="/create" element={<CreateProject />} />
                <Route path="/project-detail-general" element={<ProjectDetailGeneral/>} />
                <Route path="/project-detail-general-update" element={<ProjectDetailGeneralUpdate/>} />
                <Route path="/projet-detail-add-rush" element={<AddRushPage/>}/>
                <Route path='*' element={<NotFoundPage />} />
                <Route path="/planning" element={<PlanningBoard />} />
            </Routes>):(
                <Routes>
                    <Route path="/" element={<Navigate to="/connexion" replace />} />
                    <Route path="/connexion" element={<Connexion setToken={setToken} />} />
                    <Route path='*' element={<NotFoundPage />} />
                </Routes>)}
        </>
    );
};

export default RoutesComponent;