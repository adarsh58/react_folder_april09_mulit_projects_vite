import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider, useDispatch } from 'react-redux'
import store from './store'
import { loadState } from './utils/db'
import { setTodos } from './store/todoSlice'
import './index.css'
import App from './App.jsx'

const Root = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const hydrate = async () => {
      const persistedState = await loadState();
      if (persistedState && persistedState.todos) {
        dispatch(setTodos(persistedState.todos.list));
      }
    };
    hydrate();
  }, [dispatch]);

  return <App />;
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <Root />
    </Provider>
  </StrictMode>,
)
