import React, { useContext, useEffect, useRef, useState } from "react";
import NoteContext from "../contexts/notes/NoteContext";
import NoteItem from "./NoteItem";
import AddNewNote from "./AddNewNote";

function Notes() {
  const context = useContext(NoteContext);
  const { notes, fetchNotes, editNote } = context;
  const [note, setNote] = useState({
    eid: "",
    etitle: "",
    edescription: "",
    etag: "",
  });
  useEffect(() => {
    fetchNotes();
  }, []);
  const updateNoteModal = (currentNote) => {
    ref.current.click();
    setNote({
      eid: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.desc,
      etag: currentNote.tag,
    });
  };
  console.log(note.eid);

  const handleEdit = (e) => {
    e.preventDefault();
    editNote(note.eid, note.etitle, note.edescription, note.etag);
    refClose.current.click();
  };
  const inputHandle = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  const ref = useRef(null);
  const refClose = useRef(null);

  return (
    <>
      <AddNewNote />

      <button
        type="button"
        style={{ display: "none" }}
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        ref={ref}
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <form className="mx-4">
              <div className="mb-3 ">
                <label htmlFor="title" className="form-label">
                  Title of the note
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="etitle"
                  name="etitle"
                  aria-describedby="emailHelp"
                  value={note.etitle}
                  onChange={inputHandle}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="edescription" className="form-label">
                  Description of the note
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={note.edescription}
                  id="edescription"
                  name="edescription"
                  onChange={inputHandle}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="etag" className="form-label">
                  Give a tag to your note e.g. Personal, College, Home
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={note.etag}
                  id="etag"
                  name="etag"
                  onChange={inputHandle}
                />
              </div>
            </form>
            <div className="modal-footer">
              <button
                ref={refClose}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleEdit}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
      <h1>Your notes</h1>
      <div className="row my-3">
        {notes.map((note) => (
          <NoteItem
            key={note._id}
            _id={note._id}
            title={note.title}
            desc={note.description}
            tag={note.tag}
            updateNoteModal={updateNoteModal}
          />
        ))}
      </div>
    </>
  );
}

export default Notes;
