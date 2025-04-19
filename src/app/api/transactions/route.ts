"use server";
import { NextResponse } from "next/server";
import { TransactionModel } from "@/models/Transaction";
import { ConnectToDB } from "@/lib/mongodb";

// api to add Transaction
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { amount, date, category, description } = body;

    if (!amount || !date || !category || !description) {
      return NextResponse.json({ error: "Something is Missing." }, { status: 400 });
    }

    // connect to database
    ConnectToDB();

    const newTransaction = await TransactionModel.create({
      amount,
      description,
      category,
      date,
    });

    if (!newTransaction) {
      return NextResponse.json({ error: "Something went wrong." }, { status: 400 });
    }

    return NextResponse.json(
      { success: "Transaction successfully added.", newTransaction },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// fetch all transactions
export async function GET() {
  try {

    ConnectToDB();

    const transactions = await TransactionModel.find().sort({ date: -1 });

    if (transactions.length <= 0) {
     return NextResponse.json({ error: "No Transaction Found" }, { status: 404 });
    }

   return NextResponse.json(
      { success: "Transaction successfully fetched.", transactions },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Internal Server Error." }, { status: 500 });
  }
}

