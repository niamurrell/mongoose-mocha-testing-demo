const assert = require("assert");
const User = require("../src/user");

describe("Subdocuments", () => {
  it("can create a subdocument", (done) => {
    const joe = new User({
      name: "Joe",
      posts: [{ title: "Post Title" }]
    })

  // item.save() saves the document as well as any interior subdocuments
  joe.save()
    // No curly braces with this arrow function; it needs to RETURN the query result in order to .then take the next actions. With curly braces it will not return.
    .then(() => User.findOne({ name: "Joe" }))
    .then((user) => {
      assert(user.posts[0].title === "Post Title");
      done();
    });
  });

  it("can add subdocuments to an existing user", (done) => {
    const joe = new User({
      name: "Joe",
      posts: []
    });

    joe.save()
      .then(() => User.findOne({ name: "Joe" }))
      .then((user) => {
        user.posts.push({ title: "New Post" });
        return user.save();
      })
      .then(() => User.findOne({ name: "Joe" }))
      .then ((user) => {
        assert(user.posts[0].title === "New Post");
        done();
      })
  });

  it("removes a subdocument from an existing record", (done) => {
    const joe = new User({
      name: "Joe",
      posts: [{ title: "Existing Post" }]
    });

    joe.save()
      .then(() => User.findOne({ name: "Joe" }))
      .then((user) => {
        // FYI this .remove() does not update the record because it's removing a subdocument. .remove() only saves automatically when it's called on a parent record.
        user.posts[0].remove();
        return user.save();
      })
      .then(() => User.findOne({ name: "Joe" }))
      .then ((user) => {
        assert(user.posts.length === 0);
        done();
      })
  })
});
