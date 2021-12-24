import React, { useContext, useState } from "react";
import NoteContext from "../contexts/notes/NoteContext";
function AddNewNote() {
  const context = useContext(NoteContext);
  const { addNote } = context;
  const [note, setNote] = useState({ title: "", description: "", tag: "" });
  const handleAddNote = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({ title: "", description: "", tag: "" });
  };
  const inputHandle = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <div className="container my-4">
      <h1>Add note</h1>
      <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title of the note
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            aria-describedby="emailHelp"
            value={note.title}
            onChange={inputHandle}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="desc" className="form-label">
            Description of the note
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            value={note.description}
            onChange={inputHandle}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
            Give a tag to your note e.g. Personal, College, Home
          </label>
          <input
            type="text"
            className="form-control"
            id="tag"
            name="tag"
            value={note.tag}
            onChange={inputHandle}
          />
        </div>

        <button
          disabled={note.title.length < 5 || note.description.length < 5}
          type="submit"
          className="btn btn-primary"
          onClick={handleAddNote}
        >
          Add note
        </button>
      </form>
    </div>
  );
}

export default AddNewNote;
