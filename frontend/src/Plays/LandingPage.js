import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Welcome to Play Manager</h1>
      <Link to="/your-plays" className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-500">
        Go to Your Plays
      </Link>
    </div>
  );
};

export default LandingPage;
