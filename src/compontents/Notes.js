import React, { useContext } from "react";
import NoteContext from "../contexts/notes/NoteContext";
import NoteItem from "./NoteItem";

function Notes() {
  const context = useContext(NoteContext);
  const { notes, setNotes } = context;

  return (
    <div className="row my-3">
      <h1>Your notes</h1>
      {notes.map((note) => (
        <NoteItem
          key={note._id}
          title={note.title}
          desc={note.description}
          tag={note.tag}
        />
      ))}
    </div>
  );
}

export default Notes;
