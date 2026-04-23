import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './todoSlice';
import { saveState, loadState } from '../utils/db';

const store = configureStore({
  reducer: {
    todos: todoReducer,
  },
});

// Subscribe to store changes to persist state
store.subscribe(() => {
  saveState(store.getState());
});

export default store;
