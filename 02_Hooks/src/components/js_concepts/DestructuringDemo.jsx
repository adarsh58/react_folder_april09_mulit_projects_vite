import React, { useState } from 'react';
import CodeSnippet from '../CodeSnippet';

const DestructuringDemo = () => {
  const [logs, setLogs] = useState([]);

  const runDemo = () => {
    const newLogs = [];
    
    // Array Destructuring
    const colors = ['red', 'green', 'blue', 'yellow'];
    const [first, second, ...rest] = colors;
    
    newLogs.push(`Array: [${colors.join(', ')}]`);
    newLogs.push(`[first, second] = [${first}, ${second}]`);
    newLogs.push(`...rest = [${rest.join(', ')}]`);
    newLogs.push('---------------------------');

    // Object Destructuring
    const user = { 
      id: 42, 
      profile: { name: 'Alice', age: 28 },
      isActive: true 
    };

    // Rename and nested destructuring
    const { 
      id, 
      profile: { name: userName }, 
      role = 'Guest' // Default value
    } = user;

    newLogs.push(`Object: { id: ${id}, name: ${userName}, role: ${role} }`);
    
    setLogs(newLogs);
  };

  const code = `// 1. Array Destructuring
const fruits = ['apple', 'banana', 'cherry'];
const [firstFruit, , thirdFruit] = fruits;

console.log(firstFruit); // 'apple'
console.log(thirdFruit); // 'cherry'

// 2. Object Destructuring
const person = {
  name: 'John',
  age: 30,
  address: { city: 'New York', zip: '10001' }
};

// With renaming and default values
const { 
  name: fullName, 
  age, 
  address: { city },
  country = 'USA' 
} = person;

console.log(fullName); // 'John'
console.log(city); // 'New York'
console.log(country); // 'USA'`;

  return (
    <div className="header-section">
      <h1 className="title">Destructuring</h1>
      <p className="description">
        <strong>Destructuring assignment</strong> is a special syntax that allows you to "unpack" arrays or objects into a bunch of variables, making it easier to extract data from complex structures.
      </p>

      <div className="demo-section mt-8">
        <h2 className="demo-title">Interactive Demo</h2>
        <div className="card flex-col flex-center">
          <button className="btn" onClick={runDemo}>Run Destructuring Demo</button>
          <div style={{ width: '100%', background: 'rgba(0,0,0,0.3)', padding: '15px', borderRadius: '8px', minHeight: '150px', fontFamily: 'monospace' }}>
            {logs.map((log, i) => (
              <div key={i} style={{ color: 'var(--success)', marginBottom: '8px' }}>
                {'>'} {log}
              </div>
            ))}
            {logs.length === 0 && <div style={{ color: 'var(--text-secondary)' }}>Click button to extract variables...</div>}
          </div>
        </div>
      </div>

      <CodeSnippet code={code} />
    </div>
  );
};

export default DestructuringDemo;
