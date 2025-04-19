import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

interface Props {
  budgets: { category: string; amount: number }[];
  transactions: { category: string; amount: string }[];
}

export default function BudgetVsActualChart({ budgets, transactions }: Props) {
  const actuals: Record<string, number> = {};

  transactions.forEach((tx) => {
    const amt = parseFloat(tx.amount);
    if (!isNaN(amt)) {
      actuals[tx.category] = (actuals[tx.category] || 0) + amt;
    }
  });

  const data = budgets.map((b) => ({
    category: b.category,
    Budget: b.amount,
    Spent: actuals[b.category] || 0,
  }));

  return (
    <div className="w-full h-[400px]">
      <ResponsiveContainer>
        <BarChart data={data} margin={{ top: 20, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Budget" fill="#34d399" radius={[4, 4, 0, 0]} />
          <Bar dataKey="Spent" fill="#f97316" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
