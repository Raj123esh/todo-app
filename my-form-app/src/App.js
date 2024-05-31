// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Form from './Form';
import Submitted from './Submitted';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/submitted" element={<Submitted />} />
      </Routes>
    </Router>
  );
};

export default App;
