import React, { useState } from 'react';
import { Beaker, BookOpen, Layers, Zap, FunctionSquare, Layout, Clock, Database } from 'lucide-react';
import UseStateDemo from './components/hooks/UseStateDemo';
import UseEffectDemo from './components/hooks/UseEffectDemo';
import UseContextDemo from './components/hooks/UseContextDemo';
import UseReducerDemo from './components/hooks/UseReducerDemo';
import UseCallbackDemo from './components/hooks/UseCallbackDemo';
import UseMemoDemo from './components/hooks/UseMemoDemo';
import UseRefDemo from './components/hooks/UseRefDemo';
import UseImperativeHandleDemo from './components/hooks/UseImperativeHandleDemo';
import UseLayoutEffectDemo from './components/hooks/UseLayoutEffectDemo';
import UseDebugValueDemo from './components/hooks/UseDebugValueDemo';
import UseDeferredValueDemo from './components/hooks/UseDeferredValueDemo';
import UseTransitionDemo from './components/hooks/UseTransitionDemo';
import UseIdDemo from './components/hooks/UseIdDemo';
import UseSyncExternalStoreDemo from './components/hooks/UseSyncExternalStoreDemo';
import UseInsertionEffectDemo from './components/hooks/UseInsertionEffectDemo';

// Redux
import ReduxDemo from './components/ReduxDemo';

// JS Concepts
import ClosuresDemo from './components/js_concepts/ClosuresDemo';
import HoistingDemo from './components/js_concepts/HoistingDemo';
import EventLoopDemo from './components/js_concepts/EventLoopDemo';
import PromisesDemo from './components/js_concepts/PromisesDemo';
import PrototypesDemo from './components/js_concepts/PrototypesDemo';
import CallApplyBindDemo from './components/js_concepts/CallApplyBindDemo';
import DestructuringDemo from './components/js_concepts/DestructuringDemo';
import SpreadRestDemo from './components/js_concepts/SpreadRestDemo';
import ArrowFunctionsDemo from './components/js_concepts/ArrowFunctionsDemo';
import ClassesDemo from './components/js_concepts/ClassesDemo';
import GeneratorsDemo from './components/js_concepts/GeneratorsDemo';
import ProxiesDemo from './components/js_concepts/ProxiesDemo';
import IntersectionObserverDemo from './components/js_concepts/IntersectionObserverDemo';
import StorageApiDemo from './components/js_concepts/StorageApiDemo';

const hooksList = [
  { id: 'useState', name: 'useState', icon: <Layers size={18} /> },
  { id: 'useEffect', name: 'useEffect', icon: <Clock size={18} /> },
  { id: 'useContext', name: 'useContext', icon: <Database size={18} /> },
  { id: 'useReducer', name: 'useReducer', icon: <Zap size={18} /> },
  { id: 'useCallback', name: 'useCallback', icon: <FunctionSquare size={18} /> },
  { id: 'useMemo', name: 'useMemo', icon: <Beaker size={18} /> },
  { id: 'useRef', name: 'useRef', icon: <Layers size={18} /> },
  { id: 'useImperativeHandle', name: 'useImperativeHandle', icon: <Zap size={18} /> },
  { id: 'useLayoutEffect', name: 'useLayoutEffect', icon: <Layout size={18} /> },
  { id: 'useDebugValue', name: 'useDebugValue', icon: <BookOpen size={18} /> },
  { id: 'useDeferredValue', name: 'useDeferredValue', icon: <Clock size={18} /> },
  { id: 'useTransition', name: 'useTransition', icon: <Zap size={18} /> },
  { id: 'useId', name: 'useId', icon: <Database size={18} /> },
  { id: 'useSyncExternalStore', name: 'useSyncExternalStore', icon: <Layers size={18} /> },
  { id: 'useInsertionEffect', name: 'useInsertionEffect', icon: <Layout size={18} /> },
];

