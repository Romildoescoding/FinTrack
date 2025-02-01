import React, { useState, useEffect } from "react";
import { Input } from "../ui/input";
import { Ellipsis, Pen, Trash2 } from "lucide-react";
import TableRow from "./TableRow";
import useFetchExpenses from "@/hooks/useFetchExpenses";
import { useSearchParams } from "react-router-dom";
import Spinner from "./Spinner";

export function DataTable({ pagination = true, filters = true }) {
  const { data, setData, totalCount, loading } = useFetchExpenses();
  const [filteredData, setFilteredData] = useState(data);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  // Update filteredData whenever data, search, or pagination changes
  useEffect(() => {
    let updatedData = [...data];

    // Apply search filter
    if (search.trim() !== "") {
      updatedData = updatedData.filter((row) =>
        Object.values(row).some((val) =>
          String(val).toLowerCase().includes(search.toLowerCase())
        )
      );
    }

    // Apply pagination
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;

    setFilteredData(updatedData.slice(startIndex, endIndex));
  }, [data, search, currentPage, rowsPerPage]);

  useEffect(() => {
    setFilteredData(data);
    console.log(data);
  }, [data, setData]);

  useEffect(() => {
    searchParams.set("page", currentPage);
    searchParams.set("limit", rowsPerPage);
    setSearchParams(searchParams);
  }, [currentPage, rowsPerPage, searchParams, setSearchParams]);

  const totalPages = Math.ceil(totalCount / rowsPerPage); // Use totalCount to calculate total pages

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  // Handle deleting an expense
  const handleDeleteExpense = (id) => {
    setData((prev) => prev.filter((expense) => expense._id !== id));
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="bg-white shadow-lg border-t-[1px] border-zinc-100 rounded-lg px-2 py-6 sm:p-6">
      {/* Search Filter */}
      <h1 className="text-2xl font-bold">All Expenses</h1>
      {filters && (
        <div className="flex items-center space-x-2 sm:gap-8 py-4 flex-col gap-2 sm:flex-row">
          <label htmlFor="filter" className="text-sm font-medium">
            Filter by Amount, Date or Categories :
          </label>
          <Input
            type="text"
            id="filter"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-64"
          />
        </div>
      )}

      {/* Table */}
      <div className="rounded-md shadow-sm max-w-[85vw] overflow-x-scroll border bg-gray-50">
        <table className="min-w-full table-auto min-h-[574px]">
          <thead className="bg-zinc-900 text-zinc-50 uppercase">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className=" relative">
            {filteredData.length > 0 ? (
              filteredData.map((entry, index) => (
                <TableRow
                  key={index}
                  entry={entry}
                  onDelete={handleDeleteExpense}
                />
              ))
            ) : loading ? (
              <div className=" fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-2  flex justify-center items-center">
                <Spinner height={24} width={24} />
              </div>
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-4 text-gray-500">
                  No results found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagination && (
        <div className="flex flex-col gap-2 sm:gap-0 sm:flex-row items-center justify-between py-4">
          <div className="text-sm text-gray-500">
            Showing{" "}
            <span className="font-bold">
              {(currentPage - 1) * rowsPerPage + 1}
            </span>{" "}
            to{" "}
            <span className="font-bold">
              {Math.min(currentPage * rowsPerPage, totalCount)}
            </span>{" "}
            of <span className="font-bold">{totalCount}</span> entries
          </div>
          <div className="flex space-x-2">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="px-3 p-2 hover:bg-zinc-900 hover:text-zinc-50 disabled:text-black disabled:bg-white transition-all rounded-md text-sm disabled:cursor-not-allowed focus:outline-none focus:ring-0 h-fit focus:ring-black"
            >
              {"<"} Previous
            </button>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="px-3 p-2 hover:bg-zinc-900 hover:text-zinc-50 disabled:text-black disabled:bg-white transition-all rounded-md text-sm disabled:cursor-not-allowed focus:outline-none focus:ring-0 h-fit focus:ring-black"
            >
              Next {">"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default DataTable;
