import React, { useState, useTransition } from 'react';
import CodeSnippet from '../CodeSnippet';

const UseTransitionDemo = () => {
  const [isPending, startTransition] = useTransition();
  const [tab, setTab] = useState('about');
  const [items, setItems] = useState([]);

  const selectTab = (nextTab) => {
    if (nextTab === 'posts') {
      // Mark as a non-urgent transition
      startTransition(() => {
        setTab(nextTab);
        // Simulate heavy work
        const newItems = [];
        for (let i = 0; i < 5000; i++) {
          newItems.push(`Post #${i}`);
        }
        setItems(newItems);
      });
    } else {
      setTab(nextTab);
    }
  };

  const code = `import React, { useState, useTransition } from 'react';

function App() {
  const [isPending, startTransition] = useTransition();
  const [tab, setTab] = useState('about');

  function selectTab(nextTab) {
    // startTransition lets you update state without blocking the UI
    // It marks the state update inside as "transitions" (non-urgent)
    startTransition(() => {
      setTab(nextTab);
    });
  }

  return (
    <>
      <button onClick={() => selectTab('about')}>About</button>
      <button onClick={() => selectTab('posts')}>
        Posts {isPending && '(Loading...)'}
      </button>
      
      {tab === 'about' && <AboutTab />}
      {tab === 'posts' && <SlowPostsTab />}
    </>
  );
}`;

  return (
    <div className="header-section">
      <h1 className="title">useTransition</h1>
      <p className="description">
        <code>useTransition</code> is a React Hook that lets you update the state without blocking the UI. It returns a boolean flag (<code>isPending</code>) and a function (<code>startTransition</code>) to mark a state update as a non-urgent transition.
      </p>

      <div className="demo-section mt-8">
        <h2 className="demo-title">Interactive Demo</h2>
        <div className="card flex-col">
          <div style={{ display: 'flex', gap: '10px' }}>
            <button 
              className={`btn ${tab === 'about' ? '' : 'btn-secondary'}`} 
              onClick={() => selectTab('about')}
            >
              About Tab
            </button>
            <button 
              className={`btn ${tab === 'posts' ? '' : 'btn-secondary'}`} 
              onClick={() => selectTab('posts')}
            >
              Heavy Posts Tab {isPending && <span className="badge">Loading...</span>}
            </button>
          </div>
          
          <div style={{ marginTop: '20px', padding: '20px', background: 'rgba(0,0,0,0.2)', borderRadius: '8px', minHeight: '150px' }}>
            {tab === 'about' && <p>Welcome! Click the "Heavy Posts Tab" to see useTransition in action. The UI won't freeze while it computes 5000 posts!</p>}
            {tab === 'posts' && (
              <ul style={{ listStyle: 'none', padding: 0, height: '200px', overflowY: 'auto' }}>
                {items.slice(0, 100).map((item, i) => <li key={i} className="list-item">{item}</li>)}
                <li className="list-item" style={{ textAlign: 'center', opacity: 0.5 }}>... and 4900 more</li>
              </ul>
            )}
          </div>
        </div>
      </div>

      <CodeSnippet code={code} />
    </div>
  );
};

export default UseTransitionDemo;
