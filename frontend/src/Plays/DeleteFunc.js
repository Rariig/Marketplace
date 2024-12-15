// DeletePlay.js

import axios from 'axios';

const deletePlay = (id, setPlays, plays) => {
  // Send DELETE request to the backend
  axios.delete(`http://localhost:8080/api/plays/${id}`)
    .then(response => {
      // If successful, remove the play from the state
      setPlays(plays.filter(play => play.id !== id));
    })
    .catch(error => {
      console.error('Error deleting play:', error);
    });
};

export default deletePlay;
