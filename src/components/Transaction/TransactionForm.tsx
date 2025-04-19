"use client";

import React, { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { addTransaction } from "@/redux/slice/TransactionSlice";

const categories = [
  { id: 1, title: "Food" },
  { id: 2, title: "Transport" },
  { id: 3, title: "Shopping" },
  { id: 4, title: "Utilities" },
  { id: 5, title: "Health" },
  { id: 6, title: "Others" },
];

export function TransactionForm() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    amount: "",
    category: "",
    date: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({
    amountError: "",
    categoryError: "",
    dateError: "",
    descriptionError: "",
  });

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!formData.date || formData.date.trim().length == 0) {
      setErrors({ ...errors, dateError: "Date is required." });
      return;
    }

    if (!formData.amount || formData.amount.trim().length == 0) {
      setErrors({ ...errors, amountError: "Amount is required." });
      return;
    }

    if (!formData.description || formData.description.trim().length == 0) {
      setErrors({ ...errors, descriptionError: "Description is required." });
      return;
    }

    if (!formData.category || formData.category.trim().length == 0) {
      setErrors({ ...errors, categoryError: "Category is required." });
      return;
    }

    // if everthing perfect then, call the api
    try {
      setLoading(true);
      const response = await axios.post("/api/transactions", {
        ...formData,
        date: formData.date.substring(0, 22),
      });

      if (response.status == 201) {
        console.log("Response Data : ", response.data);
        toast.success(
          response?.data?.success || "Transaction addedd successfully."
        );
        dispatch(addTransaction(response?.data?.newTransaction));
      } else {
        console.log("Response : ", response);
      }
    } catch (err) {
      console.log("Error : ", err);
    } finally {
      setLoading(false);
    }

    // reset form
    setFormData({
      amount: "",
      description: "",
      category: "",
      date: "",
    });
  }

  return (
    <Dialog>
      {/* Trigger Button Container */}
      <div className="w-[90vw] max-w-5xl bg-gradient-to-r from-indigo-100 via-blue-100 to-purple-100 dark:from-slate-800 dark:via-slate-900 dark:to-slate-800 p-5 rounded-xl mx-auto flex justify-end shadow-md mb-6">
        <DialogTrigger asChild>
          <Button
            variant="default"
            className="bg-indigo-600 text-white hover:bg-indigo-700 transition-all hover:shadow-lg shadow-indigo-300 dark:shadow-indigo-800"
          >
            + Add Transaction
          </Button>
        </DialogTrigger>
      </div>

      {/* Dialog Form */}
      <DialogContent className="sm:max-w-[550px] bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-xl shadow-xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-indigo-600 dark:text-indigo-400">
            Add New Transaction
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-600 dark:text-gray-400">
            Fill in the form below to record a transaction.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5 mt-4">
          {/* Date Field */}
          <div>
            <div className="flex flex-row justify-between">
              <Label htmlFor="date" className="text-sm font-medium">
                Date
              </Label>
              <span className="text-red-500 pr-1">{errors.dateError}</span>
            </div>
            <Input
              value={formData.date}
              onChange={(e) => {
                setFormData({ ...formData, date: e.target.value });
                setErrors({ ...errors, dateError: "" });
              }}
              name="date"
              type="date"
              id="date"
              className="mt-1 rounded-md focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Amount Field */}
          <div>
            <div className="flex flex-row justify-between">
              <Label htmlFor="amount" className="text-sm font-medium">
                Amount
              </Label>
              <span className="text-red-500 pr-1">{errors.amountError}</span>
            </div>
            <Input
              value={formData.amount}
              onChange={(e) => {
                setFormData({ ...formData, amount: e.target.value });
                setErrors({ ...errors, amountError: "" });
              }}
              name="amount"
              type="number"
              id="amount"
              placeholder="e.g., 199"
              className="mt-1 rounded-md focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Description Field */}
          <div>
            <div className="flex flex-row justify-between">
              <Label htmlFor="description" className="text-sm font-medium">
                Description
              </Label>
              <span className="text-red-500 pr-1">
                {errors.descriptionError}
              </span>
            </div>
            <Textarea
              value={formData.description}
              onChange={(e) => {
                setFormData({ ...formData, description: e.target.value });
                setErrors({ ...errors, descriptionError: "" });
              }}
              name="description"
              id="description"
              placeholder="e.g., Bought clothes"
              className="mt-1 rounded-md focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Category Field */}
          <div>
            <div className="flex flex-row justify-between">
              <Label htmlFor="date" className="text-sm font-medium">
                Category
              </Label>
              <span className="text-red-500 pr-1">{errors.categoryError}</span>
            </div>
            <select
              value={formData.category}
              onChange={(e) => {
                setFormData({ ...formData, category: e.target.value });
                setErrors({ ...errors, categoryError: "" });
              }}
              name="category"
              id="category"
              className="w-full border border-gray-300 dark:border-gray-700 rounded-md px-3 py-2 mt-1 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.title}>
                  {cat.title}
                </option>
              ))}
            </select>
          </div>

          {/* Submit Button */}
          <DialogFooter className="mt-4">
            <Button
              disabled={loading}
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 rounded-md transition-all hover:shadow-lg shadow-indigo-300 dark:shadow-indigo-800"
            >
              {loading ? <Loader2 /> : "Add Transaction"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
