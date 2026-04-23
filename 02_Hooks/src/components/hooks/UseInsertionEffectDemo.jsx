import React, { useInsertionEffect, useState } from 'react';
import CodeSnippet from '../CodeSnippet';

const DynamicThemedBox = ({ color }) => {
  // useInsertionEffect runs BEFORE useLayoutEffect and useEffect
  // It's strictly meant for injecting styles into the DOM before any layout calculation happens
  useInsertionEffect(() => {
    // Generate a unique class name
    const className = `dynamic-box-${color.replace('#', '')}`;
    
    // Check if style already exists
    if (!document.getElementById(className)) {
      const style = document.createElement('style');
      style.id = className;
      style.innerHTML = `
        .${className} {
          background-color: ${color};
          padding: 20px;
          border-radius: 8px;
          color: white;
          text-shadow: 0 1px 3px rgba(0,0,0,0.5);
          transition: all 0.3s;
          text-align: center;
          font-weight: bold;
        }
      `;
      document.head.appendChild(style);
    }
    
    // Cleanup not always needed for global styles, but good practice if unique per component lifecycle
    return () => {
      const el = document.getElementById(className);
      if(el) el.remove();
    };
  }, [color]);

  return <div className={`dynamic-box-${color.replace('#', '')}`}>Dynamically Styled Element!</div>;
};

const UseInsertionEffectDemo = () => {
  const [color, setColor] = useState('#3b82f6');

  const code = `import React, { useInsertionEffect } from 'react';

// This hook is mostly for CSS-in-JS library authors
function useCSS(rule) {
  useInsertionEffect(() => {
    // 1. Run BEFORE DOM mutations and layout calculations
    // 2. Inject <style> tags here to prevent layout thrashing
    const style = document.createElement('style');
    style.innerHTML = rule;
    document.head.appendChild(style);
    
    return () => document.head.removeChild(style);
  }, [rule]);
}

function MyComponent() {
  useCSS('.my-class { color: red; }');
  return <div className="my-class">Red Text</div>;
}`;

  return (
    <div className="header-section">
      <h1 className="title">useInsertionEffect</h1>
      <p className="description">
        <code>useInsertionEffect</code> is a specialized version of <code>useEffect</code> that fires before any DOM mutations. It is primarily intended for CSS-in-JS library authors to inject dynamic <code>&lt;style&gt;</code> tags into the DOM without causing layout thrashing.
      </p>

      <div className="demo-section mt-8">
        <h2 className="demo-title">Interactive Demo</h2>
        <div className="card flex-col flex-center">
          <p style={{ color: 'var(--text-secondary)', textAlign: 'center', maxWidth: '600px' }}>
            Change the color below. The style is injected into the document <code>&lt;head&gt;</code> synchronously before the component renders!
          </p>
          <div style={{ display: 'flex', gap: '10px', margin: '20px 0' }}>
            <button className="btn" style={{ background: '#ef4444' }} onClick={() => setColor('#ef4444')}>Red</button>
            <button className="btn" style={{ background: '#10b981' }} onClick={() => setColor('#10b981')}>Green</button>
            <button className="btn" style={{ background: '#8b5cf6' }} onClick={() => setColor('#8b5cf6')}>Purple</button>
            <button className="btn" style={{ background: '#f59e0b' }} onClick={() => setColor('#f59e0b')}>Orange</button>
          </div>
          
          <DynamicThemedBox color={color} />
        </div>
      </div>

      <CodeSnippet code={code} />
    </div>
  );
};

export default UseInsertionEffectDemo;
