import React from 'react';
import Markdown from 'react-markdown';

const formatDate = (date) => date.substr(0, 10);

function WeekSummary({ id, startDate, content }) {
  return (
    <div key={id}>
      <p>{formatDate(startDate)}</p>
      <Markdown source={content} />
    </div>
  );
}

export default WeekSummary;
