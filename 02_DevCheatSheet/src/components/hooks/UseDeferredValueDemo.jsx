import React, { useState, useDeferredValue, memo } from 'react';
import CodeSnippet from '../CodeSnippet';

const SlowList = memo(({ text }) => {
  // Simulate slow rendering
  const items = [];
  for (let i = 0; i < 500; i++) {
    items.push(<li key={i} className="list-item">Item #{i}: {text}</li>);
  }
  return <ul style={{ listStyle: 'none', padding: 0, height: '200px', overflowY: 'auto' }}>{items}</ul>;
});

const UseDeferredValueDemo = () => {
  const [text, setText] = useState('');
  // Defer the value
  const deferredText = useDeferredValue(text);
  
  // Check if it's stale (currently calculating)
  const isStale = text !== deferredText;

  const code = `import React, { useState, useDeferredValue, memo } from 'react';

// A slow component that takes time to render
const SlowList = memo(({ text }) => {
  // ... expensive render logic ...
  return <ul>{/* ... */}</ul>;
});

function App() {
  const [text, setText] = useState('');
  
  // useDeferredValue creates a "lagging" version of the state
  // React will first update the input, then update the deferred value in background
  const deferredText = useDeferredValue(text);
  
  // We can know if the list is still updating
  const isStale = text !== deferredText;

  return (
    <>
      <input value={text} onChange={e => setText(e.target.value)} />
      <div style={{ opacity: isStale ? 0.5 : 1 }}>
        <SlowList text={deferredText} />
      </div>
    </>
  );
}`;

  return (
    <div className="header-section">
      <h1 className="title">useDeferredValue</h1>
      <p className="description">
        <code>useDeferredValue</code> is a React Hook that lets you defer updating a part of the UI. It's similar to debouncing, but it doesn't require a fixed delay. React will attempt the delayed update immediately after the current render is painted.
      </p>

      <div className="demo-section mt-8">
        <h2 className="demo-title">Interactive Demo</h2>
        <div className="card flex-col">
          <p style={{ color: 'var(--text-secondary)' }}>
            Type quickly! The input remains responsive because the heavy list rendering uses the deferred value.
          </p>
          <input 
            value={text} 
            onChange={e => setText(e.target.value)} 
            className="input-field"
            placeholder="Type here..."
          />
          <div style={{ marginTop: '16px', opacity: isStale ? 0.5 : 1, transition: 'opacity 0.2s' }}>
            <p style={{ marginBottom: '8px' }}>
              Deferred Value: <strong>{deferredText}</strong> 
              {isStale && <span className="badge">Loading...</span>}
            </p>
            <div style={{ background: 'rgba(0,0,0,0.2)', padding: '10px', borderRadius: '8px' }}>
              <SlowList text={deferredText} />
            </div>
          </div>
        </div>
      </div>

      <CodeSnippet code={code} />
    </div>
  );
};

export default UseDeferredValueDemo;
