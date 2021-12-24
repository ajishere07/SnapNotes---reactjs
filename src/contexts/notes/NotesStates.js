import React, { useState } from "react";
import NoteContext from "./NoteContext";
import { toast } from "react-toastify";

const NotesStates = (props) => {
  const host = "http://localhost:5000";
  const notesData = [];
  //api call for get all notes
  const fetchNotes = async () => {
    const res = await fetch(`${host}/api/notes/allnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem(`token`),
      },
    });
    const notesData = await res.json();
    console.log(notesData);
    setNotes(notesData);
  };
  //function for adding a note
  const addNote = async (title, description, tag) => {
    //todo api call
    const res = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await res.json();
    console.log(json);
    if (json.errors) {
      toast.error("Something went wrong");
      return;
    }
    setNotes([...notes, json]);
    toast.success("Your Note has been added");
  };
  //function for deleting a note
  const deleteNote = async (id) => {
    // api call
    const res = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await res.json();
    console.log(json);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    if (json.errors) {
      toast.error("Something went wrong");
      return;
    }
    setNotes(newNotes);
    toast.success("Note has deleted");
  };
  //function for editing a note
  const editNote = async (id, title, description, tag) => {
    // Api call
    const res = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });

    let newNotesArr = JSON.parse(JSON.stringify(notes));
    let index = 0;
    while (index !== newNotesArr.length) {
      const note = newNotesArr[index];
      if (note._id === id) {
        newNotesArr[index].title = title;
        newNotesArr[index].description = description;
        newNotesArr[index].tag = tag;
        break;
      }
      index++;
    }

    setNotes(newNotesArr);
    toast.success("Your Note has been edited");
  };
  const [notes, setNotes] = useState(notesData);
  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, fetchNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NotesStates;
