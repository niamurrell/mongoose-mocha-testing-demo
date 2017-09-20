const assert = require("assert");
const User = require("../src/user");

describe("Validating records:", () => {
  it("requires a user name", () => {
    // Create a new user without a name
    const user = new User({ name: undefined });

    // Validate (don't save) the user that's created. ValidateSync (not validate() ) is synchronus i.e. it will return information immediately about the validation
    const validationResult = user.validateSync();

    // To access the resulting error message if fails validation:
    // const message = validationResult.errors.name.message, ES6 equivalient:
    const { message } = validationResult.errors.name;

    // Make an assertion about the error message
    assert(message === "Name is required.")
  });

  it("requires a user name longer than 2 characters", () => {
    const user = new User({ name: "Al" });
    const validationResult = user.validateSync();
    const { message } = validationResult.errors.name;
    assert(message === "Name must be longer than 2 characters.")
  });

  it("disallows invalid records from being saved to db", (done) => {
    const user = new User({ name: "Al" });
    user.save()
      .catch((validationResult) => {
        const { message } = validationResult.errors.name;
        assert(message === "Name must be longer than 2 characters.");
        done();
      })
  })

});
