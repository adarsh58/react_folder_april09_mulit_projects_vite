import React, { useState } from 'react';
import CodeSnippet from '../CodeSnippet';

const HoistingDemo = () => {
  const [output, setOutput] = useState('');

  const runDemo = () => {
    try {
      // We simulate hoisting behavior using eval/Function or just hardcoded explanations
      // Since strict mode prevents a lot of weird hoisting, we'll explain it visually
      let result = "1. Function declarations are fully hoisted: \\n";
      result += `sayHello() returns: "${sayHello()}"\\n\\n`;
      
      result += "2. var is hoisted but NOT initialized (returns undefined): \\n";
      result += `value of hoistedVar before declaration: undefined\\n\\n`;

      result += "3. let/const are hoisted but in a Temporal Dead Zone (TDZ): \\n";
      result += `Accessing them before declaration throws ReferenceError`;

      setOutput(result);
    } catch (e) {
      setOutput(e.toString());
    }
  };

  function sayHello() {
    return "Hello World!";
  }

  const code = `// 1. Function Hoisting (Works)
console.log(greet()); // "Hello!"
function greet() {
  return "Hello!";
}

// 2. var Hoisting (Returns undefined)
console.log(name); // undefined
var name = "John";
console.log(name); // "John"

// 3. let/const Hoisting (Throws ReferenceError)
// console.log(age); // ReferenceError: Cannot access 'age' before intialization
let age = 30;`;

  return (
    <div className="header-section">
      <h1 className="title">Hoisting</h1>
      <p className="description">
        <strong>Hoisting</strong> is JavaScript's default behavior of moving declarations to the top of the current scope (script or function). However, only declarations are hoisted, not initializations.
      </p>

      <div className="demo-section mt-8">
        <h2 className="demo-title">Interactive Demo</h2>
        <div className="card flex-col flex-center">
          <button className="btn" onClick={runDemo}>Run Hoisting Examples</button>
          <pre style={{ width: '100%', background: 'rgba(0,0,0,0.3)', padding: '15px', borderRadius: '8px', minHeight: '100px', whiteSpace: 'pre-wrap', color: 'var(--success)', fontFamily: 'monospace' }}>
            {output || 'Click the button to simulate hoisting outputs...'}
          </pre>
        </div>
      </div>

      <CodeSnippet code={code} />
    </div>
  );
};

export default HoistingDemo;
