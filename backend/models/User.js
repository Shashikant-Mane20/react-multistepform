const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  avatar: {
    type: String,
    default: "",  // Provide a default value
  },
  name: {
    type: String,
    required: true,
  },
  designation: {
    type: String,
    required: true,
  },
  file: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("User", userSchema);
