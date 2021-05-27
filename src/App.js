import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './assets/scss/general.scss';
import AppRoutes from './routes/AppRoutes';
import './main.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import "bs-stepper/dist/css/bs-stepper.min.css";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
        <AppRoutes/>
    </Router>
  );
}

export default App;
