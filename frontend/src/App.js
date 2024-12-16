import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import YourPlays from './Plays/YourPlays'; // Replace with your actual component for displaying the list
import EditPlay from './Plays/EditPlay';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<YourPlays />} /> {/* Main screen showing all plays */}
        <Route path="/edit/:playId" element={<EditPlay />} /> {/* Edit screen */}
      </Routes>
    </Router>
  );
};

export default App;
