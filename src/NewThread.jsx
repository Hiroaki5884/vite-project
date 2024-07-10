import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NewThread = () => {
  const [title, setTitle] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch('https://railway.bulletinboard.techtrain.dev/threads', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Thread created:', data);
        navigate('/'); // スレッド一覧画面に戻る
      })
      .catch(error => console.error('Error creating thread:', error));
  };

  return (
    <div className="new-thread-container">
      <h2>新規スレッド作成</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="スレッドタイトル"
          required
        />
        <button type="submit">作成</button>
      </form>
    </div>
  );
};

export default NewThread;
