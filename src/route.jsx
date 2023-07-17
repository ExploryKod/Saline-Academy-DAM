import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import App from "./App";

const RoutesComponent = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/homepage" replace />} />
        <Route path="/homepage" element={<App />} />
        <Route path="/test" element={<div>Not found</div>} />
      </Routes>
    </Router>
  );
};

export default RoutesComponent;