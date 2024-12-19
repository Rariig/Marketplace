import React, { useState, useEffect } from 'react';
import axios from 'axios';
import deletePlay from './DeleteFunc';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook

function YourPlays() {
  const [plays, setPlays] = useState([]); // State to store the plays data
  const [loading, setLoading] = useState(true); // Loading state
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
    navigate(`/edit-play/${id}`); // Ensure correct route syntax
  };

  const handleAddPlay = () => {
    navigate('/add-play'); // Navigate to the AddPlay route
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg"> {/*wrapper around the table*/}
      <div className="flex items-center space-x-2 mb-4">
        {/* Heading "Your Plays" aligned to the left */}
        <h1 className="text-2xl font-semibold text-left">Your Plays</h1>

        {/* Add Play button with SVG icon */}
        <button
         onClick={handleAddPlay}
          className="bg-green-600 text-white rounded-md p-2 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 flex items-center justify-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
           <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
         </svg>
       </button>
      </div>


      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="border border-gray-300 rounded-lg overflow-hidden">
        <table className="min-w-full table-auto border-collapse">
          <thead className="bg-gray-100">
            <tr className="text-black">
              <th className="px-4 py-2 text-left">Title</th>
              <th className="px-4 py-2 text-left">Genre</th>
              <th className="px-4 py-2 text-left">Duration</th>
              <th className="px-4 py-2 text-left">Actors</th>
              <th className="px-4 py-2 text-left">Plot</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {plays.map((play) => (
              <tr key={play.id} className="border-t border-gray-300 hover:bg-gray-200">
                <td className="px-4 py-2">{play.title}</td>
                <td className="px-4 py-2">{play.genre}</td>
                <td className="px-4 py-2">{play.duration} min</td>
                <td className="px-4 py-2">{play.actorsCount}</td>
                <td className="px-4 py-2 whitespace-normal break-words">
                  {play.plot ? (
                    <>
                      {play.plot.length > 15 ? (
                        <>
                          {play.plot.substring(0, 15)}<br />
                          {play.plot.substring(15, 30) + (play.plot.length > 30 ? '...' : '')}
                        </>
                      ) : (
                        play.plot
                      )}
                    </>
                  ) : (
                    'No plot available'
                  )}
                </td>

                <td className="px-4 py-2 space-x-2">
                <button
                  onClick={() => handleEdit(play.id)}
                  className="bg-indigo-500 text-white p-2 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                  </svg>
                </button>
                <button
                  onClick={() => deletePlay(play.id, setPlays)}
                  className="bg-red-400 text-white p-2 rounded-md hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                  </svg>
                </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      )}
    </div>
  );
}

export default YourPlays;
