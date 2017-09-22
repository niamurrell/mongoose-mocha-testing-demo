const assert = require("assert");
const mongoose = require("mongoose");
const User = require("../src/user");
const Comment = require("../src/comment");
const BlogPost = require("../src/blogPost");

// Capitalization reminder!!: Uppercase indicates the model, lowercase indicates an instance of the model

describe("Associations:", () => {
  let joe, blogPost, comment;
  beforeEach((done) => {
    joe = new User({ name: "Joe" });
    blogPost = new BlogPost({ title: "JS is hard", content: "But it's ok, you'll get there" });
    comment = new Comment({ content: "Yeah you'll get the hang of it!"});

    // Once the data has been set, identify it as necessary with references
    joe.blogPosts.push(blogPost);
    blogPost.comments.push(comment);
    comment.user = joe; // 1-to-1 assignment, so no push()

    // Save all fields so they persist to the database. Use Promise from the ES6 specification to ensure all the saves happen before moving on to the next step
    Promise.all([joe.save(), blogPost.save(), comment.save()])
      .then(() => done());
  });

  it("saves a relation between a user and a blogPost", (done) => {
    User.findOne({ name: "Joe" })
      .populate("blogPosts")
      .then((user) => {
        assert(user.blogPosts[0].title === "JS is hard");
        done();
      });
  });

  it("saves a full relation graph", (done) => {
    User.findOne({ name: "Joe" })
      .populate({
        path: "blogPosts",
        populate: {
          path: "comments",
          model: "comment",
          populate: {
            path: "user",
            model: "user"
          }
        }
      })
      .then((user) => {
        assert(user.name === "Joe");
        assert(user.blogPosts[0].title === "JS is hard");
        assert(user.blogPosts[0].comments[0].content === "Yeah you'll get the hang of it!");
        assert(user.blogPosts[0].comments[0].user.name === "Joe");
        done();
      });
    });
});
