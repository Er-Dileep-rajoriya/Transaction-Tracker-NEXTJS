import { NextResponse } from 'next/server';
import { BudgetModel } from '@/models/Budget';
import { ConnectToDB } from '@/lib/mongodb';

// POST: Save budgets
export async function POST(req: Request) {
  try {
    await ConnectToDB();

    const { month, year, budgets } = await req.json();

    if (!Array.isArray(budgets)) {
      return NextResponse.json({ error: 'Budgets should be an array' }, { status: 400 });
    }

    // Delete existing budgets for the same month/year
    await BudgetModel.deleteMany({ month, year });

    // Insert new budgets
    const createdBudgets = await BudgetModel.insertMany(
      budgets.map((b) => ({
        category: b.category,
        amount: b.amount,
        month,
        year,
      }))
    );

    return NextResponse.json(createdBudgets, { status: 201 });
  } catch (error) {
    console.error('POST /api/budget error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

// GET: Fetch budgets for a given month/year
export async function GET(req: Request) {
  try {
    await ConnectToDB();

    const { searchParams } = new URL(req.url);
    const month = parseInt(searchParams.get('month') || '');
    const year = parseInt(searchParams.get('year') || '');

    if (isNaN(month) || isNaN(year)) {
      return NextResponse.json({ error: 'Invalid month or year' }, { status: 400 });
    }

    const budgets = await BudgetModel.find({ month, year });

    return NextResponse.json(budgets, { status: 200 });
  } catch (error) {
    console.error('GET /api/budget error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
