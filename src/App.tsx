import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import WeekModule from './pages/WeekModule';
import CharacterDossiers from './pages/CharacterDossiers';
import StudentSubmissions from './pages/StudentSubmissions';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Embodied Narration: Writing with Tolstoy's Techniques</h1>
        </header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/week/:weekNumber" element={<WeekModule />} />
          <Route path="/characters" element={<CharacterDossiers />} />
          <Route path="/submissions" element={<StudentSubmissions />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
