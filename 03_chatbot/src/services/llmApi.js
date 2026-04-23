// Use relative path so Vite proxy can intercept requests
const API_BASE_URL = '/api/v1';

// Detect if we're in development or production
const isDevelopment = import.meta.env.DEV;
const getApiUrl = () => {
  if (isDevelopment) {
    return API_BASE_URL;
  }
  // In production, use full URL if needed
  return import.meta.env.VITE_API_URL || 'http://localhost:1234/api/v1';
};

// Default headers for all requests - disable caching
const getDefaultHeaders = () => ({
  'Content-Type': 'application/json',
  'Cache-Control': 'no-cache, no-store, must-revalidate',
  'Pragma': 'no-cache',
  'Expires': '0',
});

/**
 * Fetch list of available models
 */
export const getModels = async () => {
  try {
    const response = await fetch(`${getApiUrl()}/models?t=${Date.now()}`, {
      method: 'GET',
      headers: getDefaultHeaders(),
    });
    if (!response.ok && response.status !== 304) {
      throw new Error(`Failed to fetch models: ${response.statusText}`);
    }
    // Handle 304 Not Modified or regular response
    if (response.status === 304 || response.headers.get('content-length') === '0') {
      // Return empty array or cached data
      return { data: [] };
    }
    const jsonData = await response.json();
    console.log('API Models Response:', jsonData);
    
    // Handle different response formats
    // LM Studio returns either an array directly or { data: [...] }
    if (Array.isArray(jsonData)) {
      return { data: jsonData };
    }
    return jsonData;
  } catch (error) {
    console.error('Error fetching models:', error);
    throw error;
  }
};

/**
 * Send a chat message to the model
 * @param {string} model - Model identifier (e.g., 'gpt-4', 'llama-2', etc.)
 * @param {string} message - Message to send
 * @param {Array} messageHistory - Previous messages for context
 * @param {Object} options - Additional options (temperature, max_tokens, etc.)
 */
export const sendChatMessage = async (
  model,
  message,
  messageHistory = [],
  options = {}
) => {
  try {
    const payload = {
      model,
      input: message,
      system_prompt: options.systemPrompt || 'You are a helpful assistant.',
      temperature: options.temperature !== undefined ? options.temperature : 0.7,
      top_p: options.top_p !== undefined ? options.top_p : 0.95,
      max_output_tokens: options.max_output_tokens || 1024,
      stream: options.stream || false,
      ...options,
    };

    const response = await fetch(`${getApiUrl()}/chat?t=${Date.now()}`, {
      method: 'POST',
      headers: getDefaultHeaders(),
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Failed to send message: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error sending chat message:', error);
    throw error;
  }
};

/**
 * Load a model
 * @param {string} model - Model identifier to load
 */
export const loadModel = async (model) => {
  try {
    const payload =
  typeof model === 'string'
    ? { model: model }
    : { model: model.key || model.id };

console.log('Loading model with payload:', payload);

const response = await fetch(`${getApiUrl()}/models/load?t=${Date.now()}`, {
  method: 'POST',
  headers: getDefaultHeaders(),
  body: JSON.stringify(payload),
});

    if (!response.ok) {
      throw new Error(`Failed to load model: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error loading model:', error);
    throw error;
  }
};

/**
 * Download a model
 * @param {string} model - Model identifier to download
 */
export const downloadModel = async (model) => {
  try {
    const response = await fetch(`${getApiUrl()}/models/download?t=${Date.now()}`, {
      method: 'POST',
      headers: getDefaultHeaders(),
      body: JSON.stringify({ model }),
    });

    if (!response.ok) {
      throw new Error(`Failed to download model: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error downloading model:', error);
    throw error;
  }
};

/**
 * Check download status
 * @param {string} jobId - Job ID from download response
 */
export const checkDownloadStatus = async (jobId) => {
  try {
    const response = await fetch(
      `${getApiUrl()}/models/download/status/${jobId}?t=${Date.now()}`
    );

    if (!response.ok) {
      throw new Error(`Failed to check download status: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error checking download status:', error);
    throw error;
  }
};

/**
 * Stream chat message (for real-time responses)
 * @param {string} model - Model identifier
 * @param {string} message - Message to send
 * @param {Function} onChunk - Callback for each chunk received
 * @param {Object} options - Additional options
 */
export const streamChatMessage = async (
  model,
  message,
  onChunk,
  options = {}
) => {
  try {
    const payload = {
      model,
      input: message,
      system_prompt: options.systemPrompt || 'You are a helpful assistant.',
      temperature: options.temperature !== undefined ? options.temperature : 0.7,
      top_p: options.top_p !== undefined ? options.top_p : 0.95,
      max_output_tokens: options.max_output_tokens || 1024,
      stream: true,
      ...options,
    };

    const response = await fetch(`${getApiUrl()}/chat?t=${Date.now()}`, {
      method: 'POST',
      headers: getDefaultHeaders(),
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Failed to stream message: ${response.statusText}`);
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value);
      onChunk(chunk);
    }
  } catch (error) {
    console.error('Error streaming chat message:', error);
    throw error;
  }
};
