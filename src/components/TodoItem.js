import React, { useContext, useState } from "react";
import { AuthContext } from "../contexts/Auth";

import TodoContext from "../contexts/notes/TodoContext";

export const TodoItem = ({ id, todo }) => {
  const {
    checkedTodos,
    setCheckedTodos,
    todos,
    setTodos,
    pushCheckedTodos,
    checkTodo,
  } = useContext(TodoContext);
  const { userAuthenticated } = useContext(AuthContext);
  const [input, setInput] = useState("");
  const [checked, setChecked] = useState(true);

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

  return (
    <>
      <div className="input-group mb-3">
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
          value={todo}
          onChange={(e) => setInput(e.target.value)}
        />
      </div>
    </>
  );
};
