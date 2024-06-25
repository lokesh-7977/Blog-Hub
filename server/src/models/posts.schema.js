import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    userId: mongoose.Schema.Types.ObjectId,
    title: {
      type: String,
      required: [true, "Title is required"],
      maxLength: [100, "Title cannot exceed 100 characters"],
      trim: true,
    },
    content: {
      type: String,
      required: [true, "Content is required"],
      maxLength: [1000, "Content cannot exceed 1000 characters"],
      trim: true,
    },
    image: {
      type: String,
      required: [true, "Image is required"],
      trim: true,
    },
    likes: {
      type: Number,
      default: 0,
    },
    comments: [
      {
        userId: mongoose.Schema.Types.ObjectId,
        comment: {
          type: String,
          required: [true, "Comment is required"],
          maxLength: [100, "Comment cannot exceed 100 characters"],
          trim: true,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Post", postSchema);
