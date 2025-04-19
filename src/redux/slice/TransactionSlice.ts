import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Transaction {
  _id: string;
  amount: string;
  description: string;
  category: string;
  date: string;
}

interface TransactionState {
  transactions: Transaction[];
}

const initialState: TransactionState = {
  transactions: [],
};

const transactionSlice = createSlice({
  name: "Transaction",
  initialState,
  reducers: {
    setTransactions: (state, action: PayloadAction<Transaction[]>) => {
      state.transactions = action.payload;
    },
    addTransaction: (state, action: PayloadAction<Transaction>) => {
      state.transactions.unshift(action.payload);
    },
    deleteTransaction: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const results = state.transactions.filter((item) => item._id !== id);
      state.transactions = results;
    },
    updateTransaction : (state, action : PayloadAction<Transaction>) => {

      // find the transaction by id
      const id = action.payload._id;
      const index = state.transactions.findIndex((tx) => tx._id == id);

      if(index != -1)
      {
        state.transactions[index] = action.payload;
      }

    },
  },
});

export const { addTransaction, setTransactions, deleteTransaction, updateTransaction } =
  transactionSlice.actions;
export const TransactionReducer = transactionSlice.reducer;
