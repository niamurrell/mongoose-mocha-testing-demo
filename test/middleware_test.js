const assert = require("assert");
const mongoose = require("mongoose");
const User = require("../src/user");
const BlogPost = require("../src/blogPost");

describe("Middleware:", () => {
  let joe, blogPost;
  beforeEach((done) => {
    joe = new User({ name: "Joe" });
    blogPost = new BlogPost({ title: "JS is hard", content: "But it's ok, you'll get there" });

    joe.blogPosts.push(blogPost);

    Promise.all([joe.save(), blogPost.save()])
      .then(() => done());
  });

  it("on user remove, clean up dangling blogposts", (done) => {
    joe.remove()
      // Count function is asynchronus, it checks the database and takes time to return a result, so requires .then
      .then(() => BlogPost.count())
        .then((count) => {
          assert(count === 0);
          done();
        });
  });
});
