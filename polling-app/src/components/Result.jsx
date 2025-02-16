import { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
function Result({ poll }) {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleVote = async (e) => {
    e.preventDefault();

    const votedOption = poll.options[selectedOption];
    try {
      await axios.post(`http://localhost:5000/polls/${poll._id}/vote`, { option: votedOption });
      alert('Vote submitted!');
    } catch (err) {
      console.error("Error voting on poll:", err);
    }
  };

  return (
    <div className="poll-vote">
      <form onSubmit={handleVote}>
        {poll.options.map((option, index) => (
          <div key={index} className="option">
            <input
              type="radio"
              id={`option-${index}`}
              name="poll-option"
              value={option}
              onChange={() => setSelectedOption(index)}
            />
            <label htmlFor={`option-${index}`}>{option}</label>
          </div>
        ))}
        <button type="submit" className="btn-vote" disabled={selectedOption === null}>
          Vote
        </button>
      </form>
    </div>
  );
}

Result.propTypes = {
  poll: PropTypes.func.isRequired, // setPolls should be a function and is required
};

export default Result;
