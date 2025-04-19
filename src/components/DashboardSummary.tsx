interface Transaction {
    _id : string;
    amount: string;
    category: string;
    date: string;
    description: string;
  }
  
  interface Props {
    transactions: Transaction[];
  }
  
  export default function DashboardSummary({ transactions }: Props) {
    const total = transactions.reduce((acc, tx) => acc + parseFloat(tx.amount), 0);
  
    const latestTransactions = [...transactions]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 5);
  
    return (
      <div className="space-y-6">
        {/* Summary cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-100 rounded-lg shadow">
            <h3 className="text-lg font-semibold">Total Expenses</h3>
            <p className="text-2xl font-bold">₹ {total.toFixed(2)}</p>
          </div>
  
          <div className="p-4 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 rounded-lg shadow">
            <h3 className="text-lg font-semibold">Categories Used</h3>
            <p className="text-2xl font-bold">
              {[...new Set(transactions.map((tx) => tx.category))].length}
            </p>
          </div>
  
          <div className="p-4 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-100 rounded-lg shadow">
            <h3 className="text-lg font-semibold">Transactions</h3>
            <p className="text-2xl font-bold">{transactions.length}</p>
          </div>
        </div>
  
        {/* Recent Transactions */}
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-4">
          <h3 className="text-lg font-bold mb-2">Recent Transactions</h3>
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {latestTransactions.map((tx, i) => (
              <li key={i} className="py-2 flex justify-between text-sm">
                <span className="font-medium text-gray-800 dark:text-gray-100">{tx.description}</span>
                <span className="text-gray-500 dark:text-gray-400">₹ {parseFloat(tx.amount).toFixed(2)}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
  