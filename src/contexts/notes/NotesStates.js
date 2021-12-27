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
  const [notes, setNotes] = useState([]);

  // FETCHING DATA FROM THE FIRESTORE DATABASE

  const fetchNotes = async (id) => {
    //firebase database reference

    const notesCollectionRef = collection(db, "notes");

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

  // FETCHING DATA FROM THE FIRESTORE DATABASE

  // ADD NEW NOTE METHOD TO DATABASE

  const addNote = async (title, description, tag, id) => {
    //firebase database reference

    const notesCollectionRef = collection(db, "notes");

    await addDoc(notesCollectionRef, {
      userId: id,
      title: title,
      description: description,
      tag: tag,
    });

    toast.success("Your Note has been added");
  };

  // ADD NEW NOTE METHOD TO DATABASE

  // DELETE A SELECTED NOTE FROM THE DATABASE METHOD

  const deleteNote = async (id) => {
    //user's selected note from the database
    const userNote = doc(db, "notes", id);
    await deleteDoc(userNote);
    toast.success("Note has deleted");
  };

  // DELETE A SELECTED NOTE FROM THE DATABASE METHOD

  // EDIT A SELECTED NOTE

  const editNote = async (id, title, description, tag) => {
    //user's selected note from the database
    const userNote = doc(db, "notes", id);
    const newUpdatedNote = {
      title,
      id,
      description,
      tag,
    };
    await updateDoc(userNote, newUpdatedNote);

    toast.success("Your Note has been edited");
  };

  // EDIT A SELECTED NOTE

  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, fetchNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NotesStates;
