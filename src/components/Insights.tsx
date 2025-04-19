interface Transaction {
    amount: string;
    category: string;
    date: string;
  }
  
  interface Budget {
    category: string;
    amount: number;
  }
  
  interface Props {
    transactions: Transaction[];
    budgets: Budget[];
  }
  
  export default function Insights({ transactions, budgets }: Props) {
    const totalSpent = transactions.reduce((sum, tx) => sum + parseFloat(tx.amount), 0);
    const totalBudget = budgets.reduce((sum, b) => sum + b.amount, 0);
    const overspentCategories = budgets.filter((b) => {
      const spent = transactions
        .filter((tx) => tx.category === b.category)
        .reduce((sum, tx) => sum + parseFloat(tx.amount), 0);
      return spent > b.amount;
    });
  
    return (
      <div className="p-4 bg-white dark:bg-slate-800 rounded-xl shadow space-y-4">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Spending Insights</h3>
        <p>Total Spent: <strong>₹{totalSpent.toFixed(2)}</strong></p>
        <p>Total Budget: <strong>₹{totalBudget.toFixed(2)}</strong></p>
  
        {overspentCategories.length > 0 ? (
          <div>
            <p className="text-red-500 font-medium">Overspent in:</p>
            <ul className="list-disc ml-6 text-red-600 dark:text-red-400">
              {overspentCategories.map((cat) => (
                <li key={cat.category}>{cat.category}</li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="text-green-500 font-medium">You are within all budgets. 🎉</p>
        )}
      </div>
    );
  }
  