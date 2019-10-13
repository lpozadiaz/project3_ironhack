const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    authorId: [{ type: Schema.Types.ObjectId, ref: "User" }],
    text: String
  },
  {
    timestamps: true
  }
);

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;
