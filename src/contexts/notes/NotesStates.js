import React, { useState } from "react";
import NoteContext from "./NoteContext";
import { toast } from "react-toastify";
import { db } from "../../configuration/firebaseConfig";
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  updateDoc,
  where,
  doc,
  deleteDoc,
} from "@firebase/firestore";
const NotesStates = (props) => {
  const host = "http://localhost:5000";
  const [notes, setNotes] = useState([]);

  //api call for get all notes
  const fetchNotes = async (id) => {
    const notesCollectionRef = collection(db, "notes");
    console.log(id);
    const queryObject = query(
      notesCollectionRef,
      where("userId", "==", `${id}`)
    );
    onSnapshot(queryObject, (snapshot) => {
      let notes = [];
      snapshot.docs.forEach((doc) => {
        notes.push({ ...doc.data(), id: doc.id });
      });
      setNotes(notes);
    });
  };
  //function for adding a note
  const addNote = async (title, description, tag, id) => {
    //firebase database reference
    const notesCollectionRef = collection(db, "notes");
    await addDoc(notesCollectionRef, {
      userId: id,
      title: title,
      description: description,
      tag: tag,
    });
    //todo api call
    // const res = await fetch(`${host}/api/notes/addnote`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     "auth-token": localStorage.getItem("token"),
    //   },
    //   body: JSON.stringify({ title, description, tag }),
    // });
    // const json = await res.json();
    // console.log(json);
    // if (json.errors) {
    //   toast.error("Something went wrong");
    //   return;
    // }
    // setNotes([...notes, json]);
    toast.success("Your Note has been added");
  };
  //function for deleting a note
  const deleteNote = async (id) => {
    // api call
    // const res = await fetch(`${host}/api/notes/deletenote/${id}`, {
    //   method: "DELETE",
    //   headers: {
    //     "Content-Type": "application/json",
    //     "auth-token": localStorage.getItem("token"),
    //   },
    // });
    // const json = await res.json();
    // console.log(json);
    // const newNotes = notes.filter((note) => {
    //   return note._id !== id;
    // });
    // if (json.errors) {
    //   toast.error("Something went wrong");
    //   return;
    // }
    // setNotes(newNotes);

    const userNote = doc(db, "notes", id);
    await deleteDoc(userNote);
    toast.success("Note has deleted");
  };
  //function for editing a note
  const editNote = async (id, title, description, tag) => {
    // Api call
    // const res = await fetch(`${host}/api/notes/updatenote/${id}`, {
    //   method: "PUT",
    //   headers: {
    //     "Content-Type": "application/json",
    //     "auth-token": localStorage.getItem("token"),
    //   },
    //   body: JSON.stringify({ title, description, tag }),
    // });
    const userNote = doc(db, "notes", id);
    const newUpdatedNote = {
      title,
      id,
      description,
      tag,
    };
    await updateDoc(userNote, newUpdatedNote);

    // let newNotesArr = JSON.parse(JSON.stringify(notes));
    // let index = 0;
    // while (index !== newNotesArr.length) {
    //   const note = newNotesArr[index];
    //   if (note._id === id) {
    //     newNotesArr[index].title = title;
    //     newNotesArr[index].description = description;
    //     newNotesArr[index].tag = tag;
    //     break;
    //   }
    //   index++;
    // }

    // setNotes(newNotesArr);
    toast.success("Your Note has been edited");
  };

  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, fetchNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NotesStates;
