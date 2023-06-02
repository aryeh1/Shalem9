import React, { useEffect, useState } from 'react';
import './SandTimer.css'

function SandTimer() {
  const [bubblesEnabled, setBubblesEnabled] = useState(false);
  const [bubbles, setBubbles] = useState([]);
  const [clockTime, setClockTime] = useState('');
  const [sandHeight, setSandHeight] = useState('');

  useEffect(() => {
    const clockInterval = setInterval(() => {
      updateClock();
      updateSandTimer();
    }, 1000);

    return () => clearInterval(clockInterval);
  }, []);

  const toggleBubbles = () => {
    if (bubblesEnabled) {
      setBubbles([]);
      setBubblesEnabled(false);
    } else {
      const newBubbles = [];
      for (let i = 0; i < 25; i++) {
        newBubbles.push(createBubble());
      }
      setBubbles(newBubbles);
      setBubblesEnabled(true);
    }
  }

  function createBubble() {
    return {
      left: Math.random() * 100 + 'vw',
      top: Math.random() * 100 + 'vh',
      size: Math.random() * 10 + 20 + 'px',
      color: getRandomColor()
    };
  }

  function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  function updateClock() {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const formattedTime = formatTime(hours) + ':' + formatTime(minutes) + ':' + formatTime(seconds);
    setClockTime(formattedTime);
  }

  function formatTime(time) {
    return time < 10 ? '0' + time : time;
  }

  function updateSandTimer() {
    const date = new Date();
    const seconds = date.getSeconds();
    const newSandHeight = (seconds / 60) * 100;
    setSandHeight(newSandHeight + '%');
  }

  return (
    <div className="container">
      <h1>The Enchanted Hourglass</h1>
      {/* ... other elements ... */}
      <button className="button" id="toggle-bubbles-button" onClick={toggleBubbles}>Toggle Bubbles</button>
      <div className="bubble-container">
        {bubbles.map((bubble, index) => (
          <div 
            className="bubble" 
            style={{left: bubble.left, top: bubble.top, height: bubble.size, width: bubble.size, backgroundColor: bubble.color}} 
            key={index}
          />
        ))}
      </div>
      <div className="sand-timer-container">
        <div className="sand-timer">
          <div className="sand" style={{height: sandHeight}} />
        </div>
      </div>
      <div className="clock-container">
        <h2 id="clockTime" className="clock">{clockTime}</h2>
      </div>
    </div>
  );
}

export default SandTimer;
