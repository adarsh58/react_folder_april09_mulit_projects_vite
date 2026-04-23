import React, { useState } from 'react';
import CodeSnippet from '../CodeSnippet';

const GeneratorsDemo = () => {
  const [logs, setLogs] = useState([]);
  const [gen, setGen] = useState(null);

  function* numberGenerator() {
    yield "Step 1: Preparing...";
    yield "Step 2: Processing data...";
    yield "Step 3: Success!";
    return "Generator Finished";
  }

  const startGen = () => {
    const newGen = numberGenerator();
    setGen(newGen);
    setLogs(["Generator Initialized"]);
  };

  const nextStep = () => {
    if (!gen) return;
    const result = gen.next();
    if (result.done) {
      setLogs(prev => [...prev, `DONE: ${result.value}`]);
      setGen(null);
    } else {
      setLogs(prev => [...prev, `YIELD: ${result.value}`]);
    }
  };

  const code = `function* idGenerator() {
  let id = 1;
  while (true) {
    yield id++;
  }
}

const gen = idGenerator();
console.log(gen.next().value); // 1
console.log(gen.next().value); // 2

// Iterating over generators
function* steps() {
  yield 'Step A';
  yield 'Step B';
}
for (const step of steps()) {
  console.log(step);
}`;

  return (
    <div className="header-section">
      <h1 className="title">Generators</h1>
      <p className="description">
        <strong>Generators</strong> are functions that can be exited and later re-entered. Their context (variable bindings) will be saved across re-entrances. They return an <code>iterator</code> object.
      </p>

      <div className="demo-section mt-8 glass-card">
        <h2 className="demo-title">Generator Flow Control</h2>
        <div className="card flex-col flex-center">
          <div style={{ display: 'flex', gap: '10px' }}>
            <button className="btn btn-secondary" onClick={startGen}>Start Generator</button>
            <button className="btn" onClick={nextStep} disabled={!gen}>Next Step</button>
          </div>
          <div style={{ width: '100%', background: 'rgba(0,0,0,0.3)', padding: '15px', borderRadius: '8px', minHeight: '120px', fontFamily: 'monospace', marginTop: '16px' }}>
            {logs.map((log, i) => <div key={i} style={{ color: log.includes('DONE') ? 'var(--accent)' : 'var(--success)', marginBottom: '4px' }}>{'>'} {log}</div>)}
          </div>
        </div>
      </div>

      <CodeSnippet code={code} />
    </div>
  );
};

export default GeneratorsDemo;
