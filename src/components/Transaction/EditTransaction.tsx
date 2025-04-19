"use client";

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
import { Pencil, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { updateTransaction } from "@/redux/slice/TransactionSlice";

interface TransactionType {
  _id: string;
  amount: string;
  description: string;
  category: string;
  date: string;
}

const categories = [
  { id: 1, title: "Food" },
  { id: 2, title: "Transport" },
  { id: 3, title: "Shopping" },
  { id: 4, title: "Utilities" },
  { id: 5, title: "Health" },
  { id: 6, title: "Others" },
];

export default function EditTransaction({
  transaction,
}: {
  transaction: TransactionType;
}) {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const [formData, setFormData] = useState({
    amount: "",
    category: "",
    date: "",
    description: "",
  });

  const [errors, setErrors] = useState({
    amountError: "",
    categoryError: "",
    dateError: "",
    descriptionError: "",
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (transaction) {
      setFormData({
        amount: transaction.amount || "",
        category: transaction.category || "",
        date: transaction.date ? transaction.date.slice(0, 10) : "",
        description: transaction.description || "",
      });
    }
  }, [transaction]);

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.date || formData.date.trim().length == 0) {
      setErrors({ ...errors, dateError: "Date is required." });
      return;
    }

    if (!formData.amount || formData.amount.toString().trim().length == 0) {
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

    setLoading(true);

    try {
      const response = await axios.put(
        `/api/transactions/${transaction._id}`,
        formData
      );

      if (response.status == 200) {
        dispatch(updateTransaction(response?.data?.transaction));
        toast.success(response?.data?.success || 'successfully updated.');
        setOpen(false);
      } else {
        console.log("RESPONSE : ", response);
        toast.error(response?.data?.error || 'Error in updating.');
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to update transaction.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300"
        >
          <Pencil className="w-4 h-4" />
        </Button>
      </DialogTrigger>

      {!transaction._id ? (
        <DialogContent>
          <Loader2 />
        </DialogContent>
      ) : (
        <DialogContent className="sm:max-w-[550px] bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-xl shadow-xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold text-indigo-600 dark:text-indigo-400">
              Edit Transaction
            </DialogTitle>
            <DialogDescription className="text-sm text-gray-600 dark:text-gray-400">
              Make changes to this transaction and click save when you are done.
            </DialogDescription>
          </DialogHeader>

          <form
            onSubmit={handleEditSubmit}
            className="flex flex-col gap-5 mt-4"
          >
            {/* Date */}
            <div>
              <div className="flex justify-between">
                <Label htmlFor="date">Date</Label>
                <span className="text-red-500">{errors.dateError}</span>
              </div>
              <Input
                type="date"
                id="date"
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
              />
            </div>

            {/* Amount */}
            <div>
              <div className="flex justify-between">
                <Label htmlFor="amount">Amount</Label>
                <span className="text-red-500">{errors.amountError}</span>
              </div>
              <Input
                type="number"
                id="amount"
                value={formData.amount}
                onChange={(e) =>
                  setFormData({ ...formData, amount: e.target.value })
                }
              />
            </div>

            {/* Description */}
            <div>
              <div className="flex justify-between">
                <Label htmlFor="description">Description</Label>
                <span className="text-red-500">{errors.descriptionError}</span>
              </div>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
            </div>

            {/* Category */}
            <div>
              <div className="flex justify-between">
                <Label htmlFor="category">Category</Label>
                <span className="text-red-500">{errors.categoryError}</span>
              </div>
              <select
                id="category"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
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
                type="submit"
                disabled={loading}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 rounded-md transition-all hover:shadow-lg shadow-indigo-300 dark:shadow-indigo-800"
              >
                {loading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  "Save Changes"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      )}
    </Dialog>
  );
}
