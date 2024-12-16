// EditPlay.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditPlay = ({ playId, onClose }) => {
  // State to hold the play's details that can be edited
  const [play, setPlay] = useState({
    title: '',
    plot: '',
    genre: '',
    duration: '',
    actorsCount: '',
    script: '',
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the play details from the backend when the component mounts
    axios.get(`http://localhost:8080/api/plays/${playId}`)
      .then((response) => {
        setPlay(response.data);  // Set the state with the play data
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching play:', error);
        setLoading(false);
      });
  }, [playId]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPlay((prevPlay) => ({
      ...prevPlay,
      [name]: value
    }));
  };

  // Handle form submission for editing the play
  const handleSubmit = (e) => {
    e.preventDefault();

    axios.put(`http://localhost:8080/api/plays/${playId}`, play)
      .then((response) => {
        console.log('Play updated successfully:', response.data);
        onClose();  // Close the edit form/modal after successful update
      })
      .catch((error) => {
        console.error('Error updating play:', error);
      });
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="edit-play-container">
      <h2>Editing Play: {play.title}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={play.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="plot">Plot:</label>
          <textarea
            id="plot"
            name="plot"
            value={play.plot}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="genre">Genre:</label>
          <input
            type="text"
            id="genre"
            name="genre"
            value={play.genre}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="duration">Duration (minutes):</label>
          <input
            type="number"
            id="duration"
            name="duration"
            value={play.duration}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="actorsCount">Number of Actors:</label>
          <input
            type="number"
            id="actorsCount"
            name="actorsCount"
            value={play.actorsCount}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="script">Script (with timing metadata):</label>
          <textarea
            id="script"
            name="script"
            value={play.script}
            onChange={handleChange}
            rows="6"
            placeholder="Enter script with timing metadata (e.g., [5][italic] A tragic story...)"
            required
          />
        </div>
        <div>
          <button type="submit">Save Changes</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default EditPlay;
