import React, { useState, useMemo } from 'react';
import CodeSnippet from '../CodeSnippet';

const UseMemoDemo = () => {
  const [count, setCount] = useState(0);
  const [items, setItems] = useState([1, 2, 3, 4, 5]);

  // Expensive calculation
  const sum = useMemo(() => {
    console.log('Calculating sum...');
    // Artificial delay to simulate expensive calculation
    const start = Date.now();
    while (Date.now() - start < 100) {} // Block for 100ms
    return items.reduce((acc, curr) => acc + curr, 0);
  }, [items]);

  const addItem = () => {
    setItems([...items, items.length + 1]);
  };

  const code = `import React, { useState, useMemo } from 'react';

function ExpensiveCalculation({ items }) {
  const [count, setCount] = useState(0);

  // This will ONLY re-calculate when 'items' changes
  // It won't run when 'count' changes
  const expensiveResult = useMemo(() => {
    console.log("Calculating...");
    return items.reduce((acc, curr) => acc + curr, 0);
  }, [items]);

  return (
    <div>
      <p>Result: {expensiveResult}</p>
      <p>Count: {count}</p>
      <button onClick={() => setCount(c => c + 1)}>Increment Count</button>
    </div>
  );
}`;

  return (
    <div className="header-section">
      <h1 className="title">useMemo</h1>
      <p className="description">
        <code>useMemo</code> is a React Hook that lets you cache the result of a calculation between re-renders. Use it to optimize performance by avoiding expensive calculations on every render.
      </p>

      <div className="demo-section mt-8">
        <h2 className="demo-title">Interactive Demo</h2>
        <div className="grid-2">
          <div className="card flex-col flex-center">
            <h3>Fast Update (No re-calc)</h3>
            <div className="counter-display" style={{ fontSize: '2rem' }}>{count}</div>
            <button className="btn" onClick={() => setCount(c => c + 1)}>
              Update Unrelated State
            </button>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textAlign: 'center' }}>
              Notice how this updates instantly because useMemo skips the 100ms expensive calculation.
            </p>
          </div>
          
          <div className="card flex-col flex-center" style={{ border: '2px solid var(--accent)' }}>
            <h3>Slow Update (Re-calc)</h3>
            <div className="counter-display" style={{ fontSize: '2rem', color: 'var(--accent)' }}>Sum: {sum}</div>
            <button className="btn btn-secondary" onClick={addItem}>
              Add Item to Array
            </button>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textAlign: 'center' }}>
              This button causes a slight lag (100ms) because it modifies the dependencies of useMemo.
            </p>
            <div style={{ wordBreak: 'break-all', fontSize: '0.8rem' }}>[{items.join(', ')}]</div>
          </div>
        </div>
      </div>

      <CodeSnippet code={code} />
    </div>
  );
};

export default UseMemoDemo;
