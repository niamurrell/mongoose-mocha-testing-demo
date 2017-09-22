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
  // The following is an array of subdocuments, NOT a reference to another model
  posts: [PostSchema],
  // A number can be incremented or otherwise manipulated using update modifiers (see update_test)
  likes: Number,
  // Here we add blogPosts (not posts) to illustrate the difference btwn subdocuments and references
  blogPosts: [{
    type: Schema.Types.ObjectId,
    ref: "blogPost"
  }]
});

// Add a virtual type to the model. This is a field that is updated and stored on the server, and is reliant on/a derivative of some aspect of the model. Must be created outside of the model. This uses ES6 getters & setters, i.e. no arrow functions!!
UserSchema.virtual("postCount").get(function() {
  return this.posts.length;
})

// User model middleware. Uses 'this' so no arrow functions
UserSchema.pre("remove", function(next) {
  // Add the mongoose model instead of requiring at the top to avoid cyclical references
  const BlogPost = mongoose.model("blogPost");
  // User query operator to find all the ids in the BlogPost collection; if the id is IN this user's array of ids, remove it
  BlogPost.remove({ _id: { $in: this.blogPosts } })
    // Call next to let asynchronus code when it's time to start the next function
    .then(() => next());
});

// User class/model representing the entire collection of users
const User = mongoose.model("user", UserSchema);

// Export class for app use
module.exports = User;
