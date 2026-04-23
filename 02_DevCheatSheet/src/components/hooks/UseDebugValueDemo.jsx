import React, { useState, useDebugValue } from 'react';
import CodeSnippet from '../CodeSnippet';

// Custom hook using useDebugValue
function useWindowSize() {
  const [size, setSize] = useState({ width: window.innerWidth, height: window.innerHeight });

  // Add a label in React DevTools
  useDebugValue(`${size.width}x${size.height}`);
  
  // Format function only called if DevTools are open
  useDebugValue(size, (s) => `Width: ${s.width}, Height: ${s.height}`);

  return size;
}

const UseDebugValueDemo = () => {
  const size = useWindowSize();

  const code = `import React, { useState, useDebugValue } from 'react';

// Custom Hook
function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(true);

  // This will show up in React DevTools next to this Hook
  // e.g., "OnlineStatus: Online"
  useDebugValue(isOnline ? 'Online' : 'Offline');

  // Optional 2nd argument: formatting function
  // Only called if DevTools are open, good for expensive formatting
  useDebugValue(isOnline, (status) => status ? '🟢 Online' : '🔴 Offline');

  return isOnline;
}`;

  return (
    <div className="header-section">
      <h1 className="title">useDebugValue</h1>
      <p className="description">
        <code>useDebugValue</code> is a React Hook that lets you add a label to a custom Hook in React DevTools. It is mostly useful for library authors.
      </p>

      <div className="demo-section mt-8">
        <h2 className="demo-title">Interactive Demo</h2>
        <div className="card flex-col flex-center">
          <p>This hook is mostly invisible to users. Open <strong>React DevTools</strong> in your browser to see the effect!</p>
          <div style={{ padding: '20px', background: 'rgba(0,0,0,0.3)', borderRadius: '8px', textAlign: 'center' }}>
            <h3 style={{ marginBottom: '10px' }}>Custom Hook (useWindowSize)</h3>
            <p>Current Size: {size.width} x {size.height}</p>
            <p style={{ fontSize: '0.8rem', color: 'var(--accent)', marginTop: '10px' }}>
              Check DevTools 👉 Components 👉 UseDebugValueDemo 👉 useWindowSize
            </p>
          </div>
        </div>
      </div>

      <CodeSnippet code={code} />
    </div>
  );
};

export default UseDebugValueDemo;
