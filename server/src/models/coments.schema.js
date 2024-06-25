import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    userId: mongoose.Schema.Types.ObjectId,
    postId: mongoose.Schema.Types.ObjectId,
    comment: {
      type: String,
      maxLength: [100, "Comment cannot exceed 100 characters"],
      trim: true,
    },
    content: {
      type: String,
      maxLength: [1000, "Content cannot exceed 1000 characters"],
      trim: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Comment", commentSchema);
