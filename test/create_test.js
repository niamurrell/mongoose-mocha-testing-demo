// 'Describe' and 'it' are constructs of Mocha

// Each 'it' contains something to test, and must contain assertions, which are what you actually test

// To run tests need to add 'mocha' command to "scripts" in package.json

// Assert comes with Mocha and must be included in all test files.
const assert = require("assert");

// Add the User class from the model
const User = require("../src/user");

describe("Creating records", () => {
  it("saves a user", (done) => {
    // First create the new document info following the model
    const joe = new User({ name: "Joe"});

    // Then add & save it to the database. Since the save function will take time, use promises to go on to the next action once complete.
    joe.save()
    .then(() => {
      // Test whether joe has been saved successfully
      assert(!joe.isNew);
      done();
    })
  });
});

// isNew is TRUE when the instance is loaded into Mocha but not yet saved to Mongoose. Once it's saved, isNew becomes FALSE. Always insert a truthy value for isNew for the testing to be accurate.
