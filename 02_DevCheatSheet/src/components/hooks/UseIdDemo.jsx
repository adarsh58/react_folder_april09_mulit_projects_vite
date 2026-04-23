import React, { useId } from 'react';
import CodeSnippet from '../CodeSnippet';

const PasswordField = () => {
  const passwordHintId = useId();
  
  return (
    <div className="card flex-col" style={{ marginBottom: '10px' }}>
      <label>
        Password:
        <input 
          type="password" 
          aria-describedby={passwordHintId} 
          className="input-field" 
          style={{ marginTop: '8px' }}
        />
      </label>
      <p id={passwordHintId} style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
        Generated ID: <strong>{passwordHintId}</strong> (Used for accessibility)
      </p>
    </div>
  );
};

const UseIdDemo = () => {
  const code = `import React, { useId } from 'react';

function PasswordField() {
  // Generates a unique ID (e.g., ":r1:") that is stable across SSR and client renders
  const passwordHintId = useId();

  return (
    <>
      <label>
        Password:
        <input
          type="password"
          aria-describedby={passwordHintId}
        />
      </label>
      <p id={passwordHintId}>
        The password should contain at least 18 characters
      </p>
    </>
  );
}

function App() {
  return (
    <div>
      {/* Each instance gets a unique ID internally! */}
      <PasswordField />
      <PasswordField />
    </div>
  );
}`;

  return (
    <div className="header-section">
      <h1 className="title">useId</h1>
      <p className="description">
        <code>useId</code> is a React Hook for generating unique IDs that can be passed to accessibility attributes. It guarantees stable IDs across server and client rendering, avoiding hydration mismatches.
      </p>

      <div className="demo-section mt-8">
        <h2 className="demo-title">Interactive Demo</h2>
        <div className="grid-2">
          <div>
            <h3>Instance 1</h3>
            <PasswordField />
          </div>
          <div>
            <h3>Instance 2</h3>
            <PasswordField />
          </div>
        </div>
        <p style={{ marginTop: '20px', color: 'var(--accent)', fontSize: '0.9rem' }}>
          Notice how each component instance gets a perfectly unique ID, making them completely independent and accessible!
        </p>
      </div>

      <CodeSnippet code={code} />
    </div>
  );
};

export default UseIdDemo;
