import React, { useState } from 'react';
import CodeSnippet from '../CodeSnippet';

const UseStateDemo = () => {
  const [count, setCount] = useState(0);
  const [theme, setTheme] = useState('dark');

  const code = `import React, { useState } from 'react';

function Counter() {
  // Declare a state variable named "count" with initial value 0
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}`;

  return (
    <div className="header-section">
      <h1 className="title">useState</h1>
      <p className="description">
        <code>useState</code> is a React Hook that lets you add a state variable to your component. 
        It returns an array with two values: the current state and a function to update it.
      </p>

      <div className="demo-section mt-8">
        <h2 className="demo-title">Interactive Demo</h2>
        <div className="flex-col">
          <div className="card flex-center">
            <button className="btn btn-secondary" onClick={() => setCount(c => c - 1)}>-</button>
            <div className="counter-display" style={{ margin: '0 20px' }}>{count}</div>
            <button className="btn" onClick={() => setCount(c => c + 1)}>+</button>
          </div>
          <div className="card flex-center" style={{ backgroundColor: theme === 'dark' ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.8)', color: theme === 'dark' ? 'white' : 'black', transition: 'all 0.3s' }}>
            <p>Current Theme: {theme}</p>
            <button className="btn" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
              Toggle Theme
            </button>
          </div>
        </div>
      </div>

      <CodeSnippet code={code} />
    </div>
  );
};

export default UseStateDemo;
