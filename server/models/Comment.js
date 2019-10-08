const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    authorID: [{ type: Schema.Types.ObjectId, ref: "User" }],
    text: String,
    assessment: { type: Number, min: 0, max: 5 }
  },
  {
    timestamps: true
  }
);

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;
