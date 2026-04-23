import React, { useState, createContext, useContext, useEffect } from 'react';
import { Share2, ArrowUpCircle, RefreshCw, Database, Code, Zap } from 'lucide-react';
import CodeSnippet from './CodeSnippet';

// 1. Context API Demo setup
const DataContext = createContext();

const DataProvider = ({ children }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    // Simulating API call
    setTimeout(() => {
      setData({ user: 'Adarsh', role: 'Full Stack Developer', status: 'Active' });
      setLoading(false);
    }, 1500);
  };

  return (
    <DataContext.Provider value={{ data, loading, fetchData }}>
      {children}
    </DataContext.Provider>
  );
};

// 2. Child Component for Parent communication
const ChildComponent = ({ onMessage }) => {
  return (
    <div className="card" style={{ border: '1px dashed var(--primary)', marginTop: '10px' }}>
      <h4>Child Component</h4>
      <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>I can call my parent's function!</p>
      <button className="btn btn-secondary" onClick={() => onMessage("Hello from Child!")}>
        Notify Parent
      </button>
    </div>
  );
};

const ReactPatternsDemo = () => {
  // Parent state for Parent-Child comms
  const [childMessage, setChildMessage] = useState('');
  
  // Two-way binding state
  const [inputValue, setInputValue] = useState('Type something...');

  return (
    <DataProvider>
      <div className="react-patterns">
        <div className="header-section">
          <h1 className="title">Advanced React Patterns</h1>
          <p className="description">
            Mastering component communication, global state with API integration, and controlled forms.
          </p>
        </div>

        {/* 1. Context API + API Calling */}
        <section className="demo-section">
          <div className="demo-title">
            <Database className="text-primary" />
            Context API with API Calling
          </div>
          <div className="card">
            <ContextConsumerDemo />
          </div>
          <CodeSnippet code={`// 1. Create Context
const UserContext = createContext();

// 2. Provider with API Logic
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const fetchUser = async () => {
    const res = await fetch('/api/user');
    const data = await res.json();
    setUser(data);
  };

  return (
    <UserContext.Provider value={{ user, fetchUser }}>
      {children}
    </UserContext.Provider>
  );
};

// 3. Consume in ANY Component
const Profile = () => {
  const { user, fetchUser } = useContext(UserContext);
  return <button onClick={fetchUser}>{user?.name ?? 'Load'}</button>;
}`} />
        </section>

        {/* 2. Parent-Child Communication */}
        <section className="demo-section mt-12">
          <div className="demo-title">
            <Share2 className="text-primary" />
            Parent-Child Communication
          </div>
          <div className="card">
            <h4>Parent Component</h4>
            <p>Message from child: <span className="text-primary">{childMessage || 'Waiting...'}</span></p>
            <ChildComponent onMessage={(msg) => setChildMessage(msg)} />
          </div>
          <CodeSnippet code={`// Parent
const Parent = () => {
  const handleChildAction = (data) => console.log(data);
  
  return <Child onAction={handleChildAction} />;
};

// Child
const Child = ({ onAction }) => {
  return <button onClick={() => onAction('Data from child')}>Click Me</button>;
};`} />
        </section>

        {/* 3. Two-way Binding */}
        <section className="demo-section mt-12">
          <div className="demo-title">
            <RefreshCw className="text-primary" />
            Two-way Data Binding (Controlled)
          </div>
          <div className="card">
            <div className="flex-col">
              <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Controlled Input</label>
              <input 
                type="text" 
                value={inputValue} 
                onChange={(e) => setInputValue(e.target.value)}
                style={{ padding: '12px', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border)', borderRadius: '8px', color: 'white', marginTop: '5px' }}
              />
              <p style={{ marginTop: '10px' }}>Current Value: <span className="text-accent">{inputValue}</span></p>
            </div>
          </div>
          <CodeSnippet code={`// Two-way binding (Controlled Component)
const InputDemo = () => {
  const [text, setText] = useState('');

  return (
    <input 
      value={text} // Bind state to value
      onChange={(e) => setText(e.target.value)} // Update state on change
    />
  );
};`} />
        </section>
      </div>
    </DataProvider>
  );
};

const ContextConsumerDemo = () => {
  const { data, loading, fetchData } = useContext(DataContext);

  return (
    <div className="flex-col">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h4>Global User State</h4>
        <button className="btn" onClick={fetchData} disabled={loading}>
          {loading ? 'Fetching...' : 'Call API via Context'}
        </button>
      </div>
      
      <div style={{ marginTop: '15px', padding: '15px', background: 'rgba(0,0,0,0.2)', borderRadius: '12px' }}>
        {data ? (
          <div className="grid-2">
            <div><span style={{ color: 'var(--text-secondary)' }}>User:</span> {data.user}</div>
            <div><span style={{ color: 'var(--text-secondary)' }}>Role:</span> {data.role}</div>
            <div><span style={{ color: 'var(--text-secondary)' }}>Status:</span> <span className="badge">{data.status}</span></div>
          </div>
        ) : (
          <p style={{ color: 'var(--text-secondary)', textAlign: 'center' }}>No data loaded. Trigger the context method above.</p>
        )}
      </div>
    </div>
  );
};

export default ReactPatternsDemo;
