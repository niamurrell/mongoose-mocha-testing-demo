const assert = require("assert");
const User = require("../src/user");

describe("Remove/destroy a user", () => {
  let joe;

  beforeEach((done) => {
    joe = new User({ name: "Joe" });
    joe.save()
      .then(() => done());
  });

  it("removes a model instance", (done) => {
    // Chain promises so that you remove the user, when that's done search for the user, and when that's done run the test to see if the user exists
    joe.remove()
      .then(() => User.findOne({ name: "Joe" }))
      .then((user) => {
        assert(user === null);
        done();
      });
  });

  it("removes a class method", (done) => {
    // Remove a bunch of records with some given criteria
    User.remove({ name: "Joe" })
      .then(() => User.findOne({ name: "Joe" }))
      .then((user) => {
        assert(user === null);
        done();
      });
  });

  it("removes a class findOneAndRemove method", (done) => {
    User.findOneAndRemove({ name: "Joe" })
    .then(() => User.findOne({ name: "Joe" }))
    .then((user) => {
      assert(user === null);
      done();
    });
  })

  it("removes a class findByIdAndRemove method", (done) => {
    User.findByIdAndRemove(joe._id)
    .then(() => User.findOne({ name: "Joe" }))
    .then((user) => {
      assert(user === null);
      done();
    });
  })

});
