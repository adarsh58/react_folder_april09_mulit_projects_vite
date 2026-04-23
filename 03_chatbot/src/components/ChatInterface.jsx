import React, { useState, useEffect, useRef } from 'react';
import { sendChatMessage, streamChatMessage } from '../services/llmApi';
import './ChatInterface.css';

export default function ChatInterface({ selectedModel }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [useStreaming, setUseStreaming] = useState(false);
  const [temperature, setTemperature] = useState(0.7);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    
    if (!input.trim() || !selectedModel) {
      alert('Please select a model and enter a message');
      return;
    }

    const userMessage = input.trim();
    setInput('');
    setLoading(true);
    setError(null);

    // Add user message to chat
    setMessages((prev) => [...prev, { role: 'user', content: userMessage }]);

    try {
      if (useStreaming) {
        await handleStreamingResponse(userMessage);
      } else {
        await handleRegularResponse(userMessage);
      }
    } catch (err) {
      setError(err.message);
      console.error('Error sending message:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRegularResponse = async (userMessage) => {
    const response = await sendChatMessage(selectedModel, userMessage, messages, {
      temperature,
      max_output_tokens: 1024,
    });

    console.log('Chat API Response:', response);
    
    // Extract message content from response
    if (response.output && Array.isArray(response.output) && response.output.length > 0) {
      const assistantMessage = response.output
        .filter((item) => item.type === 'message')
        .map((item) => item.content)
        .join('\n');

      if (assistantMessage) {
        setMessages((prev) => [...prev, { role: 'assistant', content: assistantMessage }]);
      } else {
        setError('No message content in response');
      }
    } else {
      console.warn('Unexpected response format:', response);
      setError('Unexpected response format from model');
    }
  };

  const handleStreamingResponse = async (userMessage) => {
    let fullContent = '';
    const tempMessageIndex = messages.length;

    // Add placeholder for streaming response
    setMessages((prev) => [...prev, { role: 'assistant', content: '', isStreaming: true }]);

    try {
      await streamChatMessage(selectedModel, userMessage, (chunk) => {
        fullContent += chunk;
        setMessages((prev) => {
          const updated = [...prev];
          updated[tempMessageIndex] = {
            role: 'assistant',
            content: fullContent,
            isStreaming: true,
          };
          return updated;
        });
        scrollToBottom();
      }, {
        temperature,
        max_output_tokens: 1024,
      });

      // Mark as not streaming anymore
      setMessages((prev) => {
        const updated = [...prev];
        updated[tempMessageIndex] = {
          role: 'assistant',
          content: fullContent,
          isStreaming: false,
        };
        return updated;
      });
    } catch (err) {
      throw err;
    }
  };

  const clearChat = () => {
    if (window.confirm('Clear all messages?')) {
      setMessages([]);
      setError(null);
    }
  };

  if (!selectedModel) {
    return (
      <div className="chat-interface">
        <div className="empty-state">
          <p>Please select a model to start chatting</p>
        </div>
      </div>
    );
  }

  return (
    <div className="chat-interface">
      <div className="chat-header">
        <h2>Chat with {selectedModel}</h2>
        <button onClick={clearChat} className="clear-btn">Clear Chat</button>
      </div>

      <div className="chat-messages">
        {messages.length === 0 && (
          <div className="welcome-message">
            <h3>Welcome! 👋</h3>
            <p>Start a conversation with {selectedModel}</p>
          </div>
        )}
        
        {messages.map((msg, idx) => (
          <div key={idx} className={`message message-${msg.role}`}>
            <div className="message-avatar">
              {msg.role === 'user' ? '👤' : '🤖'}
            </div>
            <div className="message-content">
              <p>{msg.content}</p>
              {msg.isStreaming && <span className="streaming-indicator">●</span>}
            </div>
          </div>
        ))}
        
        {loading && (
          <div className="message message-assistant">
            <div className="message-avatar">🤖</div>
            <div className="message-content">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}
        
        {error && (
          <div className="error-banner">
            <strong>Error:</strong> {error}
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      <div className="chat-options">
        <div className="option-group">
          <label>
            <input
              type="checkbox"
              checked={useStreaming}
              onChange={(e) => setUseStreaming(e.target.checked)}
              disabled={loading}
            />
            Use Streaming
          </label>
        </div>
        
        <div className="option-group">
          <label>
            Temperature: <span className="temp-value">{temperature.toFixed(2)}</span>
          </label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={temperature}
            onChange={(e) => setTemperature(parseFloat(e.target.value))}
            disabled={loading}
            className="temperature-slider"
          />
        </div>
      </div>

      <form onSubmit={handleSendMessage} className="chat-input-form">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          disabled={loading}
          className="chat-input"
        />
        <button type="submit" disabled={loading || !input.trim()} className="send-btn">
          {loading ? '⏳' : '📤 Send'}
        </button>
      </form>
    </div>
  );
}
