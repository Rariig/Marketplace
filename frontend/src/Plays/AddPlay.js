// src/AddPlay.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddPlay = () => {
  const [title, setTitle] = useState('');
  const [plot, setPlot] = useState('');
  const [genre, setGenre] = useState('');
  const [duration, setDuration] = useState('');
  const [actorsCount, setActorsCount] = useState('');
  const [script, setScript] = useState('');

  const navigate = useNavigate(); // Hook to navigate back to YourPlays page

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newPlay = {
      title,
      plot,
      genre,
      duration: parseInt(duration, 10),
      actorsCount: parseInt(actorsCount, 10),
      script,
    };

    try {
      const response = await fetch('http://localhost:8080/api/plays', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPlay),
      });

      if (response.ok) {
        alert('Play added successfully!');
        setTitle('');
        setPlot('');
        setGenre('');
        setDuration('');
        setActorsCount('');
        setScript('');
        navigate('/');
      } else {
        alert('Failed to add play');
      }
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  return (
    <div>
      <h2>Add Play</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label>Genre:</label>
          <input
            type="text"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
          />
        </div>
        <div>
          <label>Duration (minutes):</label>
          <input
            type="number"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
        </div>
        <div>
          <label>Number of Actors:</label>
          <input
            type="number"
            value={actorsCount}
            onChange={(e) => setActorsCount(e.target.value)}
          />
        </div>
        <div>
          <label>Plot:</label>
          <textarea
            value={plot}
            onChange={(e) => setPlot(e.target.value)}
          />
        </div>
        <div>
          <label>Script (with timing metadata):</label>
          <textarea
            value={script}
            onChange={(e) => setScript(e.target.value)}
            rows="6"
            placeholder="Enter script with timing metadata (e.g., [5][italic] A tragic story...)"
            required
          />
        </div>
        <button type="submit">Add Play</button>
      </form>
    </div>
  );
};

export default AddPlay;
