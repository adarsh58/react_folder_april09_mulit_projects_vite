import React, { useState } from 'react';
import CodeSnippet from '../CodeSnippet';

const ClassesDemo = () => {
  const [logs, setLogs] = useState([]);

  const runDemo = () => {
    const newLogs = [];

    class Animal {
      constructor(name) {
        this.name = name;
      }
      speak() {
        return `${this.name} makes a noise.`;
      }
    }

    class Dog extends Animal {
      constructor(name, breed) {
        super(name);
        this.breed = breed;
      }
      speak() {
        return `${this.name} barks! (Breed: ${this.breed})`;
      }
    }

    const d = new Dog('Mitzie', 'Poodle');
    newLogs.push(d.speak());
    
    setLogs(newLogs);
  };

  const code = `class Animal {
  constructor(name) {
    this.name = name;
  }
  speak() {
    return this.name + ' makes a noise.';
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name); // Call the parent constructor
    this.breed = breed;
  }
  speak() {
    return this.name + ' barks!';
  }
}

const d = new Dog('Mitzie', 'Poodle');
console.log(d.speak()); // "Mitzie barks!"`;

  return (
    <div className="header-section">
      <h1 className="title">ES6 Classes</h1>
      <p className="description">
        JavaScript classes, introduced in ECMAScript 2015, are primarily syntactical sugar over JavaScript's existing prototype-based inheritance. The class syntax does not introduce a new object-oriented inheritance model to JavaScript.
      </p>

      <div className="demo-section mt-8 glass-card">
        <h2 className="demo-title">Interactive Class Demo</h2>
        <div className="card flex-col flex-center">
          <button className="btn" onClick={runDemo}>Instantiate & Run Class</button>
          <div style={{ width: '100%', background: 'rgba(0,0,0,0.3)', padding: '15px', borderRadius: '8px', minHeight: '80px', fontFamily: 'monospace' }}>
            {logs.map((log, i) => <div key={i} style={{ color: 'var(--success)' }}>{'>'} {log}</div>)}
            {logs.length === 0 && <div style={{ color: 'var(--text-secondary)' }}>Click button to run...</div>}
          </div>
        </div>
      </div>

      <CodeSnippet code={code} />
    </div>
  );
};

export default ClassesDemo;
