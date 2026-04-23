import { createSlice } from '@reduxjs/toolkit';

const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    list: [],
    loading: false
  },
  reducers: {
    setTodos: (state, action) => {
      state.list = action.payload;
    },
    addTodo: (state, action) => {
      state.list.push({ id: Date.now(), text: action.payload, completed: false });
    },
    toggleTodo: (state, action) => {
      const todo = state.list.find(t => t.id === action.payload);
      if (todo) todo.completed = !todo.completed;
    },
    removeTodo: (state, action) => {
      state.list = state.list.filter(t => t.id !== action.payload);
    }
  }
});

export const { setTodos, addTodo, toggleTodo, removeTodo } = todoSlice.actions;
export default todoSlice.reducer;
