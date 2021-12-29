import React, { useContext, useEffect, useRef, useState } from "react";
import NoteContext from "../contexts/notes/NoteContext";
import NoteItem from "./NoteItem";
import AddNewNote from "./AddNewNote";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router";
import { AuthContext } from "../contexts/Auth";

function Notes() {
  const navigate = useNavigate();

  //contexts

  const { notes, fetchNotes, editNote } = useContext(NoteContext);
  const { userAuthenticated } = useContext(AuthContext);

  //contexts

  const [note, setNote] = useState({
    eid: "",
    etitle: "",
    edescription: "",
    etag: "",
  });
  useEffect(() => {
    //if user is not authenticated will redirect to login page

    if (userAuthenticated) {
      //the fetchNotes is in NotesStates
      fetchNotes(userAuthenticated.uid);
    } else {
      navigate("/login");
    }
  }, []);
  const updateNoteModal = (currentNote) => {
    ref.current.click();
    setNote({
      eid: currentNote.id,
      etitle: currentNote.title,
      edescription: currentNote.desc,
      etag: currentNote.tag,
    });
  };

  const handleEdit = (e) => {
    e.preventDefault();
    console.log(note.eid);
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
                  minLength={5}
                  required
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
                  minLength={5}
                  required
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
                  minLength={5}
                  required
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
                disabled={
                  note.etitle.length < 5 || note.edescription.length < 5
                }
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
      <div className="row my-4">
        {notes.length === 0 ? (
          <h3>No notes; Add note for your tasks, ideas, assigments</h3>
        ) : (
          notes.map((note) => (
            <NoteItem
              key={note.id}
              id={note.id}
              title={note.title}
              desc={note.description}
              tag={note.tag}
              updateNoteModal={updateNoteModal}
            />
          ))
        )}
      </div>
      <ToastContainer />
    </>
  );
}

export default Notes;
