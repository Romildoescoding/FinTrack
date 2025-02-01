import { Ellipsis, Pen, Trash2, X } from "lucide-react";
import Modal from "./Modal";
import { formatDate } from "date-fns";
import { useState } from "react";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const TableRow = ({ entry, onDelete }) => {
  const [showOptions, setShowOptions] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();

  async function handleDelete(e) {
    e.preventDefault();

    try {
      const res = await axios.delete(
        `http://localhost:5000/api/expenses/${entry._id}`,
        {
          withCredentials: true,
        }
      );

      // Axios stores the response status in `res.status`
      setShowOptions("");
      if (res.status >= 200 && res.status < 300) {
        onDelete(entry._id);
        toast({
          title: "Deletion Successful.",
          description: "Your expense has been deleted.",
        });
      } else {
        toast({
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with deleting the expense.",
        });
      }
    } catch (error) {
      console.error("Error deleting expense:", error);

      toast({
        title: "Error",
        description: "Failed to delete the expense. Please try again later.",
      });
    }
  }

  return (
    <tr className="border-t relative overflow-visible font-normal">
      {/* Mapping the data fields to rows */}
      <td className="px-3 text-sm text-gray-700">
        <span>{entry.category}</span>
      </td>
      <td className="px-3 text-sm text-gray-700">
        {/* Format the amount as currency */}
        <span>{`$${entry.amount.toFixed(2)}`}</span>
      </td>
      <td className="px-3 text-sm text-gray-700">
        {/* Format the date */}
        <span>{formatDate(entry.date, "MMM dd, yyyy")}</span>
      </td>
      <td className="px-3 text-sm text-gray-700">
        <span>
          {entry.description.length > 50
            ? entry.description.slice(0, 50) + "..."
            : entry.description}
        </span>
      </td>

      {/* Modal for options selection */}
      {showOptions === "options" && (
        <Modal
          className="top-12 right-36 absolute"
          setShowModal={setShowOptions}
        >
          <span className="absolute flex flex-col gap-1 top-[75%] z-[9999] left-[90%] rounded-lg h-fit w-fit p-2 bg-zinc-50 shadow-md shadow-[#ccc] ">
            <span
              className="flex gap-2 cursor-pointer items-center pointer w-full rounded-md h-fit p-2 hover:bg-zinc-200"
              onClick={() => navigate(`/edit-expense/${entry._id}`)}
            >
              <Pen size={15} color="#18181b" /> Edit
            </span>
            <span
              onClick={() => setShowOptions("delete")}
              className="flex items-center cursor-pointer gap-2 pointer w-full rounded-md h-fit p-2 hover:bg-zinc-200"
            >
              <Trash2 size={15} color="#18181b" /> Delete
            </span>
          </span>
        </Modal>
      )}

      {showOptions === "delete" && (
        <Modal
          maskBg={true}
          className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 fixed"
          setShowModal={setShowOptions}
        >
          <div className="h-fit w-fit bg-white relative p-8 rounded-lg shadow-md">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Delete Expense?</h2>
              <button
                onClick={() => setShowOptions(false)}
                className="p-2 rounded-md hover:bg-zinc-200"
              >
                <X size={18} />
              </button>
            </div>

            {/* Subtitle */}
            <p className="text-md text-gray-600 mt-2 w-96">
              Are you sure you want to delete this expense permanently? This
              action cannot be undone.
            </p>

            {/* Bottom Actions */}
            <div className="flex justify-end gap-3 mt-5">
              <button
                className="px-4 py-2 text-gray-700 border-2 border-gray-200 rounded-md hover:bg-gray-200"
                onClick={() => setShowOptions(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 flex items-center gap-1"
                onClick={handleDelete}
              >
                <Trash2 size={16} /> Delete
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Options button */}
      <button
        className="absolute hover:bg-zinc-200 p-1 rounded-sm h-fit flex items-center right-4 top-1/2 -translate-y-1/2 focus:ring-black"
        onClick={() => setShowOptions("options")}
      >
        <Ellipsis size={20} />
      </button>
    </tr>
  );
};

export default TableRow;
