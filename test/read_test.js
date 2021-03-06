const assert = require("assert");
const User = require("../src/user");

describe("Reading users out of the database", () => {
  // Declare joe variable first so that's available to both functions below
  let joe;

  // Add a user first to ensure it's there and available to run the test
  beforeEach((done) => {
    joe = new User({ name: "Joe" });
    alex = new User({ name: "Alex" });
    maria = new User({ name: "Maria" });
    zach = new User({ name: "Zach" });
    Promise.all([alex.save(), joe.save(), maria.save(), zach.save()])
      .then(() => done());
  })

  it("finds all users with the name of joe", (done) => {
    User.find({ name: "Joe" })
      .then((users) => {
        assert(users[0]._id.toString() === joe._id.toString());
        done();
      })
  });

  it("finds a user with a particular id", (done) => {
    User.findOne({ _id: joe._id })
      .then((user) => {
        assert(user.name === "Joe");
        done();
      })
  })

  it("can skip & limit the results set", (done) => {
    User.find({})
      .sort({ name: -1 })
      .skip(1)
      .limit(2)
      .then((users) => {
        assert(users[0].name === "Maria");
        assert(users[1].name === "Joe");
        assert(users.length === 2);
        done();
      })
  });
});

// !! .toString() is required (line 18) because MongoDB stores ids as ObjectId's rather than strings, regardless of command line output
