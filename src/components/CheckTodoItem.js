import React, { useContext } from "react";
import { useState } from "react/cjs/react.development";
import { AuthContext } from "../contexts/Auth";
import TodoContext from "../contexts/notes/TodoContext";

export const CheckTodoItem = ({ todo, id }) => {
  const { checkedTodos, setCheckedTodos, pushUnCheckedTodos, unCheckTodo } =
    useContext(TodoContext);
  const [input, setInput] = useState("");
  const [checked, setChecked] = useState(true);
  const { todos, setTodos } = useContext(TodoContext);
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
      </div>
    </>
  );
};
