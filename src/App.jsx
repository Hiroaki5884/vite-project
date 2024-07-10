import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ThreadsList from './ThreadsList.jsx';
import NewThread from './NewThread.jsx';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>掲示板</h1>
          <nav>
            <Link to="/">スレッド一覧</Link>
            <Link to="/threads/new">新規スレッド作成</Link>
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<ThreadsList />} />
            <Route path="/threads/new" element={<NewThread />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
