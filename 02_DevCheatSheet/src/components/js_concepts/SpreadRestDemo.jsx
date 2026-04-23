import React, { useState } from 'react';
import CodeSnippet from '../CodeSnippet';

const SpreadRestDemo = () => {
  const [logs, setLogs] = useState([]);

  const runDemo = () => {
    const newLogs = [];
    
    // Spread (...) - Expands iterables into elements
    const arr1 = [1, 2, 3];
    const arr2 = [4, 5, 6];
    const combined = [...arr1, ...arr2];
    newLogs.push(`Spread Array: [...[1,2], ...[3,4]] => [${combined.join(', ')}]`);

    const obj1 = { a: 1, b: 2 };
    const obj2 = { b: 99, c: 3 }; // Overwrites b
    const mergedObj = { ...obj1, ...obj2 };
    newLogs.push(`Spread Object: { ...obj1, ...obj2 } => ${JSON.stringify(mergedObj)}`);

    newLogs.push('---------------------------');

    // Rest (...) - Collects multiple elements into an array
    function sum(...numbers) { // Rest parameter
      return numbers.reduce((total, n) => total + n, 0);
    }
    
    newLogs.push(`Rest Parameter: sum(1, 2, 3, 4, 5) => ${sum(1, 2, 3, 4, 5)}`);
    
    setLogs(newLogs);
  };

  const code = `// 1. SPREAD (Expanding)
const arr1 = [1, 2];
const arr2 = [3, 4];
const combined = [...arr1, ...arr2]; // [1, 2, 3, 4]

const obj1 = { name: "Alice" };
const updatedObj = { ...obj1, age: 25 }; 
// { name: "Alice", age: 25 }

// 2. REST (Collecting)
// In function parameters:
function multiply(multiplier, ...numbers) {
  return numbers.map(n => n * multiplier);
}
console.log(multiply(2, 1, 2, 3)); // [2, 4, 6]

// In destructuring:
const [first, ...others] = [10, 20, 30, 40];
// first = 10, others = [20, 30, 40]`;

  return (
    <div className="header-section">
      <h1 className="title">Spread & Rest Operators</h1>
      <p className="description">
        The <code>...</code> syntax does two different things depending on context. <strong>Spread</strong> "expands" an array or object into individual elements. <strong>Rest</strong> "collects" multiple elements and condenses them into a single array.
      </p>

      <div className="demo-section mt-8">
        <h2 className="demo-title">Interactive Demo</h2>
        <div className="card flex-col flex-center">
          <button className="btn" onClick={runDemo}>Run Spread/Rest Demo</button>
          <div style={{ width: '100%', background: 'rgba(0,0,0,0.3)', padding: '15px', borderRadius: '8px', minHeight: '150px', fontFamily: 'monospace' }}>
            {logs.map((log, i) => (
              <div key={i} style={{ color: 'var(--success)', marginBottom: '8px' }}>
                {'>'} {log}
              </div>
            ))}
            {logs.length === 0 && <div style={{ color: 'var(--text-secondary)' }}>Click button to run operators...</div>}
          </div>
        </div>
      </div>

      <CodeSnippet code={code} />
    </div>
  );
};

export default SpreadRestDemo;
