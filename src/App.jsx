import React, { useState, useEffect } from 'react';
import './App.css';
import Clock from './Clock';
import Menu from './Menu';
import BibleTextFetcher from './BibleTextFetcher';
import Page1 from './Page1';
import History from './History';

function App() {
  const [currentTime, setCurrentTime] = useState('');
  const [activePage, setActivePage] = useState('fetcher');
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleMenuClick = (page) => {
    setActivePage(page);
  };

  return (
    <div className="app">
      <h1 className="title">Shalem</h1>
      <Clock currentTime={currentTime} />
      <Menu activePage={activePage} handleMenuClick={handleMenuClick} />
      <div className="content">
        {activePage === 'fetcher' && (
          <BibleTextFetcher
            setHistory={setHistory}
          />
        )}
        {activePage === 'history' && <History history={history} />}
        {activePage === 'page1' && <Page1 />}
      </div>
      <p className="credit">
        Credit: <span className="special-effect">A and Golem</span>
      </p>
    </div>
  );
}

export default App;
