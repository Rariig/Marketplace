import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditPlay = ({ onClose }) => {

  const params = useParams();
  const id = params.playId;

  console.log(id);
  const [play, setPlay] = useState({
    title: '',
    plot: '',
    genre: '',
    duration: '',
    actorsCount: '',
    script: '',
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('Play ID:', id); // Debugging line
    if (id) {
      axios.get(`http://localhost:8080/api/plays/${id}`)
        .then((response) => {
          console.log('Fetched play data:', response.data); // Debugging line
          setPlay(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching play:', error);
          setLoading(false);
        });
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:8080/api/plays/${id}`, play)
      .then((response) => {
        console.log('Play updated successfully:', response.data);
        alert('Play updated successfully!');
        navigate('/'); // Navigate back to the 'Your Plays' page
      })
      .catch((error) => {
        console.error('Error updating play:', error);
        alert('Failed to update play. Please try again.');
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPlay((prevPlay) => ({
      ...prevPlay,
      [name]: value,
    }));
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
          <button type="button" onClick={() => navigate('/')}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default EditPlay;
