// src/Player/PlayGrid.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';  // For navigation

const PlayGrid = () => {
  const [plays, setPlays] = useState([]);  // State to store plays data
  const [loading, setLoading] = useState(true);  // Loading state

  // Fetch plays when the component mounts
  useEffect(() => {
    const fetchPlays = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/plays'); // Replace with your API URL
        const data = await response.json();
        setPlays(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching plays:', error);
        setLoading(false);
      }
    };

    fetchPlays();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {plays.map((play) => (
        <div key={play.id} className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg relative">
          {/* Optionally, use background image or leave as plain */}
          <div
            className="h-64 bg-cover bg-center rounded-lg"
            style={{ backgroundImage: `url(${play.imageUrl || 'default.jpg'})` }}
          >
            <Link
              to={`/playGrid/${play.id}`} // This makes each card clickable and routes to PlayDetail
              className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white font-semibold text-lg rounded-lg"
            >
              {play.title || 'No Title'}
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PlayGrid;
