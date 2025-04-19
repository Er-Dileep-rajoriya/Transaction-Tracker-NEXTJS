'use server';
import mongoose from 'mongoose';

const budgetSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true,
        enum: ['Food', 'Transport', 'Shopping', 'Utilities', 'Health', 'Other'],
    },
    month: {
        type: Number, // 0 = Jan, 11 = Dec
        required: true,
    },
    year: {
        type: Number,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    }
}, {
    timestamps: true,
});

export const BudgetModel =
  mongoose.models.Budget || mongoose.model('Budget', budgetSchema);