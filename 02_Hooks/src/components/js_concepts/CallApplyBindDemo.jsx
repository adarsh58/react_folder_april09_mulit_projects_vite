import React, { useState } from 'react';
import CodeSnippet from '../CodeSnippet';

const CallApplyBindDemo = () => {
  const [logs, setLogs] = useState([]);

  const runDemo = () => {
    const newLogs = [];
    
    const person1 = { firstName: 'John', lastName: 'Doe' };
    const person2 = { firstName: 'Jane', lastName: 'Smith' };

    function greet(greeting, punctuation) {
      return `${greeting}, ${this.firstName} ${this.lastName}${punctuation}`;
    }

    // 1. call()
    newLogs.push(`1. call(): ${greet.call(person1, 'Hello', '!')}`);
    
    // 2. apply() - takes arguments as array
    newLogs.push(`2. apply(): ${greet.apply(person2, ['Hi', '.'])}`);
    
    // 3. bind() - returns a new function
    const greetJohn = greet.bind(person1, 'Welcome');
    newLogs.push(`3. bind() created func, calling it: ${greetJohn('!!!')}`);

    setLogs(newLogs);
  };

  const code = `const person1 = { name: "Alice" };
const person2 = { name: "Bob" };

function introduce(greeting, punctuation) {
  console.log(greeting + ", I am " + this.name + punctuation);
}

// 1. call: Passes arguments individually
introduce.call(person1, "Hello", "!"); 
// Output: "Hello, I am Alice!"

// 2. apply: Passes arguments as an array
introduce.apply(person2, ["Hi", "."]); 
// Output: "Hi, I am Bob."

// 3. bind: Returns a new function with bound 'this' and args
const greetAlice = introduce.bind(person1, "Welcome");
greetAlice("!!"); 
// Output: "Welcome, I am Alice!!"`;

  return (
    <div className="header-section">
      <h1 className="title">Call, Apply, Bind</h1>
      <p className="description">
        In JavaScript, functions are objects. The <code>call()</code>, <code>apply()</code>, and <code>bind()</code> methods allow you to explicitly set the <code>this</code> context for a function call.
      </p>

      <div className="demo-section mt-8">
        <h2 className="demo-title">Interactive Demo</h2>
        <div className="card flex-col flex-center">
          <button className="btn" onClick={runDemo}>Execute call, apply, bind</button>
          <div style={{ width: '100%', background: 'rgba(0,0,0,0.3)', padding: '15px', borderRadius: '8px', minHeight: '150px', fontFamily: 'monospace' }}>
            {logs.map((log, i) => (
              <div key={i} style={{ color: 'var(--success)', marginBottom: '8px' }}>
                {'>'} {log}
              </div>
            ))}
            {logs.length === 0 && <div style={{ color: 'var(--text-secondary)' }}>Click button to see the output...</div>}
          </div>
        </div>
      </div>

      <CodeSnippet code={code} />
    </div>
  );
};

export default CallApplyBindDemo;
