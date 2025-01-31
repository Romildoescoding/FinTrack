import { Ellipsis, Pen, Trash2 } from "lucide-react";
import Modal from "./Modal";
import { formatDate } from "date-fns";
import { useState } from "react";
import axios from "axios";

const TableRow = ({ entry }) => {
  const [showOptions, setShowOptions] = useState(false);

  async function handleDelete(e) {
    e.preventDefault();

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this expense?"
    );
    if (!confirmDelete) return;

    try {
      const response = await axios.delete(
        `http://localhost:5000/api/expenses/${entry._id}`,
        {
          // headers: {
          //   Authorization: `Bearer ${token}`,
          // },
          withCredentials: true, // Ensures cookies (if any) are sent
        }
      );

      if (response.ok) {
        alert("Expense deleted successfully");
        window.location.reload(); // Refresh the page or update state in the parent component
      } else {
        alert("Failed to delete expense");
      }
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  }

  async function handleEdit(e) {
    e.preventDefault();

    const newAmount = prompt("Enter the new amount:", entry.amount);
    if (!newAmount) return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/expenses/${entry._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ amount: parseFloat(newAmount) }),
        }
      );

      if (response.ok) {
        alert("Expense updated successfully");
        window.location.reload(); // Refresh the page or update state
      } else {
        alert("Failed to update expense");
      }
    } catch (error) {
      console.error("Error updating expense:", error);
    }
  }

  return (
    <tr className="border-t relative overflow-visible font-normal">
      {/* Mapping the data fields to rows */}
      <td className="px-6 py-4 text-sm text-gray-700">
        <span>{entry.category}</span>
      </td>
      <td className="px-6 py-4 text-sm text-gray-700">
        {/* Format the amount as currency */}
        <span>{`$${entry.amount.toFixed(2)}`}</span>
      </td>
      <td className="px-6 py-4 text-sm text-gray-700">
        {/* Format the date */}
        <span>{formatDate(entry.date, "MMM dd, yyyy")}</span>
      </td>
      <td className="px-6 py-4 text-sm text-gray-700">
        <span>
          {entry.description.length > 50
            ? entry.description.slice(0, 50) + "..."
            : entry.description}
        </span>
      </td>

      {showOptions && (
        <Modal className="top-12 right-36" setShowModal={setShowOptions}>
          <span className="absolute flex flex-col gap-1 top-[75%] z-[9999] left-[90%] rounded-lg h-fit w-fit p-2 bg-zinc-50 shadow-md shadow-[#ccc] ">
            <span
              className="flex gap-2 cursor-pointer items-center pointer w-full rounded-md h-fit p-2 hover:bg-zinc-200"
              onClick={handleEdit}
            >
              <Pen size={15} color="#18181b" /> Edit
            </span>
            <span
              onClick={handleDelete}
              className="flex items-center cursor-pointer gap-2 pointer w-full rounded-md h-fit p-2 hover:bg-zinc-200"
            >
              <Trash2 size={15} color="#18181b" /> Delete
            </span>
          </span>
        </Modal>
      )}

      {/* Options button */}
      <button
        className="absolute hover:bg-zinc-200 p-1 rounded-sm h-fit flex items-center right-4 top-1/2 -translate-y-1/2 focus:ring-black"
        onClick={() => setShowOptions(true)}
      >
        <Ellipsis size={20} />
      </button>
    </tr>
  );
};

export default TableRow;
