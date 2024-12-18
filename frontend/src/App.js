import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import YourPlays from './Plays/YourPlays'; // Replace with your actual component for displaying the list
import EditPlay from './Plays/EditPlay';
import AddPlay from './Plays/AddPlay';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<YourPlays />} /> {/* Main screen showing all plays */}
        <Route path="/edit-play/:playId" element={<EditPlay />} /> {/* Edit screen */}
        <Route path="/add-play" element={<AddPlay />} />
      </Routes>
    </Router>
  );
};

export default App;
