import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import App from "./App";
import CreateProject from "./CreateProject";

const RoutesComponent = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/homepage" replace />} />
        <Route path="/homepage" element={<App />} />
        <Route path="/test" element={<div>Not found</div>} />
        <Route path="/create" element={<CreateProject />} />
      </Routes>
    </Router>
  );
};

export default RoutesComponent;