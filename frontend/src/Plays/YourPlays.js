import React, { useState, useEffect } from 'react';
import axios from 'axios';
import deletePlay from './DeleteFunc';
import EditPlay from './EditPlay';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook

function YourPlays() {
  const [plays, setPlays] = useState([]); // State to store the plays data
  const [loading, setLoading] = useState(true); // Loading state
  const [editPlayId, setEditPlayId] = useState(null); // Store the ID of the play to edit
  const navigate = useNavigate(); 

  // Fetch plays when the component mounts
  useEffect(() => {
    axios.get('http://localhost:8080/api/plays')
      .then(response => {
        setPlays(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching plays:', error);
        setLoading(false);
      });
  }, []);

  // Function to handle opening the EditPlay component
  const handleEdit = (id) => {
    setEditPlayId(id); // Set the ID of the play to edit
  };

  // Function to close the EditPlay component
  const handleClose = () => {
    setEditPlayId(null); // Reset the editPlayId to null to close EditPlay
  };
  const handleAddPlay = () => {
    navigate('/add-play'); // Navigate to the AddPlay route
  };

  return (
    <div>
      <h1>Your Plays</h1>
      {/* Button to navigate to AddPlay */}
      <button onClick={handleAddPlay}>Add Play</button>
      {editPlayId ? ( // If editPlayId is set, render the EditPlay component
        <EditPlay playId={editPlayId} onClose={handleClose} />
      ) : loading ? (
        <p>Loading...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Genre</th>
              <th>Duration</th>
              <th>Actors</th>
              <th>Plot</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {plays.map((play) => (
              <tr key={play.id}>
                <td>{play.title}</td>
                <td>{play.genre}</td>
                <td>{play.duration}</td>
                <td>{play.actorsCount}</td>
                <td>{play.plot ? play.plot.substring(0, 30) + '...' : 'No plot available'}</td>
                <td>
                  <button onClick={() => deletePlay(play.id, setPlays)}>Delete</button>
                  <button onClick={() => handleEdit(play.id)}>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  ); 
}

export default YourPlays;
