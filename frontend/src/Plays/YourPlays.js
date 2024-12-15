import React, { useState, useEffect } from 'react';
import axios from 'axios';
import deletePlay from './DeleteFunc';
import editPlay from './EditFunc';  // Import deletePlay function

function YourPlays() {
  // State to store the plays data
  const [plays, setPlays] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch plays when the component mounts
  useEffect(() => {
    // Make an HTTP request to fetch the plays from the backend API
    axios.get('http://localhost:8080/api/plays')
      .then(response => {
        // Update the state with the fetched plays
        setPlays(response.data);
        setLoading(false); // Set loading to false once data is fetched
      })
      .catch(error => {
        console.error('Error fetching plays:', error);
        setLoading(false);
      });
  }, []); // Empty dependency array means this runs once when the component mounts

  return (
    <div>
      <h1>Your Plays</h1>
      {loading ? <p>Loading...</p> : (
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
            {plays.map(play => (
              <tr key={play.id}>
                <td>{play.title}</td>
                <td>{play.genre}</td>
                <td>{play.duration}</td>
                <td>{play.actorsCount}</td>
                <td>{play.plot ? play.plot.substring(0, 30) + '...' : 'No plot available'}</td>
                <td>
                  <button onClick={() => deletePlay(play.id)}>Delete</button>
                  <button onClick={() => editPlay(play)}>Edit</button>
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
