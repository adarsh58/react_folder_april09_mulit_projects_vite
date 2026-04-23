import React, { useState } from 'react';
import CodeSnippet from '../CodeSnippet';

const ArrowFunctionsDemo = () => {
  const [logs, setLogs] = useState([]);

  const runDemo = () => {
    const newLogs = [];
    
    const obj = {
      name: "React Developer",
      
      // Regular function (has its own 'this')
      regularFunc: function() {
        try {
          // In strict mode (which classes/modules use), 'this' might be undefined 
          // if not called as a method.
          newLogs.push(`Regular Function 'this.name': ${this.name}`);
          
          // Simulating a callback where 'this' is lost
          const that = this;
          setTimeout(function() {
            newLogs.push(`Callback with regular function: this.name = ${this ? this.name : 'undefined'} (Lost context)`);
          }, 10);
        } catch (e) {
          newLogs.push(`Regular func error: ${e.message}`);
        }
      },
      
      // Arrow function (inherits 'this' from lexical scope)
      arrowFunc: function() {
        setTimeout(() => {
          newLogs.push(`Callback with arrow function: this.name = ${this.name} (Kept context!)`);
          setLogs([...newLogs]); // Update state after timeout
        }, 20);
      }
    };

    obj.regularFunc();
    obj.arrowFunc();
    
    setLogs(newLogs);
  };

  const code = `// 1. Shorter Syntax
const add = (a, b) => a + b;
const square = x => x * x; // parenthesis optional for 1 param

// 2. Lexical 'this' Binding
const user = {
  name: "Alice",
  
  startTimer: function() {
    // If we used function() here, 'this' would point to the global object or undefined
    // Arrow function inherits 'this' from startTimer's scope
    setTimeout(() => {
      console.log(this.name + " says hello!"); 
    }, 1000);
  }
};

user.startTimer(); // "Alice says hello!"`;

  return (
    <div className="header-section">
      <h1 className="title">Arrow Functions</h1>
      <p className="description">
        <strong>Arrow functions</strong> provide a more concise syntax for writing function expressions. More importantly, they do not have their own bindings to <code>this</code>, <code>arguments</code>, or <code>super</code>, making them ideal for callbacks where you want to preserve the lexical scope.
      </p>

      <div className="demo-section mt-8">
        <h2 className="demo-title">Interactive Demo</h2>
        <div className="card flex-col flex-center">
          <button className="btn" onClick={runDemo}>Test 'this' Context</button>
          <div style={{ width: '100%', background: 'rgba(0,0,0,0.3)', padding: '15px', borderRadius: '8px', minHeight: '120px', fontFamily: 'monospace' }}>
            {logs.map((log, i) => (
              <div key={i} style={{ color: log.includes('Lost') ? 'var(--danger)' : 'var(--success)', marginBottom: '8px' }}>
                {'>'} {log}
              </div>
            ))}
            {logs.length === 0 && <div style={{ color: 'var(--text-secondary)' }}>Click button to run test...</div>}
          </div>
        </div>
      </div>

      <CodeSnippet code={code} />
    </div>
  );
};

export default ArrowFunctionsDemo;
