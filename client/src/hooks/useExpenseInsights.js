import { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

export default function useExpenseInsights(last = 7) {
  const [searchParams] = useSearchParams();
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [topSpend, setTopSpend] = useState(null);
  const [growthRate, setGrowthRate] = useState(null);
  const [totalExpense, setTotalExpense] = useState(null);

  useEffect(() => {
    async function fetchExpenseData() {
      const days = searchParams.get("last") || 7;
      setLoading(true);

      try {
        const res = await axios.get(
          `http://localhost:5000/api/expenses/insights?last=${days}`,
          {
            withCredentials: true,
          }
        );
        console.log(res.data);
        const { expenses, totalExpenses, topSpend, growthRate } = res.data;
        console.log("INSIGHTSDATA IN THE HOOK");
        console.log(expenses);

        // Group expenses by category
        const groupedData = expenses.reduce((acc, item) => {
          if (!acc[item.category]) {
            acc[item.category] = { category: item.category, amount: 0 };
          }
          acc[item.category].amount += Number(item.amount);
          return acc;
        }, {});

        setTopSpend(topSpend);
        setGrowthRate(growthRate);
        setTotalExpense(totalExpenses);
        setExpenses(Object.values(groupedData));
      } catch (error) {
        console.error("Error fetching expenses:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchExpenseData();
  }, [searchParams]);

  return { expenses, topSpend, totalExpense, growthRate, loading };
}
