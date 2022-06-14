import { useEffect, useState } from "react";
import "./App.css";

import { useAppDispatch, useAppSelector } from "./app/hooks";
import { createTodo, clearCompletedTodos } from "./features/todos/todoSlice";

import { Todo } from "./components/Todo";
import { MdLightMode } from "react-icons/md";
import { RiAddFill } from "react-icons/ri";
import { HiMoon } from "react-icons/hi";

type NewTodoType = {
  id: number;
  task: string;
  completed: boolean;
};

function App() {
  const todos = useAppSelector((state) => state.todos);

  const dispatch = useAppDispatch();
  const [task, setTask] = useState("");
  const [darkMode, setDarkMode] = useState(() => {
    const mode = localStorage.getItem("darkmode");
    if (mode) {
      return JSON.parse(mode);
    } else {
      return true;
    }
  });
  useEffect(() => {
    localStorage.setItem("darkmode", JSON.stringify(darkMode));
  }, [darkMode]);

  const activeTodos = todos.filter((todo) => todo.completed === false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const existingTask = todos.find((todo) => todo.task === task);

    if (task === "") {
      return;
    }
    if (task === existingTask?.task) {
      alert("This task already exists.");
      return;
    }
    const newTodo: NewTodoType = {
      id: Date.now(),
      task: task,
      completed: false,
    };
    dispatch(createTodo(newTodo));
    setTask("");
  };

  return (
    <div className={`App ${darkMode ? "dark" : "light"}`}>
      <div className="container">
        <header>
          <div className="box">
            <h1>TODO</h1>
            {darkMode ? (
              <MdLightMode onClick={() => setDarkMode(false)} />
            ) : (
              <HiMoon onClick={() => setDarkMode(true)} />
            )}
          </div>
          <form
            className={`${darkMode ? "dark_form" : "light_form"}`}
            onSubmit={handleSubmit}
          >
            <input
              className={`${darkMode ? "dark_text" : "light_text"}`}
              type="text"
              placeholder="Create a new todo..."
              value={task}
              onChange={(e) => setTask(e.target.value)}
            />
            <button>
              <RiAddFill />
            </button>
          </form>
        </header>
        <main className={`${darkMode ? "dark_main" : "light_main"}`}>
          <ul>
            {todos.map((todo) => (
              <Todo key={todo.id} todo={todo} darkMode={darkMode} />
            ))}
          </ul>
          <div
            className={`footer ${darkMode ? "dark_footer" : "light_footer"}`}
          >
            {!todos.length ? (
              <p>You have no todos.</p>
            ) : (
              <>
                <div className="todo_count">
                  {activeTodos.length} item(s) left
                </div>
                <div
                  className="clear_completed"
                  onClick={() => dispatch(clearCompletedTodos())}
                >
                  Clear Completed
                </div>
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
