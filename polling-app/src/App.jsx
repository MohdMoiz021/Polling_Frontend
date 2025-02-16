import { useState, useEffect } from 'react';
import PollForm from './components/FormPoll';
import PollList from './components/ListingPoll';
// import Result from './components/Result';
import './styles.css';

function App() {
  const [polls, setPolls] = useState([]);

  useEffect(() => {
    // Fetch all polls from the server
    const fetchPolls = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/polls');
        const data = await response.json();
        setPolls(data);
      } catch (err) {
        console.error("Error fetching polls:", err);
      }
    };

    fetchPolls();
  }, []);

  return (
    <div className="App">
      <h1>Quick Polling App</h1>
      <PollForm setPolls={setPolls} />
      <PollList polls={polls} />
    </div>
  );
}

export default App;
