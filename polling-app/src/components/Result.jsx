import { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

function Result({ poll, userId }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [hasVoted, setHasVoted] = useState(false); // Track if user has already voted
  const [voteError, setVoteError] = useState(null); // Track any vote errors

  // Fetch vote status on component mount
  useEffect(() => {
    const checkIfVoted = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/poll/${poll._id}`);
        const voted = response.data.voters.includes(userId); // Check if user has voted
        setHasVoted(voted);
      } catch (err) {
        console.error('Error checking vote status:', err);
      }
    };

    checkIfVoted();
  }, [poll._id, userId]);

  const handleVote = async (e) => {
    e.preventDefault();

    // If the user has already voted, we don't allow submitting the vote again
    if (hasVoted) {
      alert('You have already voted on this poll.');
      return;
    }

    // If no option is selected, return early
    if (selectedOption === null) {
      alert('Please select an option before voting.');
      return;
    }

    try {
      // Send the index of the selected option (not the option value)
      await axios.post(`http://localhost:5000/api/poll/${poll._id}/vote`, {
        optionIndex: selectedOption,
        userId, // Send the userId to track if they've voted
      });

      setHasVoted(true); // Mark that the user has voted
      alert('Vote submitted!');
    } catch (err) {
      console.error("Error voting on poll:", err);
      setVoteError('Error submitting vote');
    }
  };

  return (
    <div className="poll-vote">
      <h2>{poll.question}</h2>

      {/* Show vote status */}
      {hasVoted ? (
        <div className="voted-message">
          <p>You have already voted on this poll!</p>
        </div>
      ) : (
        <form onSubmit={handleVote}>
          {poll.options.map((option, index) => (
            <div key={index} className="option">
              <input
                type="radio"
                id={`option-${index}`}
                name="poll-option"
                value={option}
                onChange={() => setSelectedOption(index)}
                checked={selectedOption === index}
                disabled={hasVoted} // Disable if user has voted
              />
              <label htmlFor={`option-${index}`}>{option}</label>
            </div>
          ))}
          <button type="submit" className="btn-vote" disabled={selectedOption === null || hasVoted}>
            Vote
          </button>
        </form>
      )}

      {/* Error Message */}
      {voteError && <p className="error-message">{voteError}</p>}
    </div>
  );
}

Result.propTypes = {
  poll: PropTypes.object.isRequired, // poll should be an object and is required
  userId: PropTypes.string.isRequired, // User identifier (can be session-based or unique ID)
};

export default Result;
