const mongoose = require("mongoose");

const notesSchema = mongoose.Schema(
  {
    title: { type: String, require: true },
    body: { type: String, require: true },
    userId: { type: String, require: true },
    author: { type: String, require: true },
  },
  { versionKey: false }
);

const notesModel = mongoose.model("notes", notesSchema);

module.exports = { notesModel };

// {
//   "title": "TItle 1",
//   "body": "Body 1",
// }
