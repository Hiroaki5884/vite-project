import React, { useState, useEffect } from 'react';

// ThreadsListコンポーネントを定義
const ThreadsList = () => {
  // threadsステートを初期化
  const [threads, setThreads] = useState([]);

  // コンポーネントがマウントされたときにAPIからスレッドを取得
  useEffect(() => {
    fetch('https://railway.bulletinboard.techtrain.dev/threads')
      .then(response => {
        // レスポンスがOKでない場合はエラーをスロー
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setThreads(data)) // データをステートに設定
      .catch(error => console.error('Error fetching threads:', error)); // エラーをキャッチしてログに出力
  }, []);

  return (
    <div className="threads-container">
      <h1>スレッド一覧</h1>
      <ul>
        {threads.map(thread => (
          // 各スレッドをリストアイテムとして表示
          <li key={thread.id}>{thread.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default ThreadsList;
