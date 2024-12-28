// src/pages/PlaysPage.jsx (or wherever you keep your page components)
import React, { useState, useEffect } from 'react';
import PlayGrid from './PlayGrid';  // adjust the import path as needed

const PlaysPage = () => {
  const [plays, setPlays] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null);
  
  useEffect(() => {
    // Fetch plays from your backend
    const fetchPlays = async () => {
      try {
        const response = await fetch('/api/plays');  // adjust the endpoint as needed
        const data = await response.json();
        setPlays(data);
      } catch (error) {
        console.error('Error fetching plays:', error);
      }
    };

    // Get current user ID (adjust based on your auth implementation)
    const userId = localStorage.getItem('userId'); // or however you store user info
    setCurrentUserId(userId);

    fetchPlays();
  }, []);

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">Plays Library</h1>
      <PlayGrid 
        plays={plays} 
        currentUserId={currentUserId}
        isAdmin={currentUserId === process.env.NEXT_PUBLIC_ADMIN_ID}
      />
    </div>
  );
};

export default PlaysPage;