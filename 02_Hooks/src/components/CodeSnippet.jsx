import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Copy, Check } from 'lucide-react';

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
      <div className="code-header">
        <span className="code-lang">{language}</span>
        <button 
          className={`copy-btn ${copied ? 'copied' : ''}`} 
          onClick={handleCopy}
          title="Copy to clipboard"
        >
          {copied ? <Check size={16} /> : <Copy size={16} />}
          {copied ? 'Copied!' : 'Copy code'}
        </button>
      </div>
      <SyntaxHighlighter 
        language={language} 
        style={vscDarkPlus}
        customStyle={{ margin: 0, padding: '20px', fontSize: '14px', borderRadius: '0 0 16px 16px' }}
      >
        {code.trim()}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeSnippet;
