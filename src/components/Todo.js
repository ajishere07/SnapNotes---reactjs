import React, { useContext, useEffect, useState } from "react";
import { TodoItem } from "./TodoItem";
import { ToastContainer } from "react-toastify";
import TodoContext from "../contexts/notes/TodoContext";

import { CheckTodoItem } from "./CheckTodoItem";
import { AuthContext } from "../contexts/Auth";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router";
export const Todo = () => {
  const navigate = useNavigate();
  const [inputData, setInputData] = useState("");
  const { checkedTodos } = useContext(TodoContext);
  const { todos, addTodo, fetchTodos } = useContext(TodoContext);

  const { userAuthenticated } = useContext(AuthContext);
  useEffect(() => {
    if (userAuthenticated) {
      fetchTodos(userAuthenticated.uid);
    } else {
      navigate("/login");
    }
  }, []);
  console.log(todos);
  return (
    <div className="container pt-5">
      <h1 className="mb-5">Add Your Tasks For Today</h1>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="add Todo, e.g.'Meditate for 15 mins'"
          aria-label="Recipient's username"
          value={inputData}
          aria-describedby="button-addon2"
          onChange={(e) => setInputData(e.target.value)}
        />
        <button
          className="btn btn-outline-secondary"
          type="button"
          id="button-addon2"
          onClick={() => {
            addTodo(inputData, userAuthenticated.uid);
            setInputData("");
          }}
        >
          Add
        </button>
      </div>
      {checkedTodos.length !== 0 ? (
        <h5 className="bg-success text-white text-uppercase px-3 position-relative">
          completed tasks{" "}
        </h5>
      ) : (
        <h1></h1>
      )}

      {checkedTodos.length !== 0 ? (
        checkedTodos.map((item) => (
          <CheckTodoItem key={item.id} id={item.id} todo={item.todo} />
        ))
      ) : (
        <p className="text-muted"></p>
      )}

      <h5 className="bg-primary text-white text-uppercase px-3">Tasks</h5>

      {todos.length !== 0 ? (
        todos.map((item) => (
          <TodoItem key={item.id} id={item.id} todo={item.todo} />
        ))
      ) : (
        <h2 className="text-muted">No Tasks!</h2>
      )}
      <ToastContainer />
    </div>
  );
};
