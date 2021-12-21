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
module.exports = router;
