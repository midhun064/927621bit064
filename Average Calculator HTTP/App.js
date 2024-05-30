import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [numberId, setNumberId] = useState('p');
  const [response, setResponse] = useState(null);

  const handleFetchNumbers = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/numbers/${numberId}`);
      setResponse(res.data);
    } catch (error) {
      console.error("Error fetching numbers", error);
    }
  };

  return (
    <div className="App">
      <h1>Average Calculator</h1>
      <select value={numberId} onChange={(e) => setNumberId(e.target.value)}>
        <option value="p">Prime</option>
        <option value="f">Fibonacci</option>
        <option value="e">Even</option>
        <option value="r">Random</option>
      </select>
      <button onClick={handleFetchNumbers}>Fetch Numbers</button>
      {response && (
        <div>
          <h2>Response</h2>
          <p><strong>Previous State:</strong> {JSON.stringify(response.windowPrevState)}</p>
          <p><strong>Current State:</strong> {JSON.stringify(response.windowCurrState)}</p>
          <p><strong>Numbers:</strong> {JSON.stringify(response.numbers)}</p>
          <p><strong>Average:</strong> {response.avg.toFixed(2)}</p>
        </div>
      )}
    </div>
  );
}
export default App;

