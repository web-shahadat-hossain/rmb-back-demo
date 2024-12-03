import { connectMongoDB } from "@/lib/dbConnect";
import Transaction from "@/model/Transaction";
import { NextResponse } from "next/server";

// GET handler for fetching transactions
export async function GET(): Promise<NextResponse> {
  // Ensure database connection
  await connectMongoDB();

  try {
    // Fetch all transactions, sorted by date (newest first)
    const transactions = await Transaction.find().sort({ date: -1 });

    // Return the transactions as a JSON response
    return NextResponse.json(transactions, { status: 200 });
  } catch (error: unknown) {
    // Handle server errors
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    return NextResponse.json(
      { message: "Internal Server Error", error: errorMessage },
      { status: 500 },
    );
  }
}
