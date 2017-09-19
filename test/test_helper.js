const mongoose = require("mongoose");

// Use ES6 implementation of promises
mongoose.Promise = global.Promise;

// Using 'before' hook ensures connection is completely 'done' before starting tests
before((done) => {
  mongoose.connect("mongodb://localhost/users-demo", { useMongoClient: true});
  mongoose.connection
    // Event handlers:
    .once("open", () => { done(); })
    .on("error", () => {
      consolse.warn("Error", error);
    });
});

// The event handlers ('once' and 'on') ensure the database is connected before proceeding. "open" and "error" are outlined in the Mongoose documentation

// For testing, drop all db data before running the test, lest you test old data and don't get the desired accurate results. Since the db connection takes time to complete, need to include a 'done' callback (from mocha).
beforeEach((done) => {
  mongoose.connection.collections.users.drop(() => {
    // Callback function tells mocha when it's ok to run the next test
    done();
  });
});
