// src/App.jsx
import React from 'react';
import ThreadsList from './ThreadsList.jsx';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>掲示板</h1>
      </header>
      <main>
        <ThreadsList />
      </main>
    </div>
  );
}

export default App;
