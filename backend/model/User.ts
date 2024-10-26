import mongoose from "npm:mongoose";

enum UserRole {
  USER = "USER",
  TRAINER = "TRAINER",
  GUEST = "GUEST"
}
export type User = {
  _id: string;
  username: string;
  password: string;
  createdAt: Date;
  role: UserRole;
  age: number;
}

const userSchema = new mongoose.Schema<User>({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    maxlength: 16,
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  role: {
    type: String,
    enum: Object.values(UserRole),
    default: UserRole.GUEST
  },
  age: {
    type: Number,
    required: true
  }
})

const userModel = mongoose.model<User>("User", userSchema)

export default userModel;
