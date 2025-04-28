import { useSearchParams } from "react-router-dom";
import { DataTable } from "@/components/custom/DataTable";
import { columns } from "@/components/custom/Columns";
import Insights from "@/components/custom/Insights";
import useGeminiAI from "@/hooks/useGeminiAI";
import { useEffect, useState } from "react";
import useFetchExpenses from "@/hooks/useFetchExpenses";
import { SparklesIcon, WandSparkles } from "lucide-react";
import useGeminiTips from "@/hooks/useGeminiTips";
import Spinner from "@/components/custom/Spinner";

function Dashboard() {
  const [searchParams, setSearchParams] = useSearchParams();

  const updateFilter = (days) => {
    setSearchParams({ last: days });
  };
  const { data: expenses } = useFetchExpenses();
  const { fetchExpensesSummary, isSending } = useGeminiAI();
  const { fetchTips, isSending: isSending2 } = useGeminiTips();
  const [summary, setSummary] = useState("");
  const [tips, setTips] = useState("");

  useEffect(() => {
    if (expenses.length) {
      const getSummary = async () => {
        const res1 = await fetchExpensesSummary(expenses);
        const res2 = await fetchTips(expenses);
        setSummary(res1.candidates[0].content.parts[0].text);
        setTips(res2.candidates[0].content.parts[0].text);
      };
      getSummary();
    }
  }, [expenses, fetchTips, fetchExpensesSummary]);

  return (
    <div className="flex justify-center">
      <div className="p-2 sm:p-8 flex flex-col">
        <div className="flex flex-col gap-2 border mb-4 rounded-xl border-gray-300 p-4">
          <h1 className="text-3xl font-bold mb-4 flex gap-2 items-center">
            AI Summary
            <SparklesIcon size={28} />
          </h1>
          {isSending || isSending2 ? (
            <Spinner height={30} width={30} isWhite={false} />
          ) : (
            summary
          )}
        </div>
        <div className="flex flex-col gap-2 border mb-4 rounded-xl border-gray-300 p-4">
          <h1 className="text-3xl font-bold mb-4 flex gap-2 items-center">
            AI Suggestions
            <WandSparkles size={28} />
          </h1>

          {isSending || isSending2 ? (
            <Spinner height={30} width={30} isWhite={false} />
          ) : (
            tips
          )}
        </div>

        <div className="w-full flex flex-col sm:flex-row justify-between items-start">
          <h1
            className="text-3xl font-bold mb-4"
            // onClick={async () => {
            //   console.log("Inserting...");
            //   const res = await fetch(
            //     "http://localhost:5000/api/expenses/generateRandom",
            //     { credentials: "include" }
            //   );
            //   let data = await res.json();
            //   console.log(data);
            // }}
          >
            Dashboard
          </h1>
          <div className="bg-white rounded-lg shadow-md p-1 flex gap-1">
            {["7", "30", "90"].map((days) => (
              <button
                key={days}
                className=" px-[6px] sm:px-3 py-1 rounded-md transition-all"
                disabled={searchParams.get("last") === days}
                style={{
                  background:
                    searchParams.get("last") === days ? "#18181b" : "#fafafa",
                  color:
                    searchParams.get("last") === days ? "#fafafa" : "#090909",
                  cursor:
                    searchParams.get("last") === days
                      ? "not-allowed"
                      : "pointer",
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

        <Insights />

        <div className="container mx-auto py-10">
          <DataTable columns={columns} pagination={true} filters={true} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
