import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import PeopleProvider from './hooks/usePeopleContext';

import HomePage from "./pages/HomePage"

function App() {
  return (
    <PeopleProvider>
      <Router>
        <Routes>
          <Route path='/' element={<HomePage />} />
        </Routes>
      </Router>
    </PeopleProvider>
  );
}

export default App;
