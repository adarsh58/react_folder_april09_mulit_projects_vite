import React, { useState } from 'react';
import CodeSnippet from '../CodeSnippet';

const PrototypesDemo = () => {
  const [logs, setLogs] = useState([]);

  const runDemo = () => {
    const newLogs = [];
    
    function Animal(name) {
      this.name = name;
    }
    
    Animal.prototype.makeSound = function() {
      return `${this.name} makes a sound!`;
    };

    function Dog(name, breed) {
      Animal.call(this, name);
      this.breed = breed;
    }

    // Prototypal Inheritance
    Dog.prototype = Object.create(Animal.prototype);
    Dog.prototype.constructor = Dog;

    Dog.prototype.bark = function() {
      return "Woof!";
    };

    const myDog = new Dog("Rex", "German Shepherd");
    
    newLogs.push(`myDog.name: ${myDog.name}`);
    newLogs.push(`myDog.breed: ${myDog.breed}`);
    newLogs.push(`myDog.bark(): ${myDog.bark()}`);
    newLogs.push(`myDog.makeSound() [Inherited from Animal]: ${myDog.makeSound()}`);
    
    setLogs(newLogs);
  };

  const code = `// Parent Constructor
function Animal(name) {
  this.name = name;
}

// Add method to prototype
Animal.prototype.speak = function() {
  console.log(this.name + ' makes a noise.');
}

// Child Constructor
function Dog(name) {
  Animal.call(this, name); // Call parent constructor
}

// Inherit from Animal
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

// Add child-specific method
Dog.prototype.bark = function() {
  console.log('Woof!');
}

const d = new Dog('Mitzie');
d.speak(); // "Mitzie makes a noise." (Inherited)
d.bark();  // "Woof!"`;

  return (
    <div className="header-section">
      <h1 className="title">Prototypes & Inheritance</h1>
      <p className="description">
        JavaScript objects inherit features from one another via <strong>Prototypes</strong>. Every object in JS has a built-in property, which is called its prototype. The prototype is itself an object, so the prototype will have its own prototype, making what's called a prototype chain.
      </p>

      <div className="demo-section mt-8">
        <h2 className="demo-title">Interactive Demo</h2>
        <div className="card flex-col flex-center">
          <button className="btn" onClick={runDemo}>Run Prototype Inheritance Code</button>
          <div style={{ width: '100%', background: 'rgba(0,0,0,0.3)', padding: '15px', borderRadius: '8px', minHeight: '150px', fontFamily: 'monospace' }}>
            {logs.map((log, i) => (
              <div key={i} style={{ color: 'var(--success)', marginBottom: '8px' }}>
                {'>'} {log}
              </div>
            ))}
            {logs.length === 0 && <div style={{ color: 'var(--text-secondary)' }}>Click button to view inheritance...</div>}
          </div>
        </div>
      </div>

      <CodeSnippet code={code} />
    </div>
  );
};

export default PrototypesDemo;
