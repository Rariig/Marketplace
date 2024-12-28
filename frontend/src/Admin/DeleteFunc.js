import axios from 'axios';

const deletePlay = (playId, setPlays) => {
  // Ask for confirmation before deletion
  if (window.confirm('Are you sure you want to delete this play?')) {
    // Proceed with deletion if user confirms
    axios.delete(`http://localhost:8080/api/plays/${playId}`)
      .then(() => {
        // Remove the play from the list after successful deletion
        setPlays(prevPlays => prevPlays.filter(play => play.id !== playId));
        alert('Play deleted successfully!');
      })
      .catch((error) => {
        console.error('Error deleting play:', error);
        alert('Error deleting play');
      });
  }
};

export default deletePlay;
