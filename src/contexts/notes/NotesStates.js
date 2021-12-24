import React, { useState } from "react";
import NoteContext from "./NoteContext";

const NotesStates = (props) => {
  const host = "http://localhost:5000";
  const notesData = [];
  //api call for get all notes
  const fetchNotes = async () => {
    const res = await fetch(`${host}/api/notes/allnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFjNDE3ODI3OGYxZTI4ZjhlMGNhOWJjIn0sImlhdCI6MTY0MDI0MTI2MH0.3HxO8-DohUQaXTOc0-lQyZOaFY8FY-LTsZF8sGY1gb4",
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
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFjNDE3ODI3OGYxZTI4ZjhlMGNhOWJjIn0sImlhdCI6MTY0MDI0MTI2MH0.3HxO8-DohUQaXTOc0-lQyZOaFY8FY-LTsZF8sGY1gb4",
      },
      body: JSON.stringify({ title, description, tag }),
    });

    console.log("adding new note");
    const note = {
      _id: "61c36a58c79e5ea68289244d9",
      user: "61c1e00c2b4f674c4a027634",
      title: title,
      description: description,
      tag: tag,
      date: "2021-12-22T18:11:40.401Z",
      __v: 0,
    };
    setNotes([...notes, note]);
  };
  //function for deleting a note
  const deleteNote = async (id) => {
    // api call
    const res = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFjNDE3ODI3OGYxZTI4ZjhlMGNhOWJjIn0sImlhdCI6MTY0MDI0MTI2MH0.3HxO8-DohUQaXTOc0-lQyZOaFY8FY-LTsZF8sGY1gb4",
      },
    });

    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };
  //function for editing a note
  const editNote = async (id, title, description, tag) => {
    // Api call
    const res = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFjNDE3ODI3OGYxZTI4ZjhlMGNhOWJjIn0sImlhdCI6MTY0MDI0MTI2MH0.3HxO8-DohUQaXTOc0-lQyZOaFY8FY-LTsZF8sGY1gb4",
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
    console.log(newNotesArr);
    setNotes(newNotesArr);
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
