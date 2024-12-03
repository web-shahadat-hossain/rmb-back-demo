import { NextRequest, NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/dbConnect";
import User from "@/model/User";
import Transaction from "@/model/Transaction";

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    await connectMongoDB();

    const { userId, amount, purpose } = await req.json();

    // Validate input
    if (!userId || !amount || !purpose) {
      return NextResponse.json(
        { message: "Invalid request data" },
        { status: 400 },
      );
    }

    // Fetch the user
    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Ensure sufficient balance
    if (user.balance < amount) {
      return NextResponse.json(
        { message: "Insufficient balance" },
        { status: 400 },
      );
    }

    // Deduct the amount from the user's balance
    user.balance -= amount;
    await user.save();

    // Create a new transaction
    const transaction = new Transaction({
      user_id: userId,
      type: "expense",
      amount,
      purpose,
    });

    await transaction.save();

    // Return success response
    return NextResponse.json(
      { message: "Expense recorded", balance: user.balance },
      { status: 200 },
    );
  } catch (error: unknown) {
    console.error("Error processing expense:", error);
    return NextResponse.json(
      {
        message: "Internal Server Error",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
