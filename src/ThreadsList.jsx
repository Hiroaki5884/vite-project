import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ThreadsList = () => {
  const [threads, setThreads] = useState([]);

  useEffect(() => {
    fetch('https://railway.bulletinboard.techtrain.dev/threads')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setThreads(data))
      .catch(error => console.error('Error fetching threads:', error));
  }, []);

  return (
    <div className="threads-container">
      <h1>スレッド一覧</h1>
      <Link to="/threads/new" className="new-thread-button">新規スレッド作成</Link>
      <ul>
        {threads.map(thread => (
          <li key={thread.id}>
            <Link to={`/threads/${thread.id}`}>{thread.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ThreadsList;
