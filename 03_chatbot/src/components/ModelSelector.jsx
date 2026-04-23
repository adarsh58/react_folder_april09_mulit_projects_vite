import React, { useState, useEffect } from 'react';
import { getModels, loadModel, downloadModel, checkDownloadStatus } from '../services/llmApi';
import './ModelSelector.css';

export default function ModelSelector({ selectedModel, onModelSelect, onLoading }) {
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [downloading, setDownloading] = useState(null);

  useEffect(() => {
    fetchModels();
  }, []);

  const fetchModels = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getModels();
      console.log('Full response from API:', response);
      
      // Handle different response structures
      let modelsList = [];
      if (Array.isArray(response)) {
        modelsList = response;
      } else if (response?.data && Array.isArray(response.data)) {
        modelsList = response.data;
      } else if (response?.models && Array.isArray(response.models)) {
        modelsList = response.models;
      }
      
      console.log('Parsed models:', modelsList);
      setModels(modelsList);
    } catch (err) {
      setError(err.message);
      console.error('Failed to fetch models:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadModel = async (modelId) => {
    console.log('handleLoadModel called with:', modelId);
    setLoading(true);
    onLoading?.(true);
    try {
      await loadModel(modelId);
      console.log('Model loaded successfully, selecting:', modelId);
      onModelSelect(modelId);
      setError(null);
    } catch (err) {
      setError(`Failed to load model: ${err.message}`);
      console.error('Error loading model:', err);
    } finally {
      setLoading(false);
      onLoading?.(false);
    }
  };

  const handleDownloadModel = async (modelId) => {
    setDownloading(modelId);
    onLoading?.(true);
    try {
      const response = await downloadModel(modelId);
      const jobId = response.job_id;
      
      // Poll for download status
      const checkStatus = setInterval(async () => {
        try {
          const status = await checkDownloadStatus(jobId);
          if (status.status === 'completed') {
            clearInterval(checkStatus);
            setDownloading(null);
            await fetchModels();
            onLoading?.(false);
          }
        } catch (err) {
          console.error('Error checking download status:', err);
        }
      }, 2000);
    } catch (err) {
      setError(`Failed to download model: ${err.message}`);
      setDownloading(null);
      onLoading?.(false);
    }
  };

  const getModelId = (model) => {
    const id = model.key || model.id || model.identifier || '';
    console.log('getModelId for model:', model, 'returning:', id);
    return id;
  };
  const getModelName = (model) => model.display_name || model.name || model.key || 'Unknown';
  const isModelLoaded = (model) => {
    return Array.isArray(model.loaded_instances) && model.loaded_instances.length > 0;
  };
  const isLLMModel = (model) => model.type === 'llm';

  return (
    <div className="model-selector">
      <h2>Available Models</h2>
      
      {error && <div className="error-message">{error}</div>}
      
      <button 
        onClick={fetchModels} 
        disabled={loading}
        className="refresh-btn"
      >
        {loading ? 'Loading...' : 'Refresh Models'}
      </button>

      <div className="models-list">
        {models.length === 0 ? (
          <p className="no-models">{loading ? 'Loading models...' : 'No models available'}</p>
        ) : (
          <p className="models-count">Found {models.filter(m => isLLMModel(m)).length} LLM model(s)</p>
        )}
        {models.length === 0 ? null : (
          models
            .filter((model) => isLLMModel(model)) // Only show LLM models, not embeddings
            .map((model, idx) => (
            <div 
              key={getModelId(model) || idx} 
              className={`model-item ${selectedModel === getModelId(model) ? 'selected' : ''}`}
            >
              <div className="model-info">
                <h3>{getModelName(model)}</h3>
                <p className="model-id">{getModelId(model)}</p>
                {model.description && <p className="model-desc">{model.description}</p>}
                <div className="model-meta">
                  {model.params_string && <span>Parameters: {model.params_string}</span>}
                  {model.quantization && (
                    <span>
                      Quantization: {model.quantization.name} ({model.quantization.bits_per_weight} bits)
                    </span>
                  )}
                  {model.max_context_length && <span>Context: {model.max_context_length}</span>}
                  {model.publisher && <span>By: {model.publisher}</span>}
                </div>
              </div>
              
              <div className="model-actions">
                {isModelLoaded(model) ? (
                  <>
                    <span className="status-badge loaded">Loaded ✓</span>
                    <button 
                      onClick={() => handleLoadModel(getModelId(model))}
                      className="btn btn-select"
                    >
                      Select
                    </button>
                  </>
                ) : (
                  <button 
                    onClick={() => handleLoadModel(getModelId(model))}
                    disabled={loading}
                    className="btn btn-load"
                  >
                    {loading ? 'Loading...' : 'Load'}
                  </button>
                )}
                {selectedModel === getModelId(model) && (
                  <span className="status-badge selected-badge">✓ Using</span>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
