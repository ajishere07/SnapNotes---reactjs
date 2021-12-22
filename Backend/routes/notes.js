const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator");
//route for fetching the notes data
router.get("/allnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Internal server error");
  }
});

//route for adding new note
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "title should be 7 characters").isLength({ min: 5 }),
    body("description", "description must be 10 characters ").isLength({
      min: 10,
    }),
  ],

  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNote = await note.save();
      res.json(note);
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Internal server error");
    }
  }
);

//updating the existing note
router.put(
  "/updatenote/:id",
  fetchuser,

  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      //new note obj
      const newUpdatedNote = {};
      if (title) {
        newUpdatedNote.title = title;
      }
      if (description) {
        newUpdatedNote.description = description;
      }
      if (tag) {
        newUpdatedNote.tag = tag;
      }

      //find the note to be updated in the database
      let note = await Note.findById(req.params.id);
      if (!note) {
        res.status(404).send("Not Found");
      }

      if (note.user.toString() !== req.user.id) {
        return res.status(402).send("Not Allowed");
      }

      note = await Note.findByIdAndUpdate(
        req.params.id,
        {
          $set: newUpdatedNote,
        },
        { new: true }
      );
      res.send(note);
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Internal server error");
    }
  }
);

//deleting the existing note
router.delete(
  "/deletenote/:id",
  fetchuser,

  async (req, res) => {
    try {
      const { title, description, tag } = req.body;

      //find the note to be updated in the database
      let note = await Note.findById(req.params.id);
      if (!note) {
        res.status(404).send("Not Found");
      }
      //allow deletion only if user owns this note
      if (note.user.toString() !== req.user.id) {
        return res.status(402).send("Not Allowed");
      }

      note = await Note.findByIdAndDelete(req.params.id);
      res.json({ Success: "The note has been deleted" });
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Internal server error");
    }
  }
);
module.exports = router;
