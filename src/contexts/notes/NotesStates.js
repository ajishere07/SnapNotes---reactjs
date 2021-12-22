import React, { useState } from "react";
import NoteContext from "./NoteContext";

const NotesStates = (props) => {
  const notesData = [
    {
      _id: "61c36a4879e5ea686289244d7",
      user: "61c1e00c2b4f674c4a027634",
      title: "react ",
      description: "the note is going to be deleted",
      tag: "personal",
      date: "2021-12-22T18:11:20.510Z",
      __v: 0,
    },
    {
      _id: "61c36a5c79e35ea68289244d9",
      user: "61c1e00c2b4f674c4a027634",
      title: "node ",
      description: "second note",
      tag: "personal",
      date: "2021-12-22T18:11:40.401Z",
      __v: 0,
    },
    {
      _id: "61c36a5c79e5e2a68289244d9",
      user: "61c1e00c2b4f674c4a027634",
      title: "node ",
      description: "second note",
      tag: "personal",
      date: "2021-12-22T18:11:40.401Z",
      __v: 0,
    },
    {
      _id: "61c36a5c79e54ea68289244d9",
      user: "61c1e00c2b4f674c4a027634",
      title: "node ",
      description: "second note",
      tag: "personal",
      date: "2021-12-22T18:11:40.401Z",
      __v: 0,
    },
    {
      _id: "61c36a5c79e1ea68289244d9",
      user: "61c1e00c2b4f674c4a027634",
      title: "node ",
      description: "second note",
      tag: "personal",
      date: "2021-12-22T18:11:40.401Z",
      __v: 0,
    },
    {
      _id: "61c36a5c79e45ea68289244d9",
      user: "61c1e00c2b4f674c4a027634",
      title: "node ",
      description: "second note",
      tag: "personal",
      date: "2021-12-22T18:11:40.401Z",
      __v: 0,
    },
    {
      _id: "61c36a58c79e5ea68289244d9",
      user: "61c1e00c2b4f674c4a027634",
      title: "node ",
      description: "second note",
      tag: "personal",
      date: "2021-12-22T18:11:40.401Z",
      __v: 0,
    },
  ];
  const [notes, setNotes] = useState(notesData);
  return (
    <NoteContext.Provider value={{ notes, setNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NotesStates;
