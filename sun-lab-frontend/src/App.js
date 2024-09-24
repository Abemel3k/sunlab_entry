import React, { useState } from 'react';
import './App.css';

function App() {
  const [studentID, setStudentID] = useState('');
  const [action, setAction] = useState('entry');
  const [responseMessage, setResponseMessage] = useState('');

  const handlesubmit = (e) => {
    e.preventDefault();

    // Post request
    fetch('http://127.0.0.1:8000/lab/log_access/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `student_id=${studentID}&action=${action}`, 
    })
    .then((response) => {
      if (!response.ok) {
        return response.text().then((text) => {
          throw new Error(`Server error: ${text}`);
        });
      }
      return response.json();
    })
    .then((data) => {
      if (data.message) {
        setResponseMessage({ type: 'success', text: data.message });
      } else {
        setResponseMessage({ type: 'error', text: data.error });
      }
    })
    .catch((error) => {
      console.error('Error:', error);
      setResponseMessage({ type: 'error', text: 'Invalid ID' });
    });
  };

  return (
    <div className="App">
      <h1>SUN Lab Access System</h1>
      <form onSubmit={handlesubmit}>
        <div>
          <label>Student ID:</label>
          <input
            type="text"
            value={studentID}
            onChange={(e) => setStudentID(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Action:</label>
          <select value={action} onChange={(e) => setAction(e.target.value)}>
            <option value="entry">Entry</option>
            <option value="exit">Exit</option>
          </select>
        </div>
        <button type="submit">Log Access</button>
      </form>

      {responseMessage && (
        <p
          style={{
            color: responseMessage.type === 'error' ? 'red' : 'green',
          }}
        >
          {responseMessage.text}
        </p>
      )}
    </div>
  );
}

export default App;
