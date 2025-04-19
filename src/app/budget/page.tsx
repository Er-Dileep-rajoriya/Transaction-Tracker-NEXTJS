'use client';

import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import BudgetVsActualChart from '@/components/BudgetVsActualChart';
import Insights from '@/components/Insights';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { Button } from '@/components/ui/button';

type BudgetType = {
  category: string;
  amount: number;
};

const categories = ['Food', 'Transport', 'Shopping', 'Utilities', 'Health', 'Other'];

export default function BudgetPage() {
  const { transactions } = useSelector((state: RootState) => state.TransactionReducer);

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth(); // 0 = Jan
  const currentYear = currentDate.getFullYear();

  const [budgets, setBudgets] = useState<BudgetType[]>([]);
  const [loading, setLoading] = useState(false);

  // Load budgets on mount
  useEffect(() => {
    const fetchBudgets = async () => {
      try {
        const res = await fetch(`/api/budget?month=${currentMonth}&year=${currentYear}`);
        if (!res.ok) throw new Error('Failed to fetch');

        const data: BudgetType[] = await res.json();

        // Make sure all categories are represented
        const formatted: BudgetType[] = categories.map((cat) => {
          const match = data.find((b) => b.category === cat);
          return { category: cat, amount: match ? match.amount : 0 };
        });

        setBudgets(formatted);
      } catch {
        toast.error('Failed to load budgets');
      }
    };

    fetchBudgets();
  }, [currentMonth, currentYear]);

  // Update input value
  const updateAmount = (category: string, amount: number) => {
    setBudgets((prev) =>
      prev.map((b) => (b.category === category ? { ...b, amount } : b))
    );
  };

  // Save budgets to API
  const handleSave = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/budget', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ month: currentMonth, year: currentYear, budgets }),
      });

      if (res.ok) {
        toast.success('Budgets saved!');
      } else {
        toast.error('Something went wrong');
      }
    } catch {
      toast.error('Error saving budgets');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-8">
      <h1 className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 text-center">
        Monthly Budgeting
      </h1>

      {/* Budget Form */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-slate-700 max-w-3xl mx-auto">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Set Budgets</h2>
        <div className="space-y-4">
          {budgets.map((b) => (
            <div key={b.category} className="flex items-center justify-between">
              <label className="font-medium text-gray-700 dark:text-gray-200">{b.category}</label>
              <input
                type="number"
                placeholder="₹0.00"
                value={b.amount}
                onChange={(e) => updateAmount(b.category, parseFloat(e.target.value) || 0)}
                className="w-36 border border-gray-300 dark:border-gray-700 bg-white dark:bg-slate-900 px-3 py-2 rounded-md text-right focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          ))}
        </div>
        <Button
          onClick={handleSave}
          disabled={loading}
          className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold"
        >
          {loading ? 'Saving...' : 'Save Budgets'}
        </Button>
      </div>

      {/* Budget vs Actual + Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-md border border-gray-200 dark:border-slate-700">
          <h2 className="text-lg font-semibold mb-3 text-gray-700 dark:text-white">Budget vs Actual</h2>
          <BudgetVsActualChart budgets={budgets} transactions={transactions} />
        </div>

        <Insights budgets={budgets} transactions={transactions} />
      </div>
    </div>
  );
}
