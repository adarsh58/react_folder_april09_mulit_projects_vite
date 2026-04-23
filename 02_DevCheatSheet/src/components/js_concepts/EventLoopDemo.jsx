import React, { useState } from 'react';
import CodeSnippet from '../CodeSnippet';

const EventLoopDemo = () => {
  const [logs, setLogs] = useState([]);

  const runEventLoop = () => {
    setLogs([]); // Clear
    
    const addLog = (msg) => setLogs(prev => [...prev, msg]);

    addLog("1. Synchronous code starts (Call Stack)");
    
    setTimeout(() => {
      addLog("4. setTimeout callback executes (Macrotask Queue)");
    }, 0);

    Promise.resolve().then(() => {
      addLog("3. Promise .then executes (Microtask Queue)");
    });

    addLog("2. Synchronous code ends (Call Stack)");
  };

  const code = `console.log('1. Sync Start');

setTimeout(() => {
  console.log('4. setTimeout (Macrotask)');
}, 0);

Promise.resolve().then(() => {
  console.log('3. Promise (Microtask)');
});

console.log('2. Sync End');

/* Output Order:
1. Sync Start
2. Sync End
3. Promise (Microtask)
4. setTimeout (Macrotask)
*/`;

  return (
    <div className="header-section">
      <h1 className="title">Event Loop</h1>
      <p className="description">
        The <strong>Event Loop</strong> is responsible for executing the code, collecting and processing events, and executing queued sub-tasks. It handles synchronous code first, then Microtasks (Promises), and finally Macrotasks (setTimeout, setInterval).
      </p>

      <div className="demo-section mt-8">
        <h2 className="demo-title">Interactive Demo</h2>
        <div className="card flex-col flex-center">
          <button className="btn" onClick={runEventLoop}>Simulate Event Loop</button>
          <div style={{ width: '100%', background: 'rgba(0,0,0,0.3)', padding: '15px', borderRadius: '8px', minHeight: '150px', fontFamily: 'monospace' }}>
            {logs.map((log, i) => (
              <div key={i} style={{ 
                color: log.includes('Sync') ? 'var(--text-primary)' : 
                       log.includes('Microtask') ? 'var(--accent)' : 'var(--primary)',
                marginBottom: '8px'
              }}>
                {'>'} {log}
              </div>
            ))}
            {logs.length === 0 && <div style={{ color: 'var(--text-secondary)' }}>Click button to run sequence...</div>}
          </div>
        </div>
      </div>

      <CodeSnippet code={code} />
    </div>
  );
};

export default EventLoopDemo;
