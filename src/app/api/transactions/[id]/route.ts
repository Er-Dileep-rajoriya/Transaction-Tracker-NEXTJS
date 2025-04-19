'use server';

import { NextResponse, NextRequest } from 'next/server';
import { TransactionModel } from '@/models/Transaction';
import { ConnectToDB } from '@/lib/mongodb';

// DELETE /api/transactions/[id]
export async function DELETE(req: NextRequest) {
  try {
    const id = req.nextUrl.pathname.split('/').pop(); // Extract ID from URL

    if (!id) {
      return NextResponse.json({ error: 'Transaction ID is required.' }, { status: 400 });
    }

    await ConnectToDB();

    const transaction = await TransactionModel.findByIdAndDelete(id);

    if (transaction) {
      return NextResponse.json(
        { success: 'Transaction successfully deleted.' },
        { status: 200 }
      );
    }

    return NextResponse.json({ error: 'Transaction not found.' }, { status: 404 });
  } catch (error) {
    console.error('DELETE ERROR:', error);
    return NextResponse.json({ error: 'Internal Server Error.' }, { status: 500 });
  }
}

// PUT /api/transactions/[id]
export async function PUT(req: NextRequest) {
  try {
    const id = req.nextUrl.pathname.split('/').pop(); // Extract ID from URL
    const body = await req.json();
    const { amount, description, category, date } = body;

    if (!id) {
      return NextResponse.json({ error: 'Transaction ID is required.' }, { status: 400 });
    }

    await ConnectToDB();

    const transaction = await TransactionModel.findByIdAndUpdate(
      id,
      { amount, description, category, date },
      { new: true }
    );

    if (transaction) {
      return NextResponse.json(
        { success: 'Transaction successfully updated.', transaction },
        { status: 200 }
      );
    }

    return NextResponse.json({ error: 'Transaction not found.' }, { status: 404 });
  } catch (error) {
    console.error('PUT ERROR:', error);
    return NextResponse.json({ error: 'Internal Server Error.' }, { status: 500 });
  }
}
