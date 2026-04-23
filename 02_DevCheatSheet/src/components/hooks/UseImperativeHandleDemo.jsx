import React, { useRef, useImperativeHandle, forwardRef, useState } from 'react';
import CodeSnippet from '../CodeSnippet';

// Child component that exposes specific methods to parent
const CustomInput = forwardRef((props, ref) => {
  const [val, setVal] = useState('');
  const inputRef = useRef(null);

  // Expose ONLY these specific methods to parent
  useImperativeHandle(ref, () => ({
    focusAndShake: () => {
      inputRef.current.focus();
      inputRef.current.style.transform = 'translateX(10px)';
      setTimeout(() => inputRef.current.style.transform = 'translateX(-10px)', 100);
      setTimeout(() => inputRef.current.style.transform = 'translateX(10px)', 200);
      setTimeout(() => inputRef.current.style.transform = 'translateX(0)', 300);
    },
    clearValue: () => {
      setVal('');
    }
  }));

  return (
    <input 
      ref={inputRef}
      value={val}
      onChange={(e) => setVal(e.target.value)}
      className="input-field"
      placeholder="Type something..."
      style={{ transition: 'transform 0.1s' }}
    />
  );
});

const UseImperativeHandleDemo = () => {
  const fancyInputRef = useRef(null);

  const code = `import React, { useRef, useImperativeHandle, forwardRef } from 'react';

const FancyInput = forwardRef((props, ref) => {
  const inputRef = useRef();

  // Customize what's exposed when parent uses a ref
  useImperativeHandle(ref, () => ({
    focusAndShake: () => {
      inputRef.current.focus();
      // Add shake animation logic here
    },
    clearValue: () => {
      // Logic to clear value
    }
  }));

  return <input ref={inputRef} />;
});

function Parent() {
  const fancyRef = useRef();

  return (
    <div>
      <FancyInput ref={fancyRef} />
      <button onClick={() => fancyRef.current.focusAndShake()}>
        Focus & Shake
      </button>
    </div>
  );
}`;

  return (
    <div className="header-section">
      <h1 className="title">useImperativeHandle</h1>
      <p className="description">
        <code>useImperativeHandle</code> is a React Hook that lets you customize the handle exposed as a ref. You usually use it with <code>forwardRef</code> to expose specific imperative methods to parent components instead of the entire DOM element.
      </p>

      <div className="demo-section mt-8">
        <h2 className="demo-title">Interactive Demo</h2>
        <div className="card flex-col flex-center" style={{ maxWidth: '400px', margin: '0 auto' }}>
          <CustomInput ref={fancyInputRef} />
          <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
            <button 
              className="btn" 
              onClick={() => fancyInputRef.current.focusAndShake()}
            >
              Focus & Shake
            </button>
            <button 
              className="btn btn-secondary" 
              onClick={() => fancyInputRef.current.clearValue()}
            >
              Clear
            </button>
          </div>
        </div>
      </div>

      <CodeSnippet code={code} />
    </div>
  );
};

export default UseImperativeHandleDemo;
