import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTodo, toggleTodo, removeTodo } from '../store/todoSlice';
import { Trash2, CheckCircle, Circle, Plus, Database } from 'lucide-react';
import CodeSnippet from './CodeSnippet';

const ReduxDemo = () => {
  const [text, setText] = useState('');
  const todos = useSelector((state) => state.todos.list);
  const dispatch = useDispatch();

  const handleAdd = (e) => {
    e.preventDefault();
    if (text.trim()) {
      dispatch(addTodo(text));
      setText('');
    }
  };

  const code = `// 1. Slice Definition (store/todoSlice.js)
import { createSlice } from '@reduxjs/toolkit';

const todoSlice = createSlice({
  name: 'todos',
  initialState: { list: [] },
  reducers: {
    addTodo: (state, action) => {
      state.list.push({ id: Date.now(), text: action.payload, completed: false });
    },
    toggleTodo: (state, action) => {
      const todo = state.list.find(t => t.id === action.payload);
      if (todo) todo.completed = !todo.completed;
    }
  }
});

// 2. Persistence with IndexedDB (utils/db.js)
import { openDB } from 'idb';
export const saveState = async (state) => {
  const db = await openDB('redux_db', 1);
  await db.put('state_store', state, 'current_state');
};

// 3. Usage in Component
const dispatch = useDispatch();
const todos = useSelector(state => state.todos.list);

dispatch(addTodo('Learn Redux'));`;

  return (
    <div className="header-section">
      <h1 className="title">Redux + IndexedDB</h1>
      <p className="description">
        Learn how to manage global state with <strong>Redux Toolkit</strong> and persist it permanently using <strong>IndexedDB</strong>. This ensures your data survives page refreshes and browser restarts.
      </p>

      <div className="demo-section mt-8 glass-card">
        <h2 className="demo-title">
          <Database size={24} className="text-primary" />
          Interactive Task Manager
        </h2>
        
        <form onSubmit={handleAdd} className="flex-center" style={{ marginBottom: '24px' }}>
          <input 
            type="text" 
            className="input-field" 
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Add a new task..."
          />
          <button type="submit" className="btn" style={{ whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Plus size={18} /> Add Task
          </button>
        </form>

        <div className="flex-col">
          {todos.length === 0 ? (
            <p style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: '20px' }}>
              No tasks yet. Add one above! Your tasks will be saved to IndexedDB.
            </p>
          ) : (
            todos.map((todo) => (
              <div key={todo.id} className="list-item" style={{ borderLeft: `4px solid ${todo.completed ? 'var(--success)' : 'var(--primary)'}` }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, cursor: 'pointer' }} onClick={() => dispatch(toggleTodo(todo.id))}>
                  {todo.completed ? <CheckCircle className="text-success" size={20} /> : <Circle size={20} />}
                  <span style={{ textDecoration: todo.completed ? 'line-through' : 'none', color: todo.completed ? 'var(--text-secondary)' : 'var(--text-primary)' }}>
                    {todo.text}
                  </span>
                </div>
                <button 
                  onClick={() => dispatch(removeTodo(todo.id))}
                  style={{ background: 'transparent', border: 'none', color: 'var(--danger)', cursor: 'pointer', padding: '4px' }}
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))
          )}
        </div>
        
        <div style={{ marginTop: '20px', padding: '12px', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '8px', fontSize: '0.875rem' }}>
          <strong>Pro Tip:</strong> Open DevTools -- Application -- IndexedDB to see your data being saved in real-time!
        </div>
      </div>

      <CodeSnippet code={code} />
    </div>
  );
};

export default ReduxDemo;
