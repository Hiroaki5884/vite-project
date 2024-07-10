import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ThreadPosts = () => {
  const { thread_id } = useParams();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
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
  }, [thread_id]);

  return (
    <div className="posts-container">
      <h1>投稿一覧</h1>
      <ul>
        {posts.length > 0 ? posts.map(post => (
          <li key={post.id}>{post.post}</li>
        )) : <li>投稿がありません</li>}
      </ul>
    </div>
  );
};

export default ThreadPosts;
