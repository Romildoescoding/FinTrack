import { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

export default function useFetchExpenses() {
  const [searchParams] = useSearchParams();
  const [data, setData] = useState([]);
  const [totalCount, setTotalCount] = useState(0); // Store the total count of expenses
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchExpenseData() {
      const page = searchParams.get("page") || 1;
      const limit = searchParams.get("limit") || 10;
      setLoading(true);

      await axios
        .get(`http://localhost:5000/api/expenses?page=${page}&limit=${limit}`, {
          withCredentials: true,
        })
        .then((res) => {
          setData(res.data.expenses);
          setTotalCount(res.data.totalCount);
        })
        .finally(() => setLoading(false));
    }
    fetchExpenseData();
  }, [searchParams]);

  return { data, setData, totalCount, loading };
}
