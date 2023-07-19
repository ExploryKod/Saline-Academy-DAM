import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import App from "./App"
import AddRushPage from './component/AddRushPage';
import CreateProject from "./CreateProject";
import ProjectDetailGeneral from "./Project-detail-general";
import ProjectDetailGeneralUpdate from "./Projet-detail-general-update";

const RoutesComponent = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/homepage" replace />} />
        <Route path="/homepage" element={<App />} />
        <Route path="/test" element={<div>Not found</div>} />
        <Route path="/create" element={<CreateProject />} />
        <Route path="/project-detail-general" element={<ProjectDetailGeneral/>} />
        <Route path="/project-detail-general-update" element={<ProjectDetailGeneralUpdate/>} />
        <Route path="/projet-detail-add-rush" element={<AddRushPage/>}/>
      </Routes>
    </Router>
  );
};

export default RoutesComponent;