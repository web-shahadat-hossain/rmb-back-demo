import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  type: String, // deposit, withdraw, expense, add_balance, paid_commission
  amount: Number,
  purpose: String, // For expenses
  profit: Number,
  commission: Number,
  date: { type: Date, default: Date.now },
});

export default mongoose.models.Transaction ||
  mongoose.model("Transaction", TransactionSchema);
