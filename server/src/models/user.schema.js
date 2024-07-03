import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: ["true", "Fullname is required"],
      maxLength: [15, "Name cannot exceed 15 characters"],
      trim: true,
    },
    username: {
      type: String,
      required: ["true", "Username is required"],
      unique: true,
      trim: true,
      maxLength: [10, "Username cannot exceed 10 characters"],
    },
    email: {
      type: String,
      required: ["true", "Email is required"],
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: ["true", "Password is required"],
      minLength: [6, "Password must be atleast 6 characters long"],
      select: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
