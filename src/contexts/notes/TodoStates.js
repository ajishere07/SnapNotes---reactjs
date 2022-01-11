import React, { useState } from "react";

import TodoContext from "./TodoContext";
import { db } from "../../configuration/firebaseConfig";
import { toast } from "react-toastify";
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  where,
  doc,
  deleteDoc,
} from "@firebase/firestore";

export const TodoStates = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const [checkedTodos, setCheckedTodos] = useState([]);
  //TODO : Firebase code
  const fetchTodos = async (requested_userId) => {
    const todosCollectionRef = collection(db, "todos");
    const queryObject = query(
      todosCollectionRef,
      where("userId", "==", `${requested_userId}`)
    );
    onSnapshot(queryObject, (snapshot) => {
      let todos = [];
      snapshot.docs.forEach((doc) => {
        todos.push({ ...doc.data(), id: doc.id });
      });
      setTodos(todos);
    });
    const checkTodosCollectionRef = collection(db, "checkTodos");
    const queryObjectForCheckTodos = query(
      checkTodosCollectionRef,
      where("userId", "==", `${requested_userId}`)
    );
    onSnapshot(queryObjectForCheckTodos, (snapshot) => {
      let checkTodos = [];
      snapshot.docs.forEach((doc) => {
        checkTodos.push({ ...doc.data(), id: doc.id });
      });
      setCheckedTodos(checkTodos);
    });
  };

  const addTodo = async (todo, id) => {
    //firebase database reference

    const todosCollectionRef = collection(db, "todos");

    await addDoc(todosCollectionRef, {
      userId: id,
      todo: todo,
    });

    toast.success("Task added");
  };

  const pushCheckedTodos = async (todo, id) => {
    const checkedTodoCollectionRef = collection(db, "checkTodos");
    await addDoc(checkedTodoCollectionRef, { userId: id, todo: todo });
    toast.success("Task completed");
  };

  const checkTodo = async (id) => {
    //user's selected note from the database
    const userTodo = doc(db, "todos", id);
    await deleteDoc(userTodo);
  };

  const pushUnCheckedTodos = async (todo, id) => {
    const unCheckedTodoCollectionRef = collection(db, "todos");
    await addDoc(unCheckedTodoCollectionRef, { userId: id, todo: todo });
    toast.warning("Task Unchecked");
  };

  const unCheckTodo = async (id) => {
    //user's selected note from the database
    const userCheckTodo = doc(db, "checkTodos", id);
    await deleteDoc(userCheckTodo);
  };
  return (
    <TodoContext.Provider
      value={{
        todos,
        setTodos,
        checkedTodos,
        setCheckedTodos,
        addTodo,
        fetchTodos,
        pushCheckedTodos,
        checkTodo,
        pushUnCheckedTodos,
        unCheckTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
