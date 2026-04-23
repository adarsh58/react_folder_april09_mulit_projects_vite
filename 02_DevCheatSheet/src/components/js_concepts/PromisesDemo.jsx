import React, { useState } from 'react';
import CodeSnippet from '../CodeSnippet';

const PromisesDemo = () => {
  const [status, setStatus] = useState('idle');
  const [data, setData] = useState(null);

  const fetchData = async () => {
    setStatus('loading');
    setData(null);

    // Simulate an API call
    try {
      const result = await new Promise((resolve, reject) => {
        setTimeout(() => {
          if (Math.random() > 0.3) {
            resolve({ id: 1, message: 'Data fetched successfully!' });
          } else {
            reject(new Error('Network error simulated.'));
          }
        }, 1500);
      });
      
      setData(result.message);
      setStatus('success');
    } catch (error) {
      setData(error.message);
      setStatus('error');
    }
  };

  const code = `// 1. Using Promises (.then / .catch)
function fetchUser() {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve({ name: "Alice" }), 1000);
  });
}

fetchUser()
  .then(user => console.log(user))
  .catch(error => console.error(error));

// 2. Using Async/Await
async function getUser() {
  try {
    const user = await fetchUser(); // Pauses execution until resolved
    console.log(user);
  } catch (error) {
    console.error(error);
  }
}`;

  return (
    <div className="header-section">
      <h1 className="title">Promises & Async/Await</h1>
      <p className="description">
        A <strong>Promise</strong> represents the eventual completion (or failure) of an asynchronous operation and its resulting value. <strong>Async/Await</strong> is syntactic sugar over Promises, making asynchronous code look and behave a bit more like synchronous code.
      </p>

      <div className="demo-section mt-8">
        <h2 className="demo-title">Interactive Demo</h2>
        <div className="card flex-col flex-center">
          <button className="btn" onClick={fetchData} disabled={status === 'loading'}>
            {status === 'loading' ? 'Fetching...' : 'Fetch Data (70% Success Rate)'}
          </button>
          
          <div style={{ 
            marginTop: '20px', 
            padding: '20px', 
            borderRadius: '8px',
            width: '100%',
            textAlign: 'center',
            background: status === 'idle' ? 'rgba(0,0,0,0.2)' : 
                        status === 'loading' ? 'rgba(59, 130, 246, 0.2)' :
                        status === 'success' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)',
            border: `1px solid ${
              status === 'idle' ? 'var(--border)' : 
              status === 'loading' ? 'var(--primary)' :
              status === 'success' ? 'var(--success)' : 'var(--danger)'
            }`
          }}>
            {status === 'idle' && 'Waiting to fetch...'}
            {status === 'loading' && <span className="typing-text">Awaiting Promise</span>}
            {status === 'success' && <strong style={{ color: 'var(--success)' }}>✅ {data}</strong>}
            {status === 'error' && <strong style={{ color: 'var(--danger)' }}>❌ {data}</strong>}
          </div>
        </div>
      </div>

      <CodeSnippet code={code} />
    </div>
  );
};

export default PromisesDemo;
