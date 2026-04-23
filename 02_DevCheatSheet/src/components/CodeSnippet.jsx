import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Copy, Check, Terminal } from 'lucide-react';

const CodeSnippet = ({ code, language = 'javascript' }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="code-section">
      <div className="code-header" style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        padding: '10px 20px', 
        background: 'rgba(255,255,255,0.03)',
        borderBottom: '1px solid var(--border)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Terminal size={14} className="text-primary" />
          <span className="code-lang" style={{ 
            textTransform: 'uppercase', 
            fontSize: '0.7rem', 
            fontWeight: '700', 
            letterSpacing: '0.1em',
            color: 'var(--text-secondary)'
          }}>{language}</span>
        </div>
        <button 
          className={`copy-btn ${copied ? 'copied' : ''}`} 
          onClick={handleCopy}
          title="Copy to clipboard"
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <SyntaxHighlighter 
        language={language} 
        style={vscDarkPlus}
        customStyle={{ margin: 0, padding: '20px', fontSize: '14px', background: 'transparent' }}
      >
        {code.trim()}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeSnippet;
