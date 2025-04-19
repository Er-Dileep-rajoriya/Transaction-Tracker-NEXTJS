"use client";

import CategoryPieChart from "@/components/CategoryPieChart";
import MonthlyExpensesChart from "@/components/MonthlyExpensesChart";
import { RootState } from "@/redux/store";
import { Loader2 } from "lucide-react";
import React from "react";
import { useSelector } from "react-redux";

export default function ChartPage() {
  const { transactions } = useSelector(
    (store: RootState) => store.TransactionReducer
  );

  if (!transactions || transactions.length === 0) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <Loader2 className="animate-spin w-8 h-8 text-indigo-500" />
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-8">
      <h1 className="text-2xl md:text-3xl font-bold text-center text-indigo-600 dark:text-indigo-400">
        Expense Overview
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Bar Chart */}
        <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-md border border-gray-200 dark:border-slate-700">
          <h2 className="text-lg font-semibold mb-2 text-gray-700 dark:text-gray-100">
            Monthly Expenses
          </h2>
          <MonthlyExpensesChart transactions={transactions} />
        </div>

        {/* Category Pie Chart */}
        <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-md border border-gray-200 dark:border-slate-700">
          <h2 className="text-lg font-semibold mb-2 text-gray-700 dark:text-gray-100">
            Category Breakdown
          </h2>
          <CategoryPieChart transactions={transactions} />
        </div>
      </div>
    </div>
  );
}
