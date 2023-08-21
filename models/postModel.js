const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    title: String,
    body: String,
    device: String,
    no_of_comments: Number,
    userID: String,
    user: String
  },
  {
    versionKey: false,
  }
);

const PostModel = mongoose.model("post", userSchema);

module.exports = {
  PostModel,
};
