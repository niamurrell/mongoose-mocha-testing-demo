const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: String
});

module.exports = PostSchema;

// Note: no model is created since this is for subdocuments of the user model. Module.export is for use in other .js files.
