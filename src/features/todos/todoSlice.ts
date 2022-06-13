import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// types
type TodoType = {
  id: number;
  task: string;
  completed: boolean;
};

type InitialStateType = {
  todos: TodoType[];
};

// state
const initialState: InitialStateType = {
  todos: [],
};

// slice
const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    createTodo: (state, action: PayloadAction<TodoType>) => {
      state.todos = [action.payload, ...state.todos];
    },
    toggleTodo: (state, action: PayloadAction<TodoType>) => {
      const toUpdate = state.todos.find(
        (todo) => todo.id === action.payload.id
      );
      if (toUpdate) {
        toUpdate.completed = !toUpdate.completed;
      }
    },
    updateTodo: (state, action: PayloadAction<TodoType>) => {
      const toUpdate = state.todos.find(
        (todo) => todo.id === action.payload.id
      );
      if (toUpdate) {
        toUpdate.task = action.payload.task;
      }
    },
    deleteTodo: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    clearCompletedTodos: (state) => {
      state.todos = state.todos.filter((todo) => todo.completed === false);
    },
  },
});

export default todoSlice.reducer;
export const {
  createTodo,
  toggleTodo,
  updateTodo,
  deleteTodo,
  clearCompletedTodos,
} = todoSlice.actions;
