import "./Todo.css";

import { useState, useRef } from "react";
import {
  deleteTodo,
  toggleTodo,
  updateTodo,
} from "../features/todos/todoSlice";
import { useDispatch } from "react-redux";

import { BiCheck } from "react-icons/bi";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { GiSaveArrow } from "react-icons/gi";
import { TiCancel } from "react-icons/ti";

type TodoProp = {
  todo: {
    id: number;
    task: string;
    completed: boolean;
  };
  darkMode: boolean;
};

export const Todo = (props: TodoProp) => {
  const [task, setTask] = useState(props.todo.task);
  const [editing, setEditing] = useState(false);
  const input = useRef<HTMLInputElement | null>(null);
  const dispatch = useDispatch();

  const onEdit = (e: any) => {
    e.preventDefault();

    setEditing(true);
    if (input.current) {
      input.current.focus();
    }
  };

  const stopEditing = (e: any) => {
    if (e) {
      e.preventDefault();
    }

    setEditing(false);
    setTask(props.todo.task);
  };

  const editTodo = (e: any) => {
    e.preventDefault();
    const payload = {
      id: props.todo.id,
      task: task,
      completed: props.todo.completed,
    };

    dispatch(updateTodo(payload));
    setEditing(false);
  };

  return (
    <li
      className={`todo ${props.darkMode ? "todo_dark" : "todo_light"}`}
      key={props.todo.id}
    >
      <div className="toggle_text">
        <button
          className={`toggle_btn ${
            props.darkMode ? "toggle_btn_dark" : "toggle_btn_light"
          }`}
          onClick={() => dispatch(toggleTodo(props.todo))}
          style={{
            backgroundImage: `${
              props.todo.completed ? "var(--CheckBackground)" : ""
            }`,
          }}
        >
          {props.todo.completed && <BiCheck />}
        </button>
        <input
          className={`${props.darkMode ? "dark" : "light"}`}
          style={{
            textDecoration: `${props.todo.completed ? "line-through" : ""}`,
            color: `${props.todo.completed ? "var(--DarkGrayishBlue2)" : ""}`,
          }}
          type="text"
          value={task}
          ref={input}
          readOnly={!editing}
          onChange={(e) => setTask(e.target.value)}
        />
      </div>

      <div className="actions">
        {editing ? (
          <>
            <button
              onClick={stopEditing}
              style={{ cursor: "pointer", color: "orangeRed" }}
            >
              <TiCancel />
            </button>
            <button
              onClick={editTodo}
              style={{
                margin: "0 0 0 16px",
                cursor: "pointer",
                color: "#05b905",
              }}
            >
              <GiSaveArrow />
            </button>
          </>
        ) : (
          <>
            <button
              onClick={onEdit}
              style={{ cursor: "pointer", color: "#65c1e6" }}
            >
              <MdEdit />
            </button>
            <button
              onClick={() => dispatch(deleteTodo(props.todo.id))}
              style={{ margin: "0 0 0 16px", cursor: "pointer", color: "red" }}
            >
              <MdDelete />
            </button>
          </>
        )}
      </div>
    </li>
  );
};
