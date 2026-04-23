import React, { useState, useEffect, useRef } from 'react';
import CodeSnippet from '../CodeSnippet';

const IntersectionObserverDemo = () => {
  const [isVisible, setIsVisible] = useState(false);
  const targetRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.5 }
    );

    if (targetRef.current) {
      observer.observe(targetRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const code = `const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      console.log('Element is visible!');
      entry.target.classList.add('animate');
    }
  });
}, { threshold: 0.5 }); // 50% visible

observer.observe(document.querySelector('#target'));`;

  return (
    <div className="header-section">
      <h1 className="title">Intersection Observer</h1>
      <p className="description">
        The <strong>Intersection Observer API</strong> provides a way to asynchronously observe changes in the intersection of a target element with an ancestor element or with a top-level document's viewport.
      </p>

      <div className="demo-section mt-8 glass-card">
        <h2 className="demo-title">Viewport Visibility Tracking</h2>
        <div className="card flex-col flex-center">
          <p>Scroll down to the box below!</p>
          <div style={{ height: '300px', width: '100%', overflowY: 'auto', border: '1px dashed var(--border)', borderRadius: '8px', padding: '20px' }}>
            <div style={{ height: '400px' }}>Scroll down...</div>
            <div 
              ref={targetRef}
              style={{ 
                height: '100px', 
                background: isVisible ? 'var(--success)' : 'var(--card-bg)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '8px',
                transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
                transform: isVisible ? 'scale(1.1)' : 'scale(1)',
                opacity: isVisible ? 1 : 0.3
              }}
            >
              {isVisible ? "I AM VISIBLE! 🎯" : "Wait for me..."}
            </div>
            <div style={{ height: '400px' }}>Keep scrolling...</div>
          </div>
          <p style={{ marginTop: '16px', color: isVisible ? 'var(--success)' : 'var(--text-secondary)' }}>
            Status: {isVisible ? 'Intersecting' : 'Not Intersecting'}
          </p>
        </div>
      </div>

      <CodeSnippet code={code} />
    </div>
  );
};

export default IntersectionObserverDemo;
