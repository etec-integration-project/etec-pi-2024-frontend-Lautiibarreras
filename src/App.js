import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import DataDisplay from './components/DataDisplay';
import DataForm from './components/DataForm';
import './styles/App.css';

const App = () => {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<h1>Bienvenido al Proyecto</h1>} />
          <Route path="/data-display" element={<DataDisplay />} />
          <Route path="/data-form" element={<DataForm />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
