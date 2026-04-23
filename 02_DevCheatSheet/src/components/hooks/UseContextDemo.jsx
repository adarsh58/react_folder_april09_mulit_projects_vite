import React, { useState, useContext, createContext } from 'react';
import CodeSnippet from '../CodeSnippet';

const ThemeContext = createContext();

const ThemedComponent = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  
  return (
    <div className="card flex-col flex-center" style={{ 
      backgroundColor: theme === 'dark' ? '#1e293b' : '#f8fafc',
      color: theme === 'dark' ? '#f8fafc' : '#1e293b',
      border: `1px solid ${theme === 'dark' ? '#334155' : '#cbd5e1'}`
    }}>
      <h3 style={{ margin: 0 }}>I'm deeply nested!</h3>
      <p style={{ margin: 0 }}>Current Theme: <strong>{theme}</strong></p>
      <button 
        className="btn" 
        style={{ 
          backgroundColor: theme === 'dark' ? '#3b82f6' : '#2563eb' 
        }}
        onClick={toggleTheme}
      >
        Toggle Context Theme
      </button>
    </div>
  );
}

const UseContextDemo = () => {
  const [theme, setTheme] = useState('dark');
  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  const code = `import React, { useState, useContext, createContext } from 'react';

// 1. Create a Context
const ThemeContext = createContext();

function ChildComponent() {
  // 3. Use the Context
  const { theme, toggleTheme } = useContext(ThemeContext);
  
  return (
    <div style={{ background: theme === 'dark' ? '#000' : '#fff' }}>
      <button onClick={toggleTheme}>Toggle</button>
    </div>
  );
}

function App() {
  const [theme, setTheme] = useState('dark');
  
  // 2. Provide the Context value
  return (
    <ThemeContext.Provider value={{ 
      theme, 
      toggleTheme: () => setTheme(t => t === 'dark' ? 'light' : 'dark') 
    }}>
      <ChildComponent />
    </ThemeContext.Provider>
  );
}`;

  return (
    <div className="header-section">
      <h1 className="title">useContext</h1>
      <p className="description">
        <code>useContext</code> is a Hook that lets you read and subscribe to context from your component. It's used to share data (like themes or authenticated user info) across the component tree without passing props down manually at every level ("prop drilling").
      </p>

      <div className="demo-section mt-8">
        <h2 className="demo-title">Interactive Demo</h2>
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
          <div style={{ padding: '20px', border: '1px dashed var(--border)', borderRadius: '8px' }}>
            <p style={{ marginBottom: '16px', color: 'var(--text-secondary)' }}>Parent Provider Level</p>
            <ThemedComponent />
          </div>
        </ThemeContext.Provider>
      </div>

      <CodeSnippet code={code} />
    </div>
  );
};

export default UseContextDemo;
