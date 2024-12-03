import { connectMongoDB } from "@/lib/dbConnect";
import Transaction from "@/model/Transaction";
import User from "@/model/User";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    await connectMongoDB();

    const { userId, secondaryUserId, amount, purpose } = await req.json();

    // Validate request data
    if (!userId || !secondaryUserId || !amount) {
      return NextResponse.json(
        { message: "Invalid request data" },
        { status: 400 },
      );
    }

    // Fetch primary and secondary users
    const primaryUser = await User.findById(userId);
    const secondaryUser = await User.findById(secondaryUserId);

    if (!primaryUser || !secondaryUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Calculate profit and commission
    const profit = Number(amount) * 0.02;
    const commission = Number(profit) * 0.2;

    // Update balances
    primaryUser.balance += Number(profit) - Number(commission);
    secondaryUser.balance += Number(commission);

    await primaryUser.save();
    await secondaryUser.save();

    // Create a transaction
    const transaction = new Transaction({
      user_id: userId,
      type: "withdraw",
      amount,
      profit,
      commission,
      purpose,
    });

    await transaction.save();

    return NextResponse.json(
      {
        message: "Withdrawal successful",
        balance: primaryUser.balance,
      },
      { status: 200 },
    );
  } catch (error: unknown) {
    console.error("Error processing withdrawal:", error);
    return NextResponse.json(
      {
        message: "Internal Server Error",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}