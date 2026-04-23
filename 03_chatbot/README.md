# LLM Chat Application

A React-based chat application that integrates with LM Studio's local LLM API.

## Features

- 🤖 **Model Selection** - Browse and load available models
- 💬 **Real-time Chat** - Send messages and receive responses from local LLMs
- ⚙️ **Adjustable Parameters** - Control temperature and other model settings
- 🔄 **Streaming Support** - Real-time response streaming
- 📥 **Model Management** - Download and load models directly from the app
- 🎨 **Beautiful UI** - Modern, responsive interface

## Prerequisites

- Node.js (v16+)
- npm or yarn
- LM Studio running locally with API enabled at `http://localhost:1234`

## Installation

1. Navigate to the project directory:
```bash
cd 03_chatbot
```

2. Install dependencies:
```bash
npm install
```

## Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

**Note:** During development, all API requests to `/api/v1` are automatically proxied to `http://localhost:1234` via Vite's dev server, which eliminates CORS issues.

## Build

Create a production build:
```bash
npm run build
```

## API Endpoints Used

The application integrates with these LM Studio API endpoints:

- `GET /api/v1/models` - List available models
- `POST /api/v1/chat` - Send a chat message
- `POST /api/v1/models/load` - Load a model
- `POST /api/v1/models/download` - Download a model
- `GET /api/v1/models/download/status/:job_id` - Check download progress

## Configuration

### API Base URL

**Development (with Vite proxy):**
- Requests to `/api/v1/*` are automatically proxied to `http://localhost:1234`
- No CORS issues - the dev server handles the requests

**Production (build):**
- Copy `.env.example` to `.env` and set `VITE_API_URL`
- Or keep the default: `http://localhost:1234/api/v1`

Example `.env` file:
```
VITE_API_URL=http://your-production-api:port/api/v1
```

### Proxy Configuration

The Vite dev server proxy is configured in `vite.config.js`:

```javascript
proxy: {
  '/api/v1': {
    target: 'http://localhost:1234',
    changeOrigin: true,
    rewrite: (path) => path
  }
}
```

## Usage

1. **Select a Model**: 
   - Models appear in the left sidebar
   - Click "Load" to load an available model
   - Or "Download" to fetch a new model

2. **Start Chatting**:
   - Select a loaded model
   - Type your message in the input field
   - Click "Send" or press Enter

3. **Adjust Settings**:
   - Use the Temperature slider to control creativity
   - Enable "Use Streaming" for real-time responses

## Project Structure

```
src/
├── components/
│   ├── ChatInterface.jsx      # Main chat component
│   ├── ChatInterface.css
│   ├── ModelSelector.jsx      # Model selection component
│   └── ModelSelector.css
├── services/
│   └── llmApi.js             # API integration
├── App.jsx                   # Main app component
├── App.css
├── main.jsx                  # Entry point
└── index.css                 # Global styles
```

## API Documentation

For detailed API documentation, visit:
https://lmstudio.ai/docs/developer/rest/chat

## Troubleshooting

### CORS Errors
- **During development:** The Vite proxy should handle all CORS issues automatically
- **Ensure:** You're running with `npm run dev` (not opening index.html directly)
- **Check:** LM Studio is running on `http://localhost:1234`
- **Verify:** Network tab in DevTools shows requests going to `/api/v1` (proxied), not `http://localhost:1234`

### Connection Refused
- Ensure LM Studio is running on `http://localhost:1234`
- Check if the API is enabled in LM Studio settings
- Make sure the dev server is running: `npm run dev`

### No Models Available
- Load a model in LM Studio first
- Click "Refresh Models" in the app
- Check LM Studio console for errors

### White Page / Not Loading
- Open browser DevTools (F12)
- Check Console tab for errors
- Check Network tab to see if API requests are failing
- Clear browser cache and restart dev server

## Technologies Used

- React 18.2
- Vite 5.0
- CSS3 with animations
- LM Studio REST API

## License

MIT

## Support

For issues with LM Studio API, visit: https://lmstudio.ai
