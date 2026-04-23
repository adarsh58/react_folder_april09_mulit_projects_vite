import React, { useState, useEffect } from 'react';
import { Server, Database, Lock, Play, Trash2, Edit3, Plus, ChevronRight, ChevronLeft } from 'lucide-react';
import { openDB } from 'idb';

const DB_NAME = 'ExpressSimDB';
const STORE_NAME = 'products';

const ExpressApiDemo = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: '', price: '', category: '' });
  const [isEditing, setIsEditing] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('sim_token') || '');
  const [currentStep, setCurrentStep] = useState(0);

  // DB Initialization
  const initDB = async () => {
    return openDB(DB_NAME, 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
        }
      },
    });
  };

  // Simulated Middleware
  const checkAuth = (reqToken) => {
    if (reqToken === 'secret-jwt-token') return true;
    alert('401 Unauthorized: Please Login first!');
    return false;
  };

  // Fetch Products (GET)
  const fetchProducts = async () => {
    setLoading(true);
    const db = await initDB();
    const allProducts = await db.getAll(STORE_NAME);
    setProducts(allProducts);
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Create/Update Product (POST/PUT)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!checkAuth(token)) return;

    const db = await initDB();
    if (isEditing) {
      await db.put(STORE_NAME, { ...form, id: isEditing });
      setIsEditing(null);
    } else {
      await db.add(STORE_NAME, { ...form, price: parseFloat(form.price) });
    }
    
    setForm({ name: '', price: '', category: '' });
    fetchProducts();
  };

  // Delete Product (DELETE)
  const handleDelete = async (id) => {
    if (!checkAuth(token)) return;
    const db = await initDB();
    await db.delete(STORE_NAME, id);
    fetchProducts();
  };

  const login = () => {
    const fakeToken = 'secret-jwt-token';
    setToken(fakeToken);
    localStorage.setItem('sim_token', fakeToken);
  };

  const logout = () => {
    setToken('');
    localStorage.removeItem('sim_token');
  };

  const steps = [
    {
      file: 'server.js',
      desc: 'Setup Express & Middleware',
      code: `const express = require('express');
const app = express();
app.use(express.json());

// Auth Middleware
const auth = (req, res, next) => {
  const token = req.headers['authorization'];
  if (token === 'secret-jwt-token') next();
  else res.status(401).send('Unauthorized');
};`
    },
    {
      file: 'routes/products.js',
      desc: 'GET & POST Routes',
      code: `// Get all products
app.get('/api/products', async (req, res) => {
  const products = await db.products.find();
  res.json(products);
});

// Create product (Protected)
app.post('/api/products', auth, async (req, res) => {
  const newProduct = await db.products.insert(req.body);
  res.status(201).json(newProduct);
});`
    },
    {
      file: 'routes/products.js',
      desc: 'PUT & DELETE Routes',
      code: `// Update product
app.put('/api/products/:id', auth, async (req, res) => {
  const updated = await db.products.update(req.params.id, req.body);
  res.json(updated);
});

// Delete product
app.delete('/api/products/:id', auth, async (req, res) => {
  await db.products.delete(req.params.id);
  res.status(204).send();
});`
    }
  ];

  return (
    <div className="express-demo">
      <div className="header-section">
        <h1 className="title">Express.js API + IndexedDB</h1>
        <p className="description">
          A simulated backend environment demonstrating CRUD operations with Auth Middleware. 
          Data is persisted locally using IndexedDB.
        </p>
      </div>

      <div className="demo-section">
        <div className="demo-title">
          <Server className="text-primary" />
          Backend Simulation
          {!token ? (
            <button className="badge" onClick={login} style={{ cursor: 'pointer' }}>Login to Edit</button>
          ) : (
            <button className="badge" onClick={logout} style={{ cursor: 'pointer', background: 'rgba(239, 68, 68, 0.2)', color: '#f87171' }}>Logout</button>
          )}
        </div>

        <form onSubmit={handleSubmit} className="flex-col" style={{ marginBottom: '30px' }}>
          <div className="grid-2">
            <input 
              type="text" 
              placeholder="Product Name" 
              className="input-field"
              value={form.name}
              onChange={(e) => setForm({...form, name: e.target.value})}
              required
            />
            <input 
              type="number" 
              placeholder="Price" 
              className="input-field"
              value={form.price}
              onChange={(e) => setForm({...form, price: e.target.value})}
              required
            />
          </div>
          <select 
            className="input-field"
            value={form.category}
            onChange={(e) => setForm({...form, category: e.target.value})}
            required
          >
            <option value="">Select Category</option>
            <option value="Electronics">Electronics</option>
            <option value="Clothing">Clothing</option>
            <option value="Home">Home</option>
            <option value="Books">Books</option>
          </select>
          <button type="submit" className="btn">
            {isEditing ? 'Update Product' : 'Add Product'}
          </button>
        </form>

        <div className="product-grid">
          {loading ? (
            <p>Loading products...</p>
          ) : products.length === 0 ? (
            <p className="text-secondary">No products found. Add one!</p>
          ) : (
            products.map((p) => (
              <div key={p.id} className="product-card">
                <div className="product-header">
                  <div>
                    <div className="product-name">{p.name}</div>
                    <div className="product-category">{p.category}</div>
                  </div>
                  <div className="product-price">${p.price}</div>
                </div>
                <div className="product-actions">
                  <button 
                    className="action-btn edit-btn"
                    onClick={() => {
                      setForm({ name: p.name, price: p.price.toString(), category: p.category });
                      setIsEditing(p.id);
                    }}
                  >
                    <Edit3 size={16} />
                  </button>
                  <button 
                    className="action-btn delete-btn"
                    onClick={() => handleDelete(p.id)}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="code-space">
        <div className="demo-title">
          <Database className="text-primary" />
          Code Implementation Step-by-Step
        </div>
        
        <div className="step-code-section">
          <div className="step-header">
            <div className="step-info">
              <span className="file-name">{steps[currentStep].file}</span>
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

export default ExpressApiDemo;
