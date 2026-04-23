import React, { useState } from 'react';
import ChatInterface from './components/ChatInterface';
import ModelSelector from './components/ModelSelector';
import './App.css';

function App() {
  const [selectedModel, setSelectedModel] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="app">
      <div className="app-container">
        <header className="app-header">
          <div className="header-content">
            <h1>🤖 LLM Chat Application</h1>
            <p>Local LLM API Integration</p>
          </div>
        </header>

        <main className="app-main">
          <div className="sidebar">
            <ModelSelector 
              selectedModel={selectedModel}
              onModelSelect={setSelectedModel}
              onLoading={setIsLoading}
            />
          </div>

          <div className="chat-area">
            <ChatInterface selectedModel={selectedModel} />
          </div>
        </main>

        <footer className="app-footer">
          <p>LLM Studio - Local API @ http://localhost:1234</p>
          {isLoading && <span className="loading-indicator">⏳ Processing...</span>}
        </footer>
      </div>
    </div>
  );
}

export default App;
