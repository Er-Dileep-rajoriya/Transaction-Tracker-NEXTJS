"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { format } from "date-fns";
import { useTheme } from "next-themes";

interface Transaction {
  amount: string;
  date: string;
}

interface Props {
  transactions: Transaction[];
}

export default function MonthlyExpensesChart({ transactions }: Props) {
  const { theme } = useTheme();

  // Group by month and sum the amount
  const monthlyData: Record<string, number> = {};

  transactions.forEach((tx) => {
    const month = format(new Date(tx.date), "MMM yyyy"); 
    const amount = parseFloat(tx.amount);

    if (!isNaN(amount)) {
      monthlyData[month] = (monthlyData[month] || 0) + amount;
    }
  });

  // Convert to Recharts-friendly array and sort by date
  const chartData = Object.entries(monthlyData)
    .map(([month, total]) => ({ month, total }))
    .sort((a, b) => new Date(a.month).getTime() - new Date(b.month).getTime());

  return (
    <div className="w-full px-2 sm:px-4 md:px-6 lg:px-8 py-6">
      <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center text-indigo-600 dark:text-indigo-400">
        Monthly Expenses
      </h2>

      <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-md border border-gray-200 dark:border-slate-700">
        <ResponsiveContainer width="100%" height={350}>
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 20, left: 0, bottom: 20 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={theme === "dark" ? "#334155" : "#e2e8f0"}
            />
            <XAxis
              dataKey="month"
              stroke={theme === "dark" ? "#e2e8f0" : "#334155"}
              tick={{ fontSize: 12 }}
            />
            <YAxis
              stroke={theme === "dark" ? "#e2e8f0" : "#334155"}
              tick={{ fontSize: 12 }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: theme === "dark" ? "#1e293b" : "#ffffff",
                borderColor: theme === "dark" ? "#334155" : "#cbd5e1",
              }}
              labelStyle={{ fontWeight: "bold" }}
              cursor={{ fill: theme === "dark" ? "#334155" : "#e2e8f0" }}
            />
            <Bar
              dataKey="total"
              fill="#6366f1"
              radius={[8, 8, 0, 0]}
              barSize={40}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
