import { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

function FormPoll({ setPolls }) {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '']);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newPoll = { question, options };
    
    try {
      const response = await axios.post('http://localhost:5000/api/poll', newPoll);
      setPolls((prev) => [response.data, ...prev]);
      setQuestion('');
      setOptions(['', '']);
    } catch (err) {
      console.error("Error creating poll:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="poll-form">
      <input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Enter poll question"
        className="input-field"
        required
      />
      {options.map((option, index) => (
        <input
          key={index}
          type="text"
          value={option}
          onChange={(e) => {
            const newOptions = [...options];
            newOptions[index] = e.target.value;
            setOptions(newOptions);
          }}
          placeholder={`Option ${index + 1}`}
          className="input-field"
          required
        />
      ))}
      <button type="submit" className="btn-submit">Create Poll</button>
    </form>
  );
}

// Define prop types for the component
FormPoll.propTypes = {
  setPolls: PropTypes.func.isRequired, // setPolls should be a function and is required
};

export default FormPoll;
