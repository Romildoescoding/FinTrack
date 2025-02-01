import { useSearchParams } from "react-router-dom";
import { DataTable } from "@/components/custom/DataTable";
import { columns } from "@/components/custom/Columns";
import Insights from "@/components/custom/Insights";

function Dashboard() {
  const [searchParams, setSearchParams] = useSearchParams();

  const updateFilter = (days) => {
    setSearchParams({ last: days });
  };

  return (
    <div className="flex justify-center">
      <div className="p-2 sm:p-8 flex flex-col">
        <div className="w-full flex flex-col sm:flex-row justify-between items-start">
          <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
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
