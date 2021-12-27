import React, { useContext } from "react";
import NoteContext from "../contexts/notes/NoteContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function NoteItem({ title, desc, tag, id, updateNoteModal }) {
  const context = useContext(NoteContext);
  const { deleteNote } = context;
  return (
    <div className="col-md-3">
      <div className="card my-3">
        {/* <img src="..." classNameName="card-img-top" alt="..." /> */}
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{desc}</p>
          <i className="far fa-trash-alt mx-2" onClick={() => deleteNote(id)} />
          <i
            className="far fa-edit mx-2"
            onClick={() => updateNoteModal({ id, title, desc, tag })}
          />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
