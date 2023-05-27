import React, { useState, useEffect } from 'react';
import './App.css';
import Clock from './Clock';
import Navbar from './Navbar';
import Footer from './Footer';
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

  return (
    <div className="app">
      <h1 className="title">Shalem</h1>
      <Clock currentTime={currentTime} />
      <Navbar activePage={activePage} handleMenuClick={setActivePage} />
      <div className="content">
        {activePage === 'fetcher' && (
          <BibleTextFetcher setHistory={setHistory} />
        )}
        {activePage === 'history' && <History history={history} />}
        {activePage === 'page1' && <Page1 />}
      </div>
      <Footer />
    </div>
  );
}

export default App;
