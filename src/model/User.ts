import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  balance: { type: Number, default: 0 }, // Total balance
  commission_balance: { type: Number, default: 0 }, // Commission from profits
  transaction_history: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Transaction" },
  ],
});

// Avoid OverwriteModelError by checking if the model already exists
const User = mongoose.models.Users || mongoose.model("Users", UserSchema);

export default User;
