import useExpenseInsights from "@/hooks/useExpenseInsights";
import { Banknote, DollarSign, TrendingUp } from "lucide-react";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import Spinner from "./Spinner";

const Insights = () => {
  const { expenses, topSpend, totalExpense, growthRate, loading } =
    useExpenseInsights();
  return (
    <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
      {/* BAR GRAPH */}
      <div className=" w-[90vw] oveflow-x-scroll sm:w-[550px] h-fit flex">
        <div className="w-[500px] sm:w-[550px] p-4 bg-white border-2 rounded-xl">
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
                isAnimationActive={true} // Enable animation
                animationDuration={1000} // Set the duration for the animation (1000ms)
                animationEasing="ease-in-out" // Apply easing for smoothness
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="w-full max-w-[90vw] flex flex-col  items-start gap-4">
        <div className="p-4 rounded-md shadow-md bg-white w-full sm:w-[100%] border-t-[1px] border-zinc-100 flex gap-4 items-center">
          <span className="rounded-full bg-zinc-900 p-3">
            <DollarSign size={36} color="white" />
          </span>
          <span className="flex flex-col gap-1">
            <span className="text-zinc-700 text-sm">Total Expenses</span>
            <span className="text-zinc-900 uppercase text-2xl font-semibold">
              {!loading ? (
                `$${totalExpense?.toLocaleString("en-US")}`
              ) : (
                <Spinner height={24} width={24} />
              )}
            </span>
          </span>
        </div>

        <div className="p-4 rounded-md shadow-md bg-white w-full sm:w-[100%] border-t-[1px] border-zinc-100 flex gap-4 items-center">
          <span className="rounded-full bg-zinc-900 p-3">
            <Banknote size={36} color="white" />
          </span>
          <span className="flex flex-col gap-1">
            <span className="text-zinc-700 text-sm">Top Spends</span>
            <span className="text-zinc-900 text-2xl font-semibold">
              {!loading ? topSpend : <Spinner height={24} width={24} />}
            </span>
          </span>
        </div>

        <div className="p-4 rounded-md shadow-md bg-white w-full sm:w-[100%] border-t-[1px] border-zinc-100 flex gap-4 items-center">
          <span className="rounded-full bg-zinc-900 p-3">
            <TrendingUp size={36} color="white" />
          </span>
          <span className="flex flex-col gap-1">
            <span className="text-zinc-700 text-sm">Expense Growth Rate</span>
            <span className="text-zinc-900 uppercase text-2xl font-semibold">
              {!loading ? `${growthRate}%` : <Spinner height={24} width={24} />}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Insights;
