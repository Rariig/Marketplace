import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditPlay = ({ onClose }) => {
  const params = useParams();
  const id = params.playId;

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
    if (id) {
      axios.get(`http://localhost:8080/api/plays/${id}`)
        .then((response) => {
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

  const [imageUrl, setImageUrl] = useState(null);//
    const handleImageUpload = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImageUrl(reader.result); // Set the uploaded image URL
        };
        reader.readAsDataURL(file);
      }
    };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-center mb-6">Editing Play: {play.title}</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div className="flex flex-col">
          <label htmlFor="title" className="text-lg font-medium text-gray-700 mb-2">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={play.title}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        {/* Plot */}
        <div className="flex flex-col">
          <label htmlFor="plot" className="text-lg font-medium text-gray-700 mb-2">Plot:</label>
          <textarea
            id="plot"
            name="plot"
            value={play.plot}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            rows="4"
            required
          />
        </div>

        {/* Genre */}
        <div className="flex flex-col">
          <label htmlFor="genre" className="text-lg font-medium text-gray-700 mb-2">Genre:</label>
          <input
            type="text"
            id="genre"
            name="genre"
            value={play.genre}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Duration */}
        <div className="flex flex-col">
          <label htmlFor="duration" className="text-lg font-medium text-gray-700 mb-2">Duration (minutes):</label>
          <input
            type="number"
            id="duration"
            name="duration"
            value={play.duration}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Number of Actors */}
        <div className="flex flex-col">
          <label htmlFor="actorsCount" className="text-lg font-medium text-gray-700 mb-2">Number of Actors:</label>
          <input
            type="number"
            id="actorsCount"
            name="actorsCount"
            value={play.actorsCount}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Script */}
        <div className="flex flex-col">
          <label htmlFor="script" className="text-lg font-medium text-gray-700 mb-2">Script (with timing metadata):</label>
          <textarea
            id="script"
            name="script"
            value={play.script}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            rows="6"
            placeholder="Enter script with timing metadata (e.g., [5][italic] A tragic story...)"
            required
          />
        </div>
        {/* Background Image */}
        <div className="flex flex-col">
          <label className="text-lg font-medium text-gray-700 mb-2">Background Image:</label>
          <div className="relative">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(e)} // Handle image upload (you can set the image URL to a state)
              className="border border-gray-300 rounded-md p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            
            {/* Display the uploaded image as a small preview */}
            {imageUrl && (
              <div className="relative mt-4">
                <div
                  className="w-40 h-40 bg-cover bg-center rounded-md"
                  style={{ backgroundImage: `url(${imageUrl})` }} // Set background image
                ></div>
              </div>
            )}
          </div>
        </div>


        {/* Buttons */}
        <div className="flex justify-between">
          <button
            type="submit"
            className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Save Changes
          </button>
          <button
            type="button"
            onClick={() => navigate('/')}
            className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPlay;
