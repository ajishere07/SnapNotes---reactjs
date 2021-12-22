import React from "react";
import NoteContext from "./NoteContext";

const NotesStates = (props) => {
  const state = {
    name: "anuj",
  };
  return (
    <NoteContext.Provider value={state}>{props.children}</NoteContext.Provider>
  );
};

export default NotesStates;
