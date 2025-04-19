"use client";

import {
  PieChart,
  Pie,
  Tooltip,
  Cell,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface Transaction {
  amount: string;
  category: string;
}

interface Props {
  transactions: Transaction[];
}

const COLORS = [
  "#6366f1", // Indigo
  "#10b981", // Green
  "#f59e0b", // Amber
  "#ef4444", // Red
  "#3b82f6", // Blue
  "#a855f7", // Purple
];

export default function CategoryPieChart({ transactions }: Props) {
  const categoryTotals: Record<string, number> = {};

  transactions.forEach((tx) => {
    const category = tx.category || "Others";
    const amount = parseFloat(tx.amount);
    if (!isNaN(amount)) {
      categoryTotals[category] = (categoryTotals[category] || 0) + amount;
    }
  });

  const data = Object.entries(categoryTotals).map(([category, value]) => ({
    name: category,
    value,
  }));

  return (
    <div className="w-full h-96">
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
