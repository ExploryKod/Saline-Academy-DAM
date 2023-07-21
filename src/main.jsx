import React from 'react'
import ReactDOM from 'react-dom/client'
import RoutesComponent from './route.jsx'
import { AppProvider } from './AppContext';
import { BrowserRouter as Router } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <Router>
        <AppProvider>
          < RoutesComponent />
        </AppProvider>
      </Router>
  </React.StrictMode>
)
