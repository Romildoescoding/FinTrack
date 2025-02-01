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
import { useSearchParams } from "react-router-dom";
import {
  Banknote,
  ChartColumnIncreasing,
  Coins,
  DollarSign,
  TrendingUp,
} from "lucide-react";
import { DataTable } from "@/components/custom/DataTable";
import { columns } from "@/components/custom/Columns";

function Dashboard() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [expenses, setExpenses] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    // Extract the 'last' query parameter
    const last = searchParams.get("last");

    // Fetch expenses based on the filter
    axios
      .get(`http://localhost:5000/api/expenses?last=${last || 7}`, {
        withCredentials: true,
      })
      .then((res) => {
        // Group data by category
        const groupedData = res.data.reduce((acc, item) => {
          if (!acc[item.category]) {
            acc[item.category] = { category: item.category, amount: 0 };
          }
          acc[item.category].amount += Number(item.amount);
          return acc;
        }, {});

        setExpenses(Object.values(groupedData));

        // Set data for the table as well
        setData(res.data);
      });
  }, [searchParams]); // Trigger the effect when the search params change

  const updateFilter = (days) => {
    setSearchParams({ last: days });
  };

  return (
    <div className="p-8">
      <div className="w-full flex justify-between items-start">
        <h1 className="text-3xl font-bold mb-4">Dashboard</h1>

        {/* Filter Buttons */}
        <div className="bg-white rounded-lg shadow-md p-1 flex gap-1">
          {["7", "30", "90"].map((days) => (
            <button
              key={days}
              className="px-3 py-1 rounded-md transition-all"
              disabled={searchParams.get("last") === days}
              style={{
                background:
                  searchParams.get("last") === days ? "#18181b" : "#fafafa",
                color:
                  searchParams.get("last") === days ? "#fafafa" : "#090909",
                cursor:
                  searchParams.get("last") === days ? "not-allowed" : "pointer",
              }}
              onClick={() => updateFilter(days)}
              onMouseEnter={(e) => {
                e.target.style.background = "#18181b";
                e.target.style.color = "#fafafa";
              }}
              onMouseLeave={(e) => {
                if (searchParams.get("last") !== days) {
                  e.target.style.background = "#fafafa";
                  e.target.style.color = "#090909";
                }
              }}
            >
              Past {days} days
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-center gap-4 mt-8">
        {/* BAR GRAPH */}
        <div className="w-[550px] h-fit flex">
          <div className="w-[550px] p-4 bg-white border-2 rounded-xl">
            <h1 className="mb-4 font-bold text-xl">Category-wise expenses</h1>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={expenses}>
                <XAxis dataKey="category" fontSize={12} minTickGap={-200} />
                <YAxis />
                <Tooltip cursor={{ fill: "transparent" }} />
                <Bar
                  dataKey="amount"
                  fill="#232324"
                  radius={[8, 8, 0, 0]} // Rounded top bars
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* STATISTICS CARDS */}
        <div className="w-full flex flex-col items-end gap-4">
          {/* STATISTICS CARD */}
          <div className=" p-4 rounded-md shadow-md bg-white w-[90%] border-t-[1px] border-zinc-100 flex gap-4 items-center">
            <span className="rounded-full bg-zinc-900 p-3">
              <DollarSign size={36} color="white" />
            </span>
            <span className="flex flex-col gap-1">
              <span className=" text-zinc-700 text-sm ">Total Expenses</span>
              <span className=" text-zinc-900 uppercase text-2xl font-semibold">
                ${`${(12870).toLocaleString("en-US")}`}
              </span>
            </span>
          </div>

          <div className=" p-4 rounded-md shadow-md bg-white w-[90%] border-t-[1px] border-zinc-100 flex gap-4 items-center">
            <span className="rounded-full bg-zinc-900 p-3">
              <Banknote size={36} color="white" />
            </span>
            <span className="flex flex-col gap-1">
              <span className=" text-zinc-700 text-sm ">Top Spends</span>
              <span className=" text-zinc-900 text-2xl font-semibold">
                Travel
              </span>
            </span>
          </div>

          <div className=" p-4 rounded-md shadow-md bg-white w-[90%] border-t-[1px] border-zinc-100 flex gap-4 items-center">
            <span className="rounded-full bg-zinc-900 p-3">
              <TrendingUp size={36} color="white" />
            </span>
            <span className="flex flex-col gap-1">
              <span className=" text-zinc-700 text-sm ">
                Expense Growth Rate
              </span>
              <span className=" text-zinc-900 uppercase text-2xl font-semibold">
                6%
              </span>
            </span>
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div className="container mx-auto py-10">
        <DataTable
          data={data}
          columns={columns}
          pagination={true} // Enable pagination
          filters={true} // Enable filtering
        />
      </div>
    </div>
  );
}

export default Dashboard;
