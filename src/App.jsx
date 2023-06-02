import React, { useState } from 'react';
import App1 from './App1';
import Chat from './Chat';
import SandTimer from './shalem6/SandTimer'
import './App.css'; // Importing CSS styles from App.css

function Button({onClick, children}) {
  return <button className="button" onClick={onClick}>{children}</button>;
}

function Welcome({setPage}) {
  return (
    <div className="content">
      <h1 className="title">shalem.live</h1>
      <Button onClick={() => setPage('app1')}>Fetcher</Button>
      <Button onClick={() => setPage('option1')}>Chat</Button>
      <Button onClick={() => setPage('option2')}>Sand</Button>
      <Button onClick={() => {window.location.href="http://shalem6.herokuapp.com/"}}>Shalem6</Button>
      {/* Add more buttons as needed */}
    </div>
  );
}


const components = {
  'welcome': Welcome,
  'app1': App1,
  'option1': Chat,
  'option2': SandTimer,
};

function App() {
  const [pageStack, setPageStack] = useState(['welcome']);
  const activePage = pageStack[pageStack.length - 1];
  const PageComponent = components[activePage];

  const setPage = (page) => {
    setPageStack([...pageStack, page]);
  };

  const goBack = () => {
    if (pageStack.length > 1) {
      setPageStack(pageStack.slice(0, -1));
    }
  };

  if (!PageComponent) {
    return <div className="content">Error: {activePage} does not exist.</div>;
  }
  
  return (
    <div className="app">
      {pageStack.length > 1 && <Button onClick={goBack}>Back</Button>}
      <PageComponent setPage={setPage} />
    </div>
  );
}

export default App;
