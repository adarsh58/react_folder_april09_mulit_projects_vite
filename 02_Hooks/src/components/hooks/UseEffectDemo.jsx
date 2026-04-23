import React, { useState, useEffect } from 'react';
import CodeSnippet from '../CodeSnippet';

const UseEffectDemo = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    
    // Cleanup function
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(s => s + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const code = `import React, { useState, useEffect } from 'react';

function TimerAndResize() {
  const [width, setWidth] = useState(window.innerWidth);
  const [seconds, setSeconds] = useState(0);

  // Example 1: Event listener with cleanup
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty array means run once on mount

  // Example 2: Interval with cleanup
  useEffect(() => {
    const interval = setInterval(() => setSeconds(s => s + 1), 1000);
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div>Window width: {width}px | Time: {seconds}s</div>
  );
}`;

  return (
    <div className="header-section">
      <h1 className="title">useEffect</h1>
      <p className="description">
        <code>useEffect</code> lets you synchronize a component with an external system. It is used for side effects like data fetching, setting up subscriptions, or manually changing the DOM.
      </p>

      <div className="demo-section mt-8">
        <h2 className="demo-title">Interactive Demo</h2>
        <div className="grid-2">
          <div className="card flex-col flex-center">
            <h3>Window Width tracker</h3>
            <div className="counter-display" style={{ fontSize: '2rem' }}>{windowWidth}px</div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Resize window to see effect</p>
          </div>
          <div className="card flex-col flex-center">
            <h3>Timer (setInterval)</h3>
            <div className="counter-display" style={{ fontSize: '2rem', color: 'var(--accent)' }}>{seconds}s</div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Runs automatically on mount</p>
          </div>
        </div>
      </div>

      <CodeSnippet code={code} />
    </div>
  );
};

export default UseEffectDemo;
