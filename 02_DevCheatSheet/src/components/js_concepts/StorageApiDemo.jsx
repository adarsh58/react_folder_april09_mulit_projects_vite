import React, { useState, useEffect } from 'react';
import CodeSnippet from '../CodeSnippet';

const StorageApiDemo = () => {
  const [localVal, setLocalVal] = useState('');
  const [sessionVal, setSessionVal] = useState('');

  useEffect(() => {
    setLocalVal(localStorage.getItem('demo_key') || '');
    setSessionVal(sessionStorage.getItem('demo_key') || '');
  }, []);

  const saveLocal = (val) => {
    localStorage.setItem('demo_key', val);
    setLocalVal(val);
  };

  const saveSession = (val) => {
    sessionStorage.setItem('demo_key', val);
    setSessionVal(val);
  };

  const code = `// 1. LocalStorage (Persists even after browser close)
localStorage.setItem('user', JSON.stringify({ name: 'Bob' }));
const user = JSON.parse(localStorage.getItem('user'));

// 2. SessionStorage (Lost when tab is closed)
sessionStorage.setItem('tempToken', 'xyz-123');

// 3. Listening to changes
window.addEventListener('storage', (e) => {
  console.log('Storage updated in another tab!', e);
});`;

  return (
    <div className="header-section">
      <h1 className="title">Storage API</h1>
      <p className="description">
        Web storage APIs allow web applications to store data locally within the user's browser. <strong>LocalStorage</strong> persists data across browser sessions, while <strong>SessionStorage</strong> data is cleared when the page session ends (tab closed).
      </p>

      <div className="demo-section mt-8 glass-card">
        <h2 className="demo-title">Local vs Session Persistence</h2>
        <div className="grid-2">
          <div className="card flex-col">
            <h3>LocalStorage</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Survivies page refresh and tab close.</p>
            <input 
              type="text" 
              className="input-field" 
              value={localVal}
              onChange={(e) => saveLocal(e.target.value)}
              placeholder="Type to save..."
            />
            <p style={{ fontSize: '0.875rem' }}>Stored: <strong>{localVal || 'None'}</strong></p>
          </div>
          
          <div className="card flex-col">
            <h3>SessionStorage</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Lost when tab is closed.</p>
            <input 
              type="text" 
              className="input-field" 
              value={sessionVal}
              onChange={(e) => saveSession(e.target.value)}
              placeholder="Type to save..."
            />
            <p style={{ fontSize: '0.875rem' }}>Stored: <strong>{sessionVal || 'None'}</strong></p>
          </div>
        </div>
      </div>

      <CodeSnippet code={code} />
    </div>
  );
};

export default StorageApiDemo;
