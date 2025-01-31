import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function Dashboard() {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/expenses", { withCredentials: true })
      .then((res) => setExpenses(res.data));
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={expenses}>
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="amount" fill="#4f46e5" />
        </BarChart>
      </ResponsiveContainer>
      <Button
        className="mt-4"
        onClick={() => (window.location.href = "/add-expense")}
      >
        Add Expense
      </Button>
    </div>
  );
}

export default Dashboard;
