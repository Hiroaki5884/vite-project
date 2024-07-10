import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ThreadPosts = () => {
  const { thread_id } = useParams(); // useParamsフックでthread_idを取得
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');

  const fetchPosts = () => {
    fetch(`https://railway.bulletinboard.techtrain.dev/threads/${thread_id}/posts?offset=0`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('API response:', data); // レスポンスをコンソールに出力
        if (data && Array.isArray(data.posts)) {
          setPosts(data.posts);
        } else {
          setPosts([]);
        }
      })
      .catch(error => console.error('Error fetching posts:', error));
  };

  useEffect(() => {
    fetchPosts();
  }, [thread_id]);

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch(`https://railway.bulletinboard.techtrain.dev/threads/${thread_id}/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ post: newPost }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Post created:', data);
        setNewPost('');
        fetchPosts(); // 新しい投稿が追加された後に投稿一覧を更新
      })
      .catch(error => console.error('Error creating post:', error));
  };

  return (
    <div className="posts-container">
      <h1>投稿一覧</h1>
      <form onSubmit={handleSubmit} className="new-post-form">
        <input
          type="text"
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          placeholder="新しい投稿を入力"
          required
        />
        <button type="submit">投稿</button>
      </form>
      <ul>
        {posts.length > 0 ? posts.map(post => (
          <li key={post.id}>{post.post}</li>
        )) : <li>投稿がありません</li>}
      </ul>
    </div>
  );
};

export default ThreadPosts;
