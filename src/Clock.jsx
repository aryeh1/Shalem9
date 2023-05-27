import React from 'react';
import './Clock.css';

const Clock = ({ currentTime }) => {
  return <div className="clock">{currentTime}</div>;
};

export default Clock;
