"use client";

import React, { useEffect, useState } from "react";
import { Loader2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import axios from "axios";
import {
  deleteTransaction,
  setTransactions,
} from "@/redux/slice/TransactionSlice";
import { toast } from "sonner";
import EditTransaction from "./EditTransaction";



// const transactions = [
//   {
//     id: 1,
//     date: "2025-04-18",
//     amount: 120,
//     description: "Groceries from Walmart",
//     category: "Food",
//   },
//   {
//     id: 2,
//     date: "2025-04-17",
//     amount: 75,
//     description: "Uber Ride",
//     category: "Transport",
//   },
//   {
//     id: 3,
//     date: "2025-04-16",
//     amount: 250,
//     description: "New headphones",
//     category: "Shopping",
//   },
//   {
//     id: 4,
//     date: "2025-04-15",
//     amount: 300,
//     description: "Electricity Bill",
//     category: "Utilities",
//   },
//   {
//     id: 5,
//     date: "2025-04-14",
//     amount: 90,
//     description: "Doctor Visit",
//     category: "Health",
//   },
// ];

const itemsPerPage = 4;

function TransactionList() {
  const { transactions } = useSelector(
    (store: RootState) => store.TransactionReducer
  );
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = transactions.slice(startIndex, endIndex);

  const totalPages = Math.ceil(transactions.length / itemsPerPage);

  // get all transactions
  useEffect(() => {
    async function fetchTransactions() {
      try {
        const response = await axios.get("/api/transactions");

        if (response.status == 200) {
          dispatch(setTransactions(response?.data?.transactions));
        }
      } catch (err) {
        console.log("Error in Fetch Transactions : ", err);
      }
    }

    fetchTransactions();
  }, [dispatch]);

  async function handleDeleteTransaction(id: string) {
    const flag = window.confirm("Are You sure, want to delete this?");

    if (!flag) return;

    try {
      const res = await axios.delete(`/api/transactions/${id}`);

      if (res.status == 200) {
        dispatch(deleteTransaction(id));
        toast.success(res.data?.success || "Transaction deleted successfully.");
      }
    } catch (err) {
      console.log("Error in deleting transaction.", err);
    }
  }

  if (transactions.length <= 0) {
    return (
      <div className="h-20 w-full justify-center items-center">
        <Loader2 />
      </div>
    );
  }

  return (
    <div className="w-[90vw] max-w-5xl mx-auto bg-white dark:bg-gray-900 mt-8 rounded-xl shadow-lg overflow-hidden">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
          Recent Transactions
        </h2>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto text-sm text-gray-700 dark:text-gray-200">
          <thead className="bg-indigo-100 dark:bg-indigo-950 text-left text-sm uppercase tracking-wider">
            <tr>
              <th className="px-6 py-3">Date</th>
              <th className="px-6 py-3">Amount</th>
              <th className="px-6 py-3">Description</th>
              <th className="px-6 py-3">Category</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {paginatedData.map((tx, index) => (
              <tr
                key={index}
                className="hover:bg-indigo-50 dark:hover:bg-gray-800 transition-all"
              >
                <td className="px-6 py-4">{tx.date.substring(0, 10)}</td>
                <td className="px-6 py-4">${tx.amount}</td>
                <td className="px-6 py-4">{tx.description}</td>
                <td className="px-6 py-4">
                  <span className="inline-block px-2 py-1 text-xs rounded-full bg-indigo-200 text-indigo-800 dark:bg-indigo-800 dark:text-white">
                    {tx.category}
                  </span>
                </td>
                <td className="px-6 py-4 flex justify-end gap-2">
                  <EditTransaction transaction={tx}/>
                  <Button
                    onClick={() => handleDeleteTransaction(tx._id)}
                    variant="ghost"
                    size="icon"
                    className="text-red-500 hover:text-red-700 dark:hover:text-red-400"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination className="p-4">
          <PaginationContent className="flex justify-end">
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                className={
                  currentPage === 1 ? "pointer-events-none opacity-50" : ""
                }
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                className={
                  currentPage === totalPages
                    ? "pointer-events-none opacity-50"
                    : ""
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}

export default TransactionList;
