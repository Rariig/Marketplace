import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import YourPlays from './Admin/YourPlays'; // Replace with your actual component for displaying the list
import EditPlay from './Admin/EditPlay';
import AddPlay from './Admin/AddPlay';
import LandingPage from './Player/LandingPage';
import Header from './Player/Header';
import PlayGrid from './Player/PlayGrid';
import PlayDetail from './Player/PlayDetail';

import './index.css'; // or the path to your Tailwind CSS file


const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/your-plays" element={<YourPlays />} /> {/* Main screen showing all plays */}
        <Route path="/edit-play/:playId" element={<EditPlay />} /> {/* Edit screen */}
        <Route path="/add-play" element={<AddPlay />} />
        <Route path="/playGrid" element={<PlayGrid />} />
        <Route path="/playGrid/:playId" element={<PlayDetail />} />
      </Routes>
    </Router>
  );
};

export default App;
