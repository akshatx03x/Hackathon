
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      minlength: [3, "Username must be at least 3 characters long."],
    },
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
    },
     googleId: {
      type: String, // store Google UID
      unique: true,
      sparse: true, // allow null for manual users
    },
    role: {
      type: String,
      enum: ["commutator", "driver", "admin"],
      default: "commutator",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
