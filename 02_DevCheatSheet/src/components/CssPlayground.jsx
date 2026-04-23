import React, { useState } from 'react';
import { Layout, Grid, Maximize, Smartphone, Monitor, Smartphone as Mobile, Code, RotateCcw, Zap, Play, Repeat } from 'lucide-react';

const CssPlayground = () => {
  const [activeTab, setActiveTab] = useState('flex');
  const [flexProps, setFlexProps] = useState({
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'nowrap',
    gap: '10px'
  });

  const [gridProps, setGridProps] = useState({
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '10px',
    alignItems: 'stretch',
    justifyItems: 'stretch'
  });

  const [transitionProps, setTransitionProps] = useState({
    property: 'all',
    duration: '0.3s',
    timingFunction: 'ease',
    delay: '0s'
  });

  const [animationProps, setAnimationProps] = useState({
    name: 'none',
    duration: '1s',
    timingFunction: 'ease',
    iterationCount: 'infinite',
    direction: 'normal'
  });

  const [viewport, setViewport] = useState('desktop');

  const reset = () => {
    if (activeTab === 'flex') setFlexProps({ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', flexWrap: 'nowrap', gap: '10px' });
    if (activeTab === 'grid') setGridProps({ gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', alignItems: 'stretch', justifyItems: 'stretch' });
    if (activeTab === 'transition') setTransitionProps({ property: 'all', duration: '0.3s', timingFunction: 'ease', delay: '0s' });
    if (activeTab === 'animation') setAnimationProps({ name: 'none', duration: '1s', timingFunction: 'ease', iterationCount: 'infinite', direction: 'normal' });
  };

  const renderControls = () => {
    switch (activeTab) {
      case 'flex':
        return (
          <div className="flex-col">
            <div className="control-group">
              <label>flex-direction</label>
              <div className="button-row">
                {['row', 'column'].map(v => (
                  <button key={v} className={`mini-btn ${flexProps.flexDirection === v ? 'active' : ''}`} onClick={() => setFlexProps({...flexProps, flexDirection: v})}>{v}</button>
                ))}
              </div>
            </div>
            <div className="control-group">
              <label>justify-content</label>
              <div className="button-row flex-wrap">
                {['center', 'space-between', 'space-around'].map(v => (
                  <button key={v} className={`mini-btn ${flexProps.justifyContent === v ? 'active' : ''}`} onClick={() => setFlexProps({...flexProps, justifyContent: v})}>{v}</button>
                ))}
              </div>
            </div>
            <div className="control-group">
              <label>gap</label>
              <input type="range" min="0" max="50" value={parseInt(flexProps.gap)} onChange={(e) => setFlexProps({...flexProps, gap: `${e.target.value}px`})} />
            </div>
          </div>
        );
      case 'grid':
        return (
          <div className="flex-col">
            <div className="control-group">
              <label>grid-template-columns</label>
              <div className="button-row flex-wrap">
                {['repeat(3, 1fr)', '1fr 2fr', 'repeat(auto-fit, minmax(100px, 1fr))'].map(v => (
                  <button key={v} className={`mini-btn ${gridProps.gridTemplateColumns === v ? 'active' : ''}`} onClick={() => setGridProps({...gridProps, gridTemplateColumns: v})}>{v}</button>
                ))}
              </div>
            </div>
            <div className="control-group">
              <label>gap</label>
              <input type="range" min="0" max="50" value={parseInt(gridProps.gap)} onChange={(e) => setGridProps({...gridProps, gap: `${e.target.value}px`})} />
            </div>
          </div>
        );
      case 'transition':
        return (
          <div className="flex-col">
            <div className="control-group">
              <label>duration</label>
              <div className="button-row">
                {['0.1s', '0.3s', '0.5s', '1s', '2s'].map(v => (
                  <button key={v} className={`mini-btn ${transitionProps.duration === v ? 'active' : ''}`} onClick={() => setTransitionProps({...transitionProps, duration: v})}>{v}</button>
                ))}
              </div>
            </div>
            <div className="control-group">
              <label>timing-function</label>
              <div className="button-row flex-wrap">
                {['linear', 'ease', 'ease-in', 'ease-out', 'ease-in-out', 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'].map(v => (
                  <button key={v} className={`mini-btn ${transitionProps.timingFunction === v ? 'active' : ''}`} onClick={() => setTransitionProps({...transitionProps, timingFunction: v})}>{v.includes('cubic') ? 'bounce' : v}</button>
                ))}
              </div>
            </div>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Hover items in preview to see transition!</p>
          </div>
        );
      case 'animation':
        return (
          <div className="flex-col">
            <div className="control-group">
              <label>animation-name</label>
              <div className="button-row flex-wrap">
                {['none', 'float', 'pulse', 'spin', 'bounce', 'slideIn'].map(v => (
                  <button key={v} className={`mini-btn ${animationProps.name === v ? 'active' : ''}`} onClick={() => setAnimationProps({...animationProps, name: v})}>{v}</button>
                ))}
              </div>
            </div>
            <div className="control-group">
              <label>duration</label>
              <div className="button-row">
                {['0.5s', '1s', '2s', '3s'].map(v => (
                  <button key={v} className={`mini-btn ${animationProps.duration === v ? 'active' : ''}`} onClick={() => setAnimationProps({...animationProps, duration: v})}>{v}</button>
                ))}
              </div>
            </div>
            <div className="control-group">
              <label>iteration-count</label>
              <div className="button-row">
                {['1', '2', '3', 'infinite'].map(v => (
                  <button key={v} className={`mini-btn ${animationProps.iterationCount === v ? 'active' : ''}`} onClick={() => setAnimationProps({...animationProps, iterationCount: v})}>{v}</button>
                ))}
              </div>
            </div>
          </div>
        );
      default: return null;
    }
  };

  const getActiveCode = () => {
    if (activeTab === 'flex') return `.container {
  display: flex;
  flex-direction: ${flexProps.flexDirection};
  justify-content: ${flexProps.justifyContent};
  gap: ${flexProps.gap};
}`;
    if (activeTab === 'grid') return `.container {
  display: grid;
  grid-template-columns: ${gridProps.gridTemplateColumns};
  gap: ${gridProps.gap};
}`;
    if (activeTab === 'transition') return `.item {
  transition: ${transitionProps.property} ${transitionProps.duration} ${transitionProps.timingFunction};
}
.item:hover {
  transform: scale(1.5) rotate(15deg);
  background: var(--primary);
}`;
    return `.item {
  animation: ${animationProps.name} ${animationProps.duration} ${animationProps.timingFunction} ${animationProps.iterationCount};
}`;
  };

  return (
    <div className="css-playground">
      <div className="header-section">
        <h1 className="title">CSS Visual Lab</h1>
        <p className="description">
          Master the art of layout and motion. Experiment with Flex, Grid, Transitions, 
          and Keyframe Animations in a live sandboxed environment.
        </p>
      </div>

      <div className="playground-tabs">
        <button className={`tab-btn ${activeTab === 'flex' ? 'active' : ''}`} onClick={() => setActiveTab('flex')}><Layout size={18} /> Flexbox</button>
        <button className={`tab-btn ${activeTab === 'grid' ? 'active' : ''}`} onClick={() => setActiveTab('grid')}><Grid size={18} /> Grid</button>
        <button className={`tab-btn ${activeTab === 'transition' ? 'active' : ''}`} onClick={() => setActiveTab('transition')}><Zap size={18} /> Transitions</button>
        <button className={`tab-btn ${activeTab === 'animation' ? 'active' : ''}`} onClick={() => setActiveTab('animation')}><Play size={18} /> Animations</button>
      </div>

      <div className="playground-layout">
        <div className="controls-panel card">
          <div className="demo-title" style={{ justifyContent: 'space-between' }}>
            <span>Style Config</span>
            <button className="action-btn" onClick={reset}><RotateCcw size={14} /></button>
          </div>
          {renderControls()}
          
          <div className="code-display" style={{ marginTop: '30px' }}>
            <div className="demo-title"><Code size={16} /> Live CSS</div>
            <pre className="mini-code">
              <code>{getActiveCode()}</code>
            </pre>
          </div>
        </div>

        <div className="preview-panel">
          <div className="preview-header">
            <div className="viewport-toggles">
              <button className={`viewport-btn ${viewport === 'desktop' ? 'active' : ''}`} onClick={() => setViewport('desktop')}><Monitor size={16} /></button>
              <button className={`viewport-btn ${viewport === 'tablet' ? 'active' : ''}`} onClick={() => setViewport('tablet')}><Smartphone size={16} /></button>
              <button className={`viewport-btn ${viewport === 'mobile' ? 'active' : ''}`} onClick={() => setViewport('mobile')}><Mobile size={16} /></button>
            </div>
            <span className="badge">LIVE PREVIEW</span>
          </div>

          <div className={`preview-container ${viewport}`}>
            <div 
              className="preview-box" 
              style={
                activeTab === 'flex' ? { display: 'flex', ...flexProps } : 
                activeTab === 'grid' ? { display: 'grid', ...gridProps } : 
                { display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '30px' }
              }
            >
              {[1, 2, 3].map(i => (
                <div 
                  key={i} 
                  className={`preview-item transitionable`}
                  style={
                    activeTab === 'transition' ? { 
                      transition: `${transitionProps.property} ${transitionProps.duration} ${transitionProps.timingFunction}` 
                    } : 
                    activeTab === 'animation' ? {
                      animationName: animationProps.name,
                      animationDuration: animationProps.duration,
                      animationTimingFunction: animationProps.timingFunction,
                      animationIterationCount: animationProps.iterationCount
                    } : {}
                  }
                >
                  <span>{i}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.1); opacity: 0.7; }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-30px); }
          60% { transform: translateY(-15px); }
        }
        @keyframes slideIn {
          from { transform: translateX(-100px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }

        .css-playground .playground-tabs { display: flex; gap: 10px; margin-bottom: 30px; flex-wrap: wrap; }
        .css-playground .tab-btn {
          background: rgba(255,255,255,0.05);
          border: 1px solid var(--border);
          color: var(--text-secondary);
          padding: 10px 20px;
          border-radius: 12px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 10px;
          font-weight: 600;
          transition: all 0.3s;
          font-size: 0.9rem;
        }
        .css-playground .tab-btn.active {
          background: var(--primary);
          color: white;
          border-color: var(--primary);
          box-shadow: 0 4px 15px rgba(99, 102, 241, 0.4);
        }
        .css-playground .playground-layout { display: grid; grid-template-columns: 350px 1fr; gap: 30px; }
        .css-playground .control-group { margin-bottom: 20px; }
        .css-playground .control-group label {
          display: block;
          font-size: 0.75rem;
          color: var(--text-secondary);
          margin-bottom: 8px;
          font-family: 'JetBrains Mono', monospace;
          text-transform: uppercase;
        }
        .css-playground .button-row { display: flex; gap: 6px; }
        .css-playground .button-row.flex-wrap { flex-wrap: wrap; }
        .css-playground .mini-btn {
          background: rgba(255,255,255,0.03);
          border: 1px solid var(--border);
          color: var(--text-secondary);
          padding: 4px 8px;
          border-radius: 6px;
          font-size: 0.7rem;
          cursor: pointer;
          transition: all 0.2s;
        }
        .css-playground .mini-btn:hover { border-color: var(--primary); color: var(--text-primary); }
        .css-playground .mini-btn.active { background: rgba(99, 102, 241, 0.2); color: var(--primary); border-color: var(--primary); }
        
        .css-playground .preview-panel {
          background: #000;
          border-radius: 24px;
          border: 1px solid var(--border);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          min-height: 500px;
        }
        .css-playground .preview-header {
          padding: 16px 24px;
          background: rgba(255,255,255,0.02);
          border-bottom: 1px solid var(--border);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .css-playground .viewport-toggles { display: flex; gap: 10px; }
        .css-playground .viewport-btn {
          background: none;
          border: none;
          color: var(--text-secondary);
          cursor: pointer;
          padding: 4px;
          transition: all 0.2s;
        }
        .css-playground .viewport-btn.active { color: var(--primary); transform: scale(1.2); }
        
        .css-playground .preview-container {
          flex: 1;
          padding: 40px;
          display: flex;
          justify-content: center;
          align-items: center;
          background: radial-gradient(circle at center, #111 0%, #000 100%);
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .css-playground .preview-container.tablet { max-width: 600px; margin: 0 auto; }
        .css-playground .preview-container.mobile { max-width: 375px; margin: 0 auto; }
        
        .css-playground .preview-box {
          background: rgba(255,255,255,0.02);
          border: 2px dashed rgba(255,255,255,0.05);
          width: 100%;
          height: 100%;
          min-height: 350px;
          border-radius: 12px;
          padding: 20px;
        }
        .css-playground .preview-item {
          background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);
          width: 80px;
          height: 80px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          box-shadow: 0 10px 20px rgba(0,0,0,0.4);
          color: white;
          font-size: 1.5rem;
          cursor: pointer;
        }
        .css-playground .preview-item:hover {
          transform: scale(1.5) rotate(15deg);
          background: linear-gradient(135deg, #d946ef 0%, #6366f1 100%);
        }
        .css-playground .mini-code {
          background: rgba(0,0,0,0.4);
          padding: 15px;
          border-radius: 12px;
          font-size: 0.8rem;
          color: #818cf8;
          font-family: 'JetBrains Mono', monospace;
          border: 1px solid rgba(255,255,255,0.05);
        }

        @media (max-width: 1024px) {
          .css-playground .playground-layout { grid-template-columns: 1fr; }
        }
      `}} />
    </div>
  );
};

export default CssPlayground;
