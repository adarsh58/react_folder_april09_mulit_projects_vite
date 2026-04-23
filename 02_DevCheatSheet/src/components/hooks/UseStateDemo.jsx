import React, { useState } from 'react';
import MultiStepCode from '../MultiStepCode';
import { Target, Zap } from 'lucide-react';

const UseStateDemo = () => {
  const [count, setCount] = useState(0);
  const [theme, setTheme] = useState('dark');

  const steps = [
    {
      file: 'Counter.jsx',
      desc: 'Basic counter initialization',
      code: `import React, { useState } from 'react';

function Counter() {
  // 1. Initialize state with 0
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      Count is {count}
    </button>
  );
}`
    },
    {
      file: 'ThemeSwitcher.jsx',
      desc: 'Handling complex state (strings)',
      code: `function ThemeSwitcher() {
  const [theme, setTheme] = useState('dark');

  const toggle = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className={theme}>
      <button onClick={toggle}>Toggle Theme</button>
    </div>
  );
}`
    },
    {
      file: 'ObjectState.jsx',
      desc: 'Updating state objects (must spread)',
      code: `function Profile() {
  const [user, setUser] = useState({ name: 'Adarsh', age: 25 });

  const updateAge = () => {
    // Correct way: Spread old state first
    setUser(prev => ({
      ...prev,
      age: prev.age + 1
    }));
  };

  return <div onClick={updateAge}>{user.name}: {user.age}</div>;
}`
    }
  ];

  return (
    <div>
      <div className="header-section">
        <h1 className="title">useState Hook</h1>
        <p className="description">
          <code>useState</code> is the fundamental hook for adding local state to functional components. 
          It triggers a re-render whenever the state value changes.
        </p>
      </div>

      <div className="demo-section">
        <div className="demo-title">
          <Zap className="text-primary" size={24} />
          Live Interactive Playground
        </div>
        
        <div className="grid-2">
          <div className="card" style={{ textAlign: 'center' }}>
            <h3 style={{ marginBottom: '20px', color: 'var(--text-secondary)' }}>Simple Counter</h3>
            <div style={{ fontSize: '4rem', fontWeight: '800', color: 'var(--primary)', marginBottom: '20px' }}>
              {count}
            </div>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
              <button className="btn btn-secondary" onClick={() => setCount(c => c - 1)}>-</button>
              <button className="btn" onClick={() => setCount(c => c + 1)}>+</button>
            </div>
          </div>

          <div className="card" style={{ 
            backgroundColor: theme === 'dark' ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.1)',
            border: theme === 'light' ? '1px solid var(--primary)' : '1px solid var(--border)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
          }}>
            <Target size={40} className={theme === 'light' ? 'text-primary' : 'text-secondary'} style={{ marginBottom: '15px' }} />
            <p style={{ marginBottom: '15px', fontWeight: '600' }}>Theme: {theme.toUpperCase()}</p>
            <button className="btn" onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}>
              Switch to {theme === 'dark' ? 'Light' : 'Dark'}
            </button>
          </div>
        </div>
      </div>

      <MultiStepCode steps={steps} />
    </div>
  );
};

export default UseStateDemo;
