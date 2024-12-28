import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import YourPlays from './Admin/YourPlays';
import EditPlay from './Admin/EditPlay';
import AddPlay from './Admin/AddPlay';
import LandingPage from './Player/LandingPage';
import Header from './Player/Header';
import PlaysPage from './Player/PlaysPage';



import './index.css'; // or the path to your Tailwind CSS file

const AppContent = () => {
  const location = useLocation();
  const isLandingPage = location.pathname === '/';

  return (
    <div className={isLandingPage ? "flex-grow overflow-hidden" : "flex-grow overflow-auto"}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/plays" element={<PlaysPage />} />
        <Route path="/your-plays" element={<YourPlays />} />
        <Route path="/edit-play/:playId" element={<EditPlay />} />
        <Route path="/add-play" element={<AddPlay />} />
      </Routes>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <div className="flex flex-col h-screen">
        {/* Header that stays at the top */}
        <Header />

        {/* Main content below the header */}
        <AppContent />
      </div>
    </Router>
  );
};

export default App;
