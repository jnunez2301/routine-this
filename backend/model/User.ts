import mongoose from "npm:mongoose";
import { Schema } from "npm:mongoose";

export interface iUser {
  username: string;
  createdAt: Date;
  password: string;
  secretAnswer: string;
}

const userSchema = new Schema<iUser>({
  username: {
    type: String,
    min: [2, "You must add at least 2 character"],
    max: [32, "Your name is too long, try something shorter"],
    unique: true,
    required: [true, "Please assign a username"],
  },
  createdAt: {
    type: Date,
    required: false,
    default: new Date(),
  },
  password: {
    type: String,
    required: [true, "Password field cannot be empty"],
  },
  secretAnswer: {
    type: String,
    required: [
      true,
      "Just in case you forget private info, we must add an answer",
    ],
    min: [1, "Answer has to be at least 1 character long"],
    max: [255, "Answer is too long"],
  },
});

export const User = mongoose.model("User", userSchema);
