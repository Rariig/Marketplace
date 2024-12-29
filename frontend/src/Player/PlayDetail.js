import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';  // To access the play ID from the URL
import axios from 'axios';  // Import axios for fetching

const PlayDetail = () => {
  const { playId } = useParams();
  const [play, setPlay] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);  // State to hold error messages

  useEffect(() => {
    if (playId) {
      axios.get(`http://localhost:8080/api/plays/${playId}`)
        .then((response) => {
          setPlay(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching play:', error);
          setError('Error fetching play details');
          setLoading(false);
        });
    }
  }, [playId]);
  const navigate = useNavigate();

  // Show loading message while waiting for the API response
  if (loading) return <div>Loading...</div>;

  // Show error message if the API call failed
  if (error) return <div>Error: {error}</div>;

  // If play is found, display details
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-semibold text-gray-800">{play.title || 'No Title'}</h1>
        
        {/* Plot */}
        <div className="mt-4">
          <h2 className="text-xl font-semibold text-gray-700">Plot:</h2>
          <p>{play.plot || 'No Plot Available'}</p>
        </div>

        {/* Genre */}
        <div className="mt-4">
          <h2 className="text-xl font-semibold text-gray-700">Genre:</h2>
          <p>{play.genre || 'No Genre Available'}</p>
        </div>

        {/* Duration */}
        <div className="mt-4">
          <h2 className="text-xl font-semibold text-gray-700">Duration:</h2>
          <p>{play.duration} minutes</p>
        </div>

        {/* Number of Actors */}
        <div className="mt-4">
          <h2 className="text-xl font-semibold text-gray-700">Number of Actors:</h2>
          <p>{play.actorsCount}</p>
        </div>

        {/* Optionally, you can also add other details or a picture background */}

        <button
            type="button"
            onClick={() => navigate('/playGrid')}
            className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Back
        </button>
      </div>
    </div>
  );
};

export default PlayDetail;
