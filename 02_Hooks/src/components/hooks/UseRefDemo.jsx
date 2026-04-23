import React, { useRef, useState } from 'react';
import CodeSnippet from '../CodeSnippet';

const UseRefDemo = () => {
  const [renderCount, setRenderCount] = useState(0);
  const inputRef = useRef(null);
  const timerRef = useRef(0);

  const focusInput = () => {
    inputRef.current.focus();
    inputRef.current.style.borderColor = 'var(--primary)';
    inputRef.current.style.boxShadow = '0 0 0 4px rgba(59, 130, 246, 0.3)';
    
    setTimeout(() => {
      if(inputRef.current) {
        inputRef.current.style.borderColor = 'var(--border)';
        inputRef.current.style.boxShadow = 'none';
      }
    }, 1000);
  };

  const incrementTimer = () => {
    timerRef.current += 1;
    alert(`Timer ref is now: ${timerRef.current}. Notice the component didn't re-render!`);
  };

  const forceRender = () => {
    setRenderCount(c => c + 1);
  };

  const code = `import React, { useRef } from 'react';

function TextInputWithFocusButton() {
  // 1. Accessing DOM Elements
  const inputEl = useRef(null);
  const onButtonClick = () => {
    // \`current\` points to the mounted text input element
    inputEl.current.focus();
  };

  // 2. Mutable value that doesn't cause re-renders
  const countRef = useRef(0);
  const incrementWithoutRender = () => {
    countRef.current += 1;
    console.log(countRef.current);
  };

  return (
    <>
      <input ref={inputEl} type="text" />
      <button onClick={onButtonClick}>Focus the input</button>
      <button onClick={incrementWithoutRender}>Increment Hidden</button>
    </>
  );
}`;

  return (
    <div className="header-section">
      <h1 className="title">useRef</h1>
      <p className="description">
        <code>useRef</code> is a React Hook that lets you reference a value that's not needed for rendering. It can be used to access DOM elements directly or to store mutable values that shouldn't trigger a re-render when changed.
      </p>

      <div className="demo-section mt-8">
        <h2 className="demo-title">Interactive Demo</h2>
        <div className="grid-2">
          <div className="card flex-col">
            <h3>1. DOM Reference</h3>
            <input 
              ref={inputRef} 
              type="text" 
              className="input-field" 
              placeholder="I can be focused via ref!" 
            />
            <button className="btn" onClick={focusInput} style={{ marginTop: '16px' }}>
              Focus Input
            </button>
          </div>
          
          <div className="card flex-col">
            <h3>2. Mutable Value</h3>
            <p>Component Render Count: {renderCount}</p>
            <div style={{ display: 'flex', gap: '10px', marginTop: 'auto' }}>
              <button className="btn btn-secondary" onClick={incrementTimer}>
                Increment Ref
              </button>
              <button className="btn" onClick={forceRender}>
                Force Render
              </button>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '10px' }}>
              Incrementing the ref won't update UI until a re-render happens.
            </p>
          </div>
        </div>
      </div>

      <CodeSnippet code={code} />
    </div>
  );
};

export default UseRefDemo;
