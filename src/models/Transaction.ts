'use server';
import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      enum: ['Food', 'Transport', 'Shopping', 'Utilities', 'Health', 'Other'], // predefined
      default: 'Other',
    }
  },
  {
    timestamps: true,
  }
);

export const TransactionModel =
  mongoose.models.Transaction || mongoose.model("Transaction", transactionSchema);
