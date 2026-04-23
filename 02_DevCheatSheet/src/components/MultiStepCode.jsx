import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, FileCode, Check, Copy, Terminal } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const MultiStepCode = ({ steps }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(steps[currentStep].code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  if (!steps || steps.length === 0) return null;

  return (
    <div className="code-space">
      <div className="demo-title">
        <FileCode className="text-primary" />
        Implementation Steps
      </div>
      
      <div className="step-code-section" style={{ border: '1px solid var(--border)', background: '#0d1117' }}>
        <div className="step-header" style={{ background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid var(--border)' }}>
          <div className="step-info">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Terminal size={14} className="text-primary" />
              <span className="file-name">{steps[currentStep].file}</span>
            </div>
            <span className="step-desc" style={{ marginLeft: '22px' }}>{steps[currentStep].desc}</span>
          </div>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: '600', opacity: 0.7 }}>
              {currentStep + 1} / {steps.length}
            </span>
            <button 
              className={`copy-btn ${copied ? 'copied' : ''}`} 
              onClick={handleCopy}
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
              <span style={{ marginLeft: '6px' }}>{copied ? 'Copied' : 'Copy'}</span>
            </button>
            <div style={{ display: 'flex', gap: '4px', borderLeft: '1px solid var(--border)', paddingLeft: '12px' }}>
              <button 
                className="action-btn edit-btn" 
                disabled={currentStep === 0}
                onClick={() => setCurrentStep(prev => prev - 1)}
                style={{ padding: '4px' }}
              >
                <ChevronLeft size={20} />
              </button>
              <button 
                className="action-btn edit-btn"
                disabled={currentStep === steps.length - 1}
                onClick={() => setCurrentStep(prev => prev + 1)}
                style={{ padding: '4px' }}
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
        <div className="scrollable-code" style={{ padding: '0' }}>
          <SyntaxHighlighter 
            language="javascript" 
            style={vscDarkPlus}
            customStyle={{ margin: 0, padding: '24px', background: 'transparent', fontSize: '14px', lineHeight: '1.6' }}
          >
            {steps[currentStep].code.trim()}
          </SyntaxHighlighter>
        </div>
      </div>
    </div>
  );
};

export default MultiStepCode;
