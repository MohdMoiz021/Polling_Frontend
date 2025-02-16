import PollResult from './Result';
import PropTypes from 'prop-types';
function ListingPoll({ polls }) {
  return (
    <div className="poll-list">
      {polls.map((poll) => (
        <div key={poll._id} className="poll-item">
          <h3>{poll.question}</h3>
          <PollResult poll={poll} />
        </div>
      ))}
    </div>
  );
}

ListingPoll.propTypes = {
  polls: PropTypes.func.isRequired, // setPolls should be a function and is required
};

export default ListingPoll;
