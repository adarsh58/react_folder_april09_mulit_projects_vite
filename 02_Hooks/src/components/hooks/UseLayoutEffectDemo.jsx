import React, { useState, useLayoutEffect, useEffect, useRef } from 'react';
import CodeSnippet from '../CodeSnippet';

const UseLayoutEffectDemo = () => {
  const [value, setValue] = useState(0);
  const [logs, setLogs] = useState([]);
  const btnRef = useRef(null);

  // This will flash because the DOM is painted with value=0, then useEffect runs and sets value=Math.random()
  useEffect(() => {
    if (value === 0) {
      const random = 10 + Math.random() * 200;
      setTimeout(() => setValue(random), 10); // Simulated delay to show flicker
      setLogs(l => [...l, 'useEffect ran (paint happened first)']);
    }
  }, [value]);

  const [layoutValue, setLayoutValue] = useState(0);
  // This will NOT flash. useLayoutEffect runs synchronously BEFORE the browser paints.
  useLayoutEffect(() => {
    if (layoutValue === 0) {
      const random = 10 + Math.random() * 200;
      setLayoutValue(random);
      setLogs(l => [...l, 'useLayoutEffect ran (blocked paint until done)']);
    }
  }, [layoutValue]);

  const code = `import React, { useState, useLayoutEffect, useEffect } from 'react';

function Tooltip() {
  const [width, setWidth] = useState(0);
  const ref = useRef(null);

  // Runs synchronously BEFORE the browser repaints the screen.
  // Good for DOM measurements that need to happen before paint to avoid flickering.
  useLayoutEffect(() => {
    if (ref.current) {
      setWidth(ref.current.getBoundingClientRect().width);
    }
  }, []);

  // Normal useEffect runs AFTER the browser repaints.
  useEffect(() => {
    // Good for fetching data, setting up subscriptions, etc.
  }, []);

  return <div ref={ref}>My width is: {width}px</div>;
}`;

  return (
    <div className="header-section">
      <h1 className="title">useLayoutEffect</h1>
      <p className="description">
        <code>useLayoutEffect</code> is a version of <code>useEffect</code> that fires before the browser repaints the screen. Use it to measure DOM elements and mutate them before the user can see them, preventing visual flickers.
      </p>

      <div className="demo-section mt-8">
        <h2 className="demo-title">Interactive Demo</h2>
        <div className="grid-2">
          <div className="card flex-col flex-center">
            <h3>useEffect (Flickers)</h3>
            <div className="counter-display" style={{ fontSize: '2rem' }}>{Math.round(value)}</div>
            <button className="btn btn-secondary" onClick={() => setValue(0)}>
              Reset to 0
            </button>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textAlign: 'center' }}>
              Notice a brief flash of "0" before it updates.
            </p>
          </div>
          
          <div className="card flex-col flex-center">
            <h3>useLayoutEffect (Smooth)</h3>
            <div className="counter-display" style={{ fontSize: '2rem', color: 'var(--success)' }}>{Math.round(layoutValue)}</div>
            <button className="btn" onClick={() => setLayoutValue(0)}>
              Reset to 0
            </button>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textAlign: 'center' }}>
              Updates synchronously before paint. No flash of "0".
            </p>
          </div>
        </div>
      </div>

      <CodeSnippet code={code} />
    </div>
  );
};

export default UseLayoutEffectDemo;
