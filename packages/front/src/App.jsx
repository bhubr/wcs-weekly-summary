import React, { useState, useEffect } from 'react';
import WeekSummary from './components/week-summary';

function App() {
  const [summaries, setSummaries] = useState([]);
  const [error, setError] = useState(null);
  useEffect(
    () => {
      fetch('/api/week-summaries')
        .then((res) => res.json())
        .then(setSummaries)
        .catch(setError);
    },
    [],
  );
  return (
    <div>
      <h1>Hello World</h1>
      {
        error && (
          <p style={{ color: 'red' }}>{error.message}</p>
        )
      }
      {
        summaries.map((week) => (
          <WeekSummary
            {...week}
          />
        ))
      }
    </div>
  );
}

export default App;
