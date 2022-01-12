import { collection, deleteDoc, doc, updateDoc } from "@firebase/firestore";
import React, { useContext, useState, useEffect } from "react";
import { db } from "../configuration/firebaseConfig";
import { AuthContext } from "../contexts/Auth";

import TodoContext from "../contexts/notes/TodoContext";

export const TodoItem = ({ id, todo }) => {
  const { pushCheckedTodos, checkTodo } = useContext(TodoContext);
  const { userAuthenticated } = useContext(AuthContext);
  const [input, setInput] = useState(todo);
  const [checked, setChecked] = useState(true);
  const [updateBtnShow, setUpdateBtnShow] = useState(false);

  const eraseTodo = async (id) => {
    const eraseTodoDoc = doc(db, "todos", id);
    await deleteDoc(eraseTodoDoc);
  };

  const reWriteTodo = async (todo_id_to_update, input) => {
    const todoToUpdate = doc(db, "todos", todo_id_to_update);
    const newReWrittedTodo = {
      todo: input,
    };
    await updateDoc(todoToUpdate, newReWrittedTodo);
    setUpdateBtnShow(false);
  };
  const isChecked = async (id_to_delete_todo) => {
    setChecked(!checked);
    if (checked === true) {
      // setCheckedTodos([...checkedTodos, { id: id_to_delete_todo, todo }]);
      pushCheckedTodos(todo, userAuthenticated.uid);
      // let newTodos = await todos.filter((todo) => {
      //   return todo.id !== id_to_delete_todo;
      // });
      checkTodo(id_to_delete_todo);
      // setTodos(newTodos);
    }
  };
  useEffect(() => {
    if (input === todo) {
      setUpdateBtnShow(false);
      return;
    }
    setUpdateBtnShow(true);
  }, [input]);
  return (
    <>
      <div className="input-group mb-3 position-relative">
        <div className="input-group-text">
          <input
            className="form-check-input mt-0"
            id="tasksCheck"
            name="tasksCheck"
            type="checkbox"
            onChange={() => {
              isChecked(id);
            }}
            aria-label="Checkbox for following text input"
          />
        </div>
        <input
          type="text"
          className="form-control"
          aria-label="Text input with checkbox"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <div className="d-flex flex-row justify-content-center align-items-center">
          <i
            className="far fa-trash-alt mx-2 align-middle"
            onClick={() => eraseTodo(id)}
          />
          {updateBtnShow ? (
            <button
              type="button"
              class="btn btn-success"
              onClick={() => reWriteTodo(id, input)}
            >
              Done <i class="fas fa-check mx-2"></i>
            </button>
          ) : (
            <button
              type="button"
              class="btn btn-success d-none"
              onClick={() => reWriteTodo(id, input)}
            >
              none <i class="fas fa-check mx-2"></i>
            </button>
          )}
        </div>
      </div>
    </>
  );
};
