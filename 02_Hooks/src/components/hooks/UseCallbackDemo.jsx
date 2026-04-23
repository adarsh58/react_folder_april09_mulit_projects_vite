import React, { useState, useCallback, memo } from 'react';
import CodeSnippet from '../CodeSnippet';

// Child component that only re-renders if props change
const ExpensiveChild = memo(({ onAction, count }) => {
  // Simulate expensive render log
  console.log('ExpensiveChild rendered');
  
  return (
    <div className="card flex-col flex-center" style={{ border: '2px dashed var(--accent)' }}>
      <h3>Expensive Child Component</h3>
      <p>I only re-render when my props change!</p>
      <p>Child Counter: {count}</p>
      <button className="btn" onClick={onAction}>Trigger Action from Child</button>
    </div>
  );
});

const UseCallbackDemo = () => {
  const [parentCount, setParentCount] = useState(0);
  const [childCount, setChildCount] = useState(0);

  // Memoized callback
  const handleChildAction = useCallback(() => {
    setChildCount(c => c + 1);
  }, []); // Empty deps because we use functional state update

  const code = `import React, { useState, useCallback, memo } from 'react';

const Child = memo(({ onClick }) => {
  console.log("Child render");
  return <button onClick={onClick}>Child Button</button>;
});

function Parent() {
  const [count, setCount] = useState(0);

  // Without useCallback, this function is recreated on every render,
  // causing the memoized Child to re-render unnecessarily.
  const handleChildClick = useCallback(() => {
    console.log("Clicked!");
  }, []);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(c => c + 1)}>Increment Parent</button>
      <Child onClick={handleChildClick} />
    </div>
  );
}`;

  return (
    <div className="header-section">
      <h1 className="title">useCallback</h1>
      <p className="description">
        <code>useCallback</code> is a React Hook that lets you cache a function definition between re-renders. This is useful for preventing unnecessary re-renders of child components that depend on callback functions.
      </p>

      <div className="demo-section mt-8">
        <h2 className="demo-title">Interactive Demo</h2>
        <div className="grid-2">
          <div className="card flex-col flex-center">
            <h3>Parent Component</h3>
            <div className="counter-display" style={{ fontSize: '2rem' }}>{parentCount}</div>
            <button className="btn btn-secondary" onClick={() => setParentCount(c => c + 1)}>
              Update Parent State (Renders Parent)
            </button>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              Updating this doesn't re-render the child because of useCallback + memo
            </p>
          </div>
          
          <ExpensiveChild onAction={handleChildAction} count={childCount} />
        </div>
      </div>

      <CodeSnippet code={code} />
    </div>
  );
};

export default UseCallbackDemo;
