import React from "react";
import { TransactionForm } from "@/components/Transaction/TransactionForm";
import TransactionList from "@/components/Transaction/TransactionList";

function HomePage() {
  return (
    <div className="mt-20">
     <TransactionForm />
     <TransactionList />
    </div>
  );
}

export default HomePage;
