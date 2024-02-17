const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
  },
  { versionKey: false }
);

const userModel = mongoose.model("notesUsers", userSchema);

module.exports = { userModel };

// {
//   "email": "Vinay.meti2024@gma.com",
//   "password": "Vinaymeti@123",
//   "username":"Vinay"
// }
