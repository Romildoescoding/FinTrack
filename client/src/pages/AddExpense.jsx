import { useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function AddExpense() {
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(
      "http://localhost:5000/api/expenses",
      {
        category,
        amount,
        date,
      },
      { withCredentials: true }
    );
    window.location.href = "/dashboard";
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">Add Expense</h1>
      <form onSubmit={handleSubmit} className="space-y-4 w-80">
        <Input
          type="text"
          placeholder="Category"
          onChange={(e) => setCategory(e.target.value)}
        />
        <Input
          type="number"
          placeholder="Amount"
          onChange={(e) => setAmount(e.target.value)}
        />
        <Input
          type="date"
          placeholder="Date"
          onChange={(e) => setDate(e.target.value)}
        />
        <Button type="submit" className="w-full">
          Add
        </Button>
      </form>
    </div>
  );
}

export default AddExpense;
