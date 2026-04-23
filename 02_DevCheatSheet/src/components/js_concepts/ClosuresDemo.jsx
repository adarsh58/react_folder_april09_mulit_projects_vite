import React, { useState } from 'react';
import CodeSnippet from '../CodeSnippet';

const ClosuresDemo = () => {
  const [logs, setLogs] = useState([]);

  // Example of closure
  const createCounter = () => {
    let count = 0; // Lexical environment variable
    return function() {
      count += 1;
      return count;
    };
  };

  // Create a persistent counter instance
  const [counterInstance] = useState(() => createCounter());

  const handleRun = () => {
    const val = counterInstance();
    setLogs(prev => [...prev, `Counter is now: ${val}`]);
  };

  const code = `function createCounter() {
  // 'count' is defined in the outer function's scope
  let count = 0; 
  
  // The inner function forms a CLOSURE.
  // It "remembers" the environment in which it was created,
  // giving it access to 'count' even after createCounter finishes.
  return function() {
    count++;
    return count;
  };
}

const myCounter = createCounter();
console.log(myCounter()); // 1
console.log(myCounter()); // 2`;

  return (
    <div className="header-section">
      <h1 className="title">Closures</h1>
      <p className="description">
        A <strong>closure</strong> is the combination of a function bundled together (enclosed) with references to its surrounding state (the lexical environment). In other words, a closure gives you access to an outer function's scope from an inner function.
      </p>

      <div className="demo-section mt-8">
        <h2 className="demo-title">Interactive Demo</h2>
        <div className="card flex-col flex-center">
          <button className="btn" onClick={handleRun}>Run Closure Function</button>
          <div style={{ width: '100%', background: 'rgba(0,0,0,0.3)', padding: '10px', borderRadius: '8px', minHeight: '100px', fontFamily: 'monospace' }}>
            {logs.map((log, i) => <div key={i} style={{ color: 'var(--success)' }}>{'>'} {log}</div>)}
            {logs.length === 0 && <div style={{ color: 'var(--text-secondary)' }}>Click the button to see closure in action...</div>}
          </div>
          <button className="btn btn-secondary" onClick={() => setLogs([])}>Clear Console</button>
        </div>
      </div>

      <CodeSnippet code={code} />
    </div>
  );
};

export default ClosuresDemo;
