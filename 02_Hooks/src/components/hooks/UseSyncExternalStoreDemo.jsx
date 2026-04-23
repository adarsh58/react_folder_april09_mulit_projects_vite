import React, { useSyncExternalStore } from 'react';
import CodeSnippet from '../CodeSnippet';

// Mock External Store
let nextId = 0;
let todos = [{ id: nextId++, text: 'Learn React' }];
let listeners = [];

const todosStore = {
  addTodo() {
    todos = [...todos, { id: nextId++, text: `New Task #${nextId}` }];
    emitChange();
  },
  subscribe(listener) {
    listeners = [...listeners, listener];
    return () => {
      listeners = listeners.filter(l => l !== listener);
    };
  },
  getSnapshot() {
    return todos;
  }
};

function emitChange() {
  for (let listener of listeners) {
    listener();
  }
}

// Built-in Browser API example
function subscribeToOnlineStatus(callback) {
  window.addEventListener('online', callback);
  window.addEventListener('offline', callback);
  return () => {
    window.removeEventListener('online', callback);
    window.removeEventListener('offline', callback);
  };
}

const UseSyncExternalStoreDemo = () => {
  // 1. Subscribing to an external custom store
  const currentTodos = useSyncExternalStore(todosStore.subscribe, todosStore.getSnapshot);

  // 2. Subscribing to a browser API
  const isOnline = useSyncExternalStore(subscribeToOnlineStatus, () => navigator.onLine);

  const code = `import React, { useSyncExternalStore } from 'react';

// Example: Subscribing to browser's network status
function subscribe(callback) {
  window.addEventListener('online', callback);
  window.addEventListener('offline', callback);
  return () => {
    window.removeEventListener('online', callback);
    window.removeEventListener('offline', callback);
  };
}

function getSnapshot() {
  return navigator.onLine; // Returns true or false
}

function NetworkStatus() {
  // useSyncExternalStore(subscribe, getSnapshot)
  const isOnline = useSyncExternalStore(subscribe, getSnapshot);

  return (
    <div>{isOnline ? '🟢 Online' : '🔴 Disconnected'}</div>
  );
}`;

  return (
    <div className="header-section">
      <h1 className="title">useSyncExternalStore</h1>
      <p className="description">
        <code>useSyncExternalStore</code> is a React Hook that lets you subscribe to an external store. It's often used by state management libraries (like Redux or Zustand) or to subscribe to browser APIs while preventing tearing during concurrent rendering.
      </p>

      <div className="demo-section mt-8">
        <h2 className="demo-title">Interactive Demo</h2>
        <div className="grid-2">
          <div className="card flex-col">
            <h3>1. Browser API Store</h3>
            <div className="flex-center" style={{ height: '100px', fontSize: '1.5rem', fontWeight: 'bold', color: isOnline ? 'var(--success)' : 'var(--danger)' }}>
              {isOnline ? '🟢 You are Online' : '🔴 You are Offline'}
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Toggle your Wi-Fi to see this change!</p>
          </div>
          
          <div className="card flex-col">
            <h3>2. Custom External Store</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: '10px 0', flex: 1, overflowY: 'auto' }}>
              {currentTodos.map(todo => (
                <li key={todo.id} className="list-item" style={{ padding: '8px' }}>{todo.text}</li>
              ))}
            </ul>
            <button className="btn" onClick={() => todosStore.addTodo()}>Add External Task</button>
          </div>
        </div>
      </div>

      <CodeSnippet code={code} />
    </div>
  );
};

export default UseSyncExternalStoreDemo;
