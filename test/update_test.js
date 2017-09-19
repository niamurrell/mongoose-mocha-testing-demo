const assert = require("assert");
const User = require("../src/user");

describe("updating records:", () => {
  let joe;

  beforeEach((done) => {
    joe = new User({ name: "Joe", postCount: 0 });
    joe.save()
      .then(() => done());
  });

  // Create a helper function to reduce code in the tests below (see delete_test.js for alt). The function does all of the 'then' functions after the inner operation.
  function assertName(operation, done) {
    operation
      // Query whole collection to ensure the change has been made properly. If you only look for Alex or Joe it won't be correct.
      .then(() => User.find({}))
      .then((users) => {
        assert(users.length === 1);
        assert(users[0].name = "Alex");
        done();
      });
  }

  it("instance type using 'set' and 'save'", (done) => {
    joe.set("name", "Alex");
    // Set only stages the change, to persist to database you must save as well.
    assertName(joe.save(), done);
  });

  it("model instance can update", (done) => {
    assertName(joe.update({ name: "Alex" }), done);
  });

  it ("A model class can update", (done) => {
    assertName(User.update({ name: "Joe" }, { name: "Alex" }), done);
  });

  it ("A model class can find one record and update", (done) => {
    assertName(User.findOneAndUpdate({ name: "Joe" }, { name: "Alex"}), done);
  });

  it ("A model class can find a record with an id and update", (done) => {
    assertName(User.findByIdAndUpdate(joe._id, { name: "Alex"}), done);
  });

  it ("A user can have their post count incremented by 1", (done) => {
    // Use MONGO UPDATE MODIFIER to increment value without pulling data from db: { }$increment: { which field: by how much } }
    User.update({ name: "Joe" }, { $inc: { postCount: 1 } })
      .then(() => User.findOne({ name: "Joe"}))
      .then((user) => {
        assert(user.postCount === 1);
        done();
      });
  });

});
