import React, { useState } from 'react';
import { Layers, List, Hash, Shield, ChevronRight, ChevronLeft, Code } from 'lucide-react';

const CSharpCollectionsDemo = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: 'Generic Collections',
      desc: 'Type-safe collections (List, Dictionary, etc.)',
      code: `// List<T> - Dynamic array
List<string> fruits = new List<string> { "Apple", "Banana" };
fruits.Add("Orange");
string first = fruits[0];

// Dictionary<TKey, TValue> - Key-value pairs
Dictionary<int, string> users = new Dictionary<int, string>();
users.Add(1, "Adarsh");
users[2] = "John";

// HashSet<T> - Unique elements
HashSet<int> numbers = new HashSet<int> { 1, 2, 2, 3 }; // Result: {1, 2, 3}

// Queue<T> - FIFO
Queue<string> tasks = new Queue<string>();
tasks.Enqueue("Clean");
string nextTask = tasks.Dequeue();`
    },
    {
      title: 'Non-Generic Collections',
      desc: 'Legacy collections that store objects (Boxing/Unboxing)',
      code: `using System.Collections;

// ArrayList - Can store any type
ArrayList list = new ArrayList();
list.Add(1);
list.Add("Mixed Types");
int val = (int)list[0]; // Requires casting

// Hashtable - Key-value pairs of objects
Hashtable table = new Hashtable();
table.Add("id", 101);
table.Add(1, "Value");

// Stack - LIFO
Stack stack = new Stack();
stack.Push("Bottom");
stack.Push("Top");
var top = stack.Pop();`
    },
    {
      title: 'Common LINQ Functions',
      desc: 'Built-in extension methods for collections',
      code: `var numbers = new List<int> { 1, 5, 8, 12, 15 };

// Filtering
var highNumbers = numbers.Where(n => n > 10);

// Projection
var strings = numbers.Select(n => $"Value: {n}");

// Aggregation
int sum = numbers.Sum();
double avg = numbers.Average();
int max = numbers.Max();

// Ordering
var sorted = numbers.OrderByDescending(n => n);

// First/Single
var first = numbers.FirstOrDefault(n => n > 20); // returns 0 if not found`
    }
  ];

  return (
    <div className="csharp-demo">
      <div className="header-section">
        <h1 className="title">C# Collections Cheat Sheet</h1>
        <p className="description">
          A comprehensive guide to Generic and Non-Generic collections in .NET, 
          including common LINQ operations and built-in functions.
        </p>
      </div>

      <div className="demo-section">
        <div className="demo-title">
          <Layers className="text-primary" />
          Collection Hierarchy & Concepts
        </div>
        <div className="grid-2">
          <div className="card">
            <h3>Generic (System.Collections.Generic)</h3>
            <ul style={{ marginTop: '12px', color: 'var(--text-secondary)', listStyle: 'none' }}>
              <li>✅ Type Safety</li>
              <li>✅ No Boxing/Unboxing</li>
              <li>✅ Better Performance</li>
              <li>✅ Recommended for modern C#</li>
            </ul>
          </div>
          <div className="card">
            <h3>Non-Generic (System.Collections)</h3>
            <ul style={{ marginTop: '12px', color: 'var(--text-secondary)', listStyle: 'none' }}>
              <li>❌ Stores everything as Object</li>
              <li>❌ Boxing/Unboxing overhead</li>
              <li>❌ Run-time type errors</li>
              <li>❌ Avoid in new projects</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="code-space">
        <div className="demo-title">
          <Code className="text-primary" />
          Implementation & Syntax
        </div>
        
        <div className="step-code-section">
          <div className="step-header">
            <div className="step-info">
              <span className="file-name">{steps[currentStep].title}</span>
              <span className="step-desc">{steps[currentStep].desc}</span>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button 
                className="action-btn edit-btn" 
                disabled={currentStep === 0}
                onClick={() => setCurrentStep(prev => prev - 1)}
              >
                <ChevronLeft size={20} />
              </button>
              <button 
                className="action-btn edit-btn"
                disabled={currentStep === steps.length - 1}
                onClick={() => setCurrentStep(prev => prev + 1)}
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
          <div className="scrollable-code">
            <pre className="code-block">
              <code>{steps[currentStep].code}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CSharpCollectionsDemo;
