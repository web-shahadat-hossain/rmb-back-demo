import { NextRequest, NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/dbConnect";
import User from "@/model/User";
import Transaction from "@/model/Transaction";

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    await connectMongoDB();

    const { userId, amount } = await req.json();

    // Validate input
    if (!userId || !amount) {
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

    // Ensure sufficient commission balance
    if (user.balance < amount) {
      return NextResponse.json(
        { message: "Insufficient commission balance" },
        { status: 400 },
      );
    }

    // Deduct the commission from the user's balance
    user.balance -= amount;
    await user.save();

    // Create a new transaction for commission payment
    const transaction = new Transaction({
      user_id: userId,
      type: "paid_commission",
      amount,
    });

    await transaction.save();

    // Return success response
    return NextResponse.json(
      {
        message: "Commission paid",
        commission_balance: user.balance,
      },
      { status: 200 },
    );
  } catch (error: unknown) {
    console.error("Error processing commission payment:", error);
    return NextResponse.json(
      {
        message: "Internal Server Error",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
