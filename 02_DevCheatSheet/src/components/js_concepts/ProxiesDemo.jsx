import React, { useState } from 'react';
import CodeSnippet from '../CodeSnippet';

const ProxiesDemo = () => {
  const [target, setTarget] = useState({ name: 'Guest', age: 25 });
  const [logs, setLogs] = useState([]);

  const runDemo = () => {
    const handler = {
      get: (obj, prop) => {
        const val = obj[prop];
        setLogs(prev => [...prev, `GET: Reading property "${prop}" (Value: ${val})`]);
        return val;
      },
      set: (obj, prop, value) => {
        if (prop === 'age' && typeof value !== 'number') {
          setLogs(prev => [...prev, `SET ERROR: Age must be a number!`]);
          return false;
        }
        setLogs(prev => [...prev, `SET: Changing "${prop}" to "${value}"`]);
        obj[prop] = value;
        setTarget({ ...obj });
        return true;
      }
    };

    const proxy = new Proxy({ ...target }, handler);
    
    // Simulate some operations
    proxy.name;
    proxy.age = 30;
    proxy.age = 'not a number'; // Should fail
  };

  const code = `const target = { message: "hello" };

const handler = {
  get: (obj, prop) => {
    return prop in obj ? obj[prop] : "Default Value";
  },
  set: (obj, prop, value) => {
    console.log(\`Setting \${prop} to \${value}\`);
    obj[prop] = value;
    return true;
  }
};

const proxy = new Proxy(target, handler);

console.log(proxy.message); // "hello"
console.log(proxy.missing); // "Default Value"
proxy.message = "world"; // Logs: Setting message to world`;

  return (
    <div className="header-section">
      <h1 className="title">Proxies</h1>
      <p className="description">
        The <code>Proxy</code> object enables you to create a proxy for another object, which can intercept and redefine fundamental operations for that object, such as property lookup, assignment, enumeration, function invocation, etc.
      </p>

      <div className="demo-section mt-8 glass-card">
        <h2 className="demo-title">Property Interception</h2>
        <div className="card flex-col flex-center">
          <p>Current Target: {JSON.stringify(target)}</p>
          <button className="btn" onClick={runDemo}>Run Proxy Operations</button>
          <div style={{ width: '100%', background: 'rgba(0,0,0,0.3)', padding: '15px', borderRadius: '8px', minHeight: '120px', fontFamily: 'monospace', marginTop: '16px' }}>
            {logs.map((log, i) => (
              <div key={i} style={{ color: log.includes('ERROR') ? 'var(--danger)' : 'var(--success)', marginBottom: '4px' }}>
                {'>'} {log}
              </div>
            ))}
            {logs.length === 0 && <div style={{ color: 'var(--text-secondary)' }}>Awaiting operations...</div>}
          </div>
        </div>
      </div>

      <CodeSnippet code={code} />
    </div>
  );
};

export default ProxiesDemo;
