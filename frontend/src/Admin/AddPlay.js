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

  const [imageUrl, setImageUrl] = useState(null);//
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
  
      // Send the image to the backend for uploading to S3
      const response = await fetch('http://localhost:8080/api/plays/upload-image', {
        method: 'POST',
        body: formData
      });
  
      if (response.ok) {
        const imageUrl = await response.text();
        setImageUrl(imageUrl); // Set the uploaded image URL in state
      }
    }
  };


  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-center mb-6">Add Play</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div className="flex flex-col">
          <label className="text-lg font-medium text-gray-700 mb-2">Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border border-gray-300 rounded-md p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        {/* Genre */}
        <div className="flex flex-col">
          <label className="text-lg font-medium text-gray-700 mb-2">Genre:</label>
          <input
            type="text"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            className="border border-gray-300 rounded-md p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        {/* Duration */}
        <div className="flex flex-col">
          <label className="text-lg font-medium text-gray-700 mb-2">Duration (minutes):</label>
          <input
            type="number"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="border border-gray-300 rounded-md p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        {/* Number of Actors */}
        <div className="flex flex-col">
          <label className="text-lg font-medium text-gray-700 mb-2">Number of Actors:</label>
          <input
            type="number"
            value={actorsCount}
            onChange={(e) => setActorsCount(e.target.value)}
            className="border border-gray-300 rounded-md p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        {/* Plot */}
        <div className="flex flex-col">
          <label className="text-lg font-medium text-gray-700 mb-2">Plot:</label>
          <textarea
            value={plot}
            onChange={(e) => setPlot(e.target.value)}
            className="border border-gray-300 rounded-md p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            rows="4"
            required
          />
        </div>

        {/* Script */}
        <div className="flex flex-col">
          <label className="text-lg font-medium text-gray-700 mb-2">Script (with timing metadata):</label>
          <textarea
            value={script}
            onChange={(e) => setScript(e.target.value)}
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
            Add Play
          </button>
          <button
            type="button"
            onClick={() => navigate('/')}
            className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Back
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPlay;
