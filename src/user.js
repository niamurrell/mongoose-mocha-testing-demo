const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const PostSchema = require("./post");

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
  // The following is an array of sub-documents, NOT a reference to another model
  posts: [PostSchema],
  likes: Number
});

// Add a virtual type to the model. This is a field that is updated and stored on the server, and is reliant on/a derivative of some aspect of the model. Must be created outside of the model. This uses ES6 getters & setters, i.e. no arrow functions!!
UserSchema.virtual("postCount").get(function() {
  return this.posts.length;
})

// User class/model representing the entire collection of users
const User = mongoose.model("user", UserSchema);

// Export class for app use
module.exports = User;
