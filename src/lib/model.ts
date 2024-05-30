import mongoose, { Schema, models } from "mongoose";

const userSchema = new Schema(
  {
    role: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    contactNo: {
      type: String,
    },
    address: {
      type: String,
    },
  },
  { timestamps: true },
);

const User = models.Users || mongoose.model("Users", userSchema);
export default User;
