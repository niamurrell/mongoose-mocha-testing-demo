const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define schema model
const UserSchema = new Schema({
  name: {
    type: String,
    validate: {
      validator: (name) => name.length > 2,
      message: "Name must be longer than 2 characters."
    },
    // For validations set boolean & frontend-friendly error message:
    required: [true, "Name is required."]
  },
  postCount: Number
});

// User class/model representing the entire collection of users
const User = mongoose.model("user", UserSchema);

// Export class for app use
module.exports = User;