const jsConceptsList = [
  { id: 'closures', name: 'Closures', icon: <FunctionSquare size={18} /> },
  { id: 'hoisting', name: 'Hoisting', icon: <Layers size={18} /> },
  { id: 'eventLoop', name: 'Event Loop', icon: <Clock size={18} /> },
  { id: 'promises', name: 'Promises / Async', icon: <Zap size={18} /> },
  { id: 'prototypes', name: 'Prototypes', icon: <Database size={18} /> },
  { id: 'callApplyBind', name: 'Call/Apply/Bind', icon: <FunctionSquare size={18} /> },
  { id: 'destructuring', name: 'Destructuring', icon: <Layers size={18} /> },
  { id: 'spreadRest', name: 'Spread/Rest', icon: <Beaker size={18} /> },
  { id: 'arrowFunctions', name: 'Arrow Functions', icon: <Zap size={18} /> },
  { id: 'classes', name: 'ES6 Classes', icon: <Layers size={18} /> },
  { id: 'generators', name: 'Generators', icon: <Zap size={18} /> },
  { id: 'proxies', name: 'Proxies', icon: <Beaker size={18} /> },
  { id: 'intersectionObserver', name: 'Intersection Observer', icon: <Layers size={18} /> },
  { id: 'storageApi', name: 'Storage API', icon: <Database size={18} /> },
];

const advancedList = [
  { id: 'redux', name: 'Redux + IndexedDB', icon: <Database size={18} /> },
];

function App() {
  const [activeTab, setActiveTab] = useState('useState');

  const renderContent = () => {
    switch (activeTab) {
      // Hooks
      case 'useState': return <UseStateDemo />;
      case 'useEffect': return <UseEffectDemo />;
      case 'useContext': return <UseContextDemo />;
      case 'useReducer': return <UseReducerDemo />;
      case 'useCallback': return <UseCallbackDemo />;
      case 'useMemo': return <UseMemoDemo />;
      case 'useRef': return <UseRefDemo />;
      case 'useImperativeHandle': return <UseImperativeHandleDemo />;
      case 'useLayoutEffect': return <UseLayoutEffectDemo />;
      case 'useDebugValue': return <UseDebugValueDemo />;
      case 'useDeferredValue': return <UseDeferredValueDemo />;
      case 'useTransition': return <UseTransitionDemo />;
      case 'useId': return <UseIdDemo />;
      case 'useSyncExternalStore': return <UseSyncExternalStoreDemo />;
      case 'useInsertionEffect': return <UseInsertionEffectDemo />;
      
      // Redux
      case 'redux': return <ReduxDemo />;
      
      // JS Concepts
      case 'closures': return <ClosuresDemo />;
      case 'hoisting': return <HoistingDemo />;
      case 'eventLoop': return <EventLoopDemo />;
      case 'promises': return <PromisesDemo />;
      case 'prototypes': return <PrototypesDemo />;
      case 'callApplyBind': return <CallApplyBindDemo />;
      case 'destructuring': return <DestructuringDemo />;
      case 'spreadRest': return <SpreadRestDemo />;
      case 'arrowFunctions': return <ArrowFunctionsDemo />;
      case 'classes': return <ClassesDemo />;
      case 'generators': return <GeneratorsDemo />;
      case 'proxies': return <ProxiesDemo />;
      case 'intersectionObserver': return <IntersectionObserverDemo />;
      case 'storageApi': return <StorageApiDemo />;
      default: return <UseStateDemo />;
    }
  };

  return (
    <div className="app-container">
      {/* Sidebar Navigation */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <h1>React Masterclass</h1>
          <p>Interactive Guide</p>
        </div>
        
        <div className="sidebar-nav">
          <div className="nav-section">
            <h2 className="nav-section-title">React Hooks</h2>
            {hooksList.map((hook) => (
              <div 
                key={hook.id} 
                className={`nav-item ${activeTab === hook.id ? 'active' : ''}`}
                onClick={() => setActiveTab(hook.id)}
              >
                <span style={{ marginRight: '12px', display: 'flex' }}>{hook.icon}</span>
                {hook.name}
              </div>
            ))}
          </div>

          <div className="nav-section">
            <h2 className="nav-section-title">Advanced State</h2>
            {advancedList.map((item) => (
              <div 
                key={item.id} 
                className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
                onClick={() => setActiveTab(item.id)}
              >
                <span style={{ marginRight: '12px', display: 'flex' }}>{item.icon}</span>
                {item.name}
              </div>
            ))}
          </div>
          
          <div className="nav-section">
            <h2 className="nav-section-title">JS Concepts</h2>
            {jsConceptsList.map((concept) => (
              <div 
                key={concept.id} 
                className={`nav-item ${activeTab === concept.id ? 'active' : ''}`}
                onClick={() => setActiveTab(concept.id)}
              >
                <span style={{ marginRight: '12px', display: 'flex' }}>{concept.icon}</span>
                {concept.name}
              </div>
            ))}
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="main-content">
        <div className="content-wrapper" key={activeTab}>
          {renderContent()}
        </div>
      </main>
    </div>
  );
}

export default App;
