const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define schema model
const UserSchema = new Schema({
  name: String,
  postCount: Number
});

// User class/model representing the entire collection of users
const User = mongoose.model("user", UserSchema);

// Export class for app use
module.exports = User;
