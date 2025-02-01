import React, { useState, useEffect } from "react";
import { Input } from "../ui/input";
import { Ellipsis, Pen, Trash2 } from "lucide-react";
import TableRow from "./TableRow";

export function DataTable({ data, pagination = true, filters = true }) {
  const [expenses, setExpenses] = useState(data);
  const [filteredData, setFilteredData] = useState(data);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [search, setSearch] = useState("");

  // Update filteredData whenever expenses, search, or pagination changes
  useEffect(() => {
    setExpenses(data); // Ensure expenses updates when data changes
  }, [data]);

  useEffect(() => {
    let updatedData = [...expenses];

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
  }, [expenses, search, currentPage, rowsPerPage]);

  // Handle deleting an expense
  const handleDeleteExpense = (id) => {
    setExpenses((prev) => prev.filter((expense) => expense._id !== id));
  };

  const totalPages = Math.ceil(expenses.length / rowsPerPage);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="bg-white shadow-lg border-t-[1px] border-zinc-100 rounded-lg p-6">
      {/* Search Filter */}
      <h1 className="text-2xl font-bold">All Expenses</h1>
      {filters && (
        <div className="flex items-center space-x-2 gap-8 py-4">
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
      <div className="rounded-md shadow-sm border bg-gray-50">
        <table className="min-w-full table-auto">
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
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((entry, index) => (
                <TableRow
                  key={index}
                  entry={entry}
                  onDelete={handleDeleteExpense}
                />
              ))
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
        <div className="flex items-center justify-between py-4">
          <div className="text-sm text-gray-500">
            Showing{" "}
            <span className="font-bold">
              {(currentPage - 1) * rowsPerPage + 1}
            </span>{" "}
            to{" "}
            <span className="font-bold">
              {Math.min(currentPage * rowsPerPage, expenses.length)}
            </span>{" "}
            of <span className="font-bold">{expenses.length}</span> entries
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
