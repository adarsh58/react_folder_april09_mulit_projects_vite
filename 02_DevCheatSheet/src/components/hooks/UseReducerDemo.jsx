import React, { useReducer } from 'react';
import CodeSnippet from '../CodeSnippet';

const initialState = { count: 0, error: null };

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1, error: null };
    case 'decrement':
      if (state.count === 0) return { ...state, error: 'Cannot go below 0!' };
      return { count: state.count - 1, error: null };
    case 'reset':
      return initialState;
    default:
      throw new Error('Unknown action type');
  }
}

const UseReducerDemo = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const code = `import React, { useReducer } from 'react';

const initialState = { count: 0 };

function reducer(state, action) {
  switch (action.type) {
    case 'increment': return { count: state.count + 1 };
    case 'decrement': return { count: state.count - 1 };
    case 'reset': return { count: 0 };
    default: throw new Error();
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
    </>
  );
}`;

  return (
    <div className="header-section">
      <h1 className="title">useReducer</h1>
      <p className="description">
        <code>useReducer</code> is an alternative to <code>useState</code>. It's used for complex state logic that involves multiple sub-values or when the next state depends on the previous one. It also lets you optimize performance for components that trigger deep updates.
      </p>

      <div className="demo-section mt-8">
        <h2 className="demo-title">Interactive Demo</h2>
        <div className="flex-col flex-center">
          <div className="counter-display" style={{ color: state.error ? 'var(--danger)' : 'var(--primary)' }}>
            {state.count}
          </div>
          {state.error && <div style={{ color: 'var(--danger)', marginBottom: '10px' }}>{state.error}</div>}
          <div style={{ display: 'flex', gap: '10px' }}>
            <button className="btn btn-secondary" onClick={() => dispatch({ type: 'decrement' })}>- Decrement</button>
            <button className="btn btn-secondary" onClick={() => dispatch({ type: 'reset' })}>Reset</button>
            <button className="btn" onClick={() => dispatch({ type: 'increment' })}>+ Increment</button>
          </div>
        </div>
      </div>

      <CodeSnippet code={code} />
    </div>
  );
};

export default UseReducerDemo;
