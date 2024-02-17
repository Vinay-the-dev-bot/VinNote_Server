const express = require("express");
const { auth } = require("../MiddleWare/auth.Middleware");
const { notesModel } = require("../Model/notesModel");
const notesRouter = express.Router();
const dotenv = require("dotenv").config();

// Adding a Note
notesRouter.post("/add", auth, async (req, res) => {
  const note = new notesModel({ ...req.body });
  await note.save();
  res.send({ msg: "NOTE ADDED" });
});

// Reading a Note
notesRouter.get("/", auth, async (req, res) => {
  const note = await notesModel.find({ userId: req.body.userId });
  res.send(note);
});

notesRouter.get("/:noteId", async (req, res) => {
  const note = await notesModel.findOne({ _id: req.params.noteId });
  res.send({ msg: "Note Edited", note });
});

// Editing a Note
notesRouter.patch("/:noteId", auth, async (req, res) => {
  const note = await notesModel.findOne({ _id: req.params.noteId });
  if (note.userId == req.body.userId) {
    await notesModel.findByIdAndUpdate({ _id: req.params.noteId }, req.body);
    res.send({ msg: "Note Edited" });
  } else {
    res.send({ msg: "NOT AUTHORIZED" });
  }
});

// Deleting a Note
notesRouter.delete("/:noteId", auth, async (req, res) => {
  const note = await notesModel.findOne({ _id: req.params.noteId });
  if (note) {
    if (note.userId == req.body.userId) {
      await notesModel.findByIdAndDelete({ _id: req.params.noteId });
      res.send({ msg: "Note Deleted" });
    } else {
      res.send({ msg: "NOT AUTHORIZED" });
    }
  } else {
    res.send({ msg: "NOTE NOT FOUND" });
  }
});

module.exports = { notesRouter };
