import React, { useState } from 'react';
import { Cpu, Zap, Code, ChevronRight, ChevronLeft } from 'lucide-react';
import MultiStepCode from '../MultiStepCode';

const WebWorkersDemo = () => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const steps = [
    {
      file: 'worker.js',
      desc: 'The worker script (Runs in background thread)',
      code: `// This code runs in a separate thread
self.onmessage = function(e) {
  console.log('Worker: Message received from main script');
  const num = e.data;
  
  // Simulate heavy computation
  let result = 0;
  for (let i = 0; i < num; i++) {
    result += i;
  }
  
  console.log('Worker: Posting message back to main script');
  self.postMessage(result);
};`
    },
    {
      file: 'MainApp.jsx',
      desc: 'Spawning and communicating with the worker',
      code: `const worker = new Worker(new URL('./worker.js', import.meta.url));

function startTask() {
  worker.postMessage(1000000000); // Send data to worker
}

worker.onmessage = function(e) {
  console.log('Main: Message received from worker', e.data);
  setResult(e.data);
};`
    }
  ];

  const runHeavyTask = () => {
    setLoading(true);
    // Simulate main thread blockage if we didn't use workers
    // (Using a timeout to show the UI change first)
    setTimeout(() => {
      let res = 0;
      for (let i = 0; i < 500000000; i++) {
        res += i;
      }
      setResult(res);
      setLoading(false);
    }, 100);
  };

  return (
    <div>
      <div className="header-section">
        <h1 className="title">Web Workers</h1>
        <p className="description">
          Web Workers allow you to run JavaScript in the background, on a separate thread from the main UI thread. 
          This prevents the UI from freezing during heavy computations.
        </p>
      </div>

      <div className="demo-section">
        <div className="demo-title">
          <Cpu className="text-primary" />
          Heavy Computation Demo
        </div>
        <div className="card">
          <p style={{ marginBottom: '20px', color: 'var(--text-secondary)' }}>
            Clicking the button below simulates a heavy calculation. 
            In a real app, this would be offloaded to a Web Worker to keep the UI responsive.
          </p>
          <div className="flex-center">
            <button className="btn" onClick={runHeavyTask} disabled={loading}>
              {loading ? 'Computing...' : 'Run Heavy Task'}
            </button>
            {result && (
              <div className="badge" style={{ fontSize: '1rem', padding: '10px 20px' }}>
                Result: {result.toLocaleString()}
              </div>
            )}
          </div>
        </div>
      </div>

      <MultiStepCode steps={steps} />
    </div>
  );
};

export default WebWorkersDemo;
