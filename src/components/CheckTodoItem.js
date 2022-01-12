import React, { useContext, useState } from "react";

import { AuthContext } from "../contexts/Auth";
import TodoContext from "../contexts/notes/TodoContext";
import { deleteDoc, doc } from "@firebase/firestore";
import { db } from "../configuration/firebaseConfig";
export const CheckTodoItem = ({ todo, id }) => {
  const { pushUnCheckedTodos, unCheckTodo } = useContext(TodoContext);
  const [, setInput] = useState("");
  const [checked, setChecked] = useState(true);

  const { userAuthenticated } = useContext(AuthContext);
  const isUnChecked = async (id) => {
    setChecked(!checked);
    if (checked === false) {
      // setTodos([...todos, { id, todo }]);
      pushUnCheckedTodos(todo, userAuthenticated.uid);
      // let newCheckTodo = await checkedTodos.filter((todo) => {
      //   return todo.id !== id;
      // });
      unCheckTodo(id);
      // await setCheckedTodos(newCheckTodo);
    }
  };
  const eraseTodo = async (id) => {
    const eraseTodoDoc = doc(db, "checkTodos", id);
    await deleteDoc(eraseTodoDoc);
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
            checked="true"
            onChange={() => isUnChecked(id)}
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
        <div className="d-flex flex-row justify-content-center align-items-center">
          <i
            className="far fa-trash-alt mx-2 align-middle"
            onClick={() => eraseTodo(id)}
          />
        </div>
      </div>
    </>
  );
};
