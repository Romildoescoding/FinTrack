"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, ChevronDown } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandInput,
  CommandList,
  CommandItem,
} from "@/components/ui/command";
import Spinner from "@/components/custom/Spinner";
import { useToast } from "@/hooks/use-toast";
import { useNavigate, useParams } from "react-router-dom";

const categories = [
  "Food",
  "Transport",
  "Shopping",
  "Entertainment",
  "Health",
  "Other",
];

function EditExpense() {
  const { id } = useParams(); // Capture the id from the route
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the existing expense data based on the `id` from the URL
    async function fetchExpense() {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/expenses/expense/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            withCredentials: true,
          }
        );
        const data = response.data;
        setCategory(data.category || "");
        setAmount(data.amount || "");
        setDescription(data.description || "");
        setDate(data.date ? new Date(data.date) : null);
      } catch (error) {
        toast({
          title: "Error fetching data",
          description: "Failed to load expense details.",
        });
      }
    }

    fetchExpense();
  }, [id, toast]);

  async function handleEdit(e) {
    e.preventDefault();
    if (!amount || !date || !category || !description) {
      toast({
        title: "Missing Fields",
        description: "Please fill in all fields.",
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.patch(
        `http://localhost:5000/api/expenses/${id}`,
        {
          amount: parseFloat(amount),
          category,
          description,
          date: format(date, "yyyy-MM-dd"),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        navigate("/dashboard");
        toast({
          title: "Expense Updated Successfully",
          description: "Your expense has been updated.",
        });
      }
    } catch (error) {
      console.error("Error updating expense:", error);
      toast({
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with updating the expense.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  const handleCancel = () => {
    navigate("/dashboard");
  };

  return (
    <div className="flex flex-col h-fit p-4 px-2 md:p-8 items-center">
      <h1 className="text-3xl w-[350px] sm:w-[800px] font-bold mb-4">
        Edit Expense
      </h1>
      <div className="w-[350px] sm:w-[800px]">
        <form
          onSubmit={handleEdit}
          className="space-y-4 w-[350px] sm:w-[600px] shadow-xl p-8"
        >
          {/* Amount Input */}
          <div className="flex justify-between items-center">
            <label htmlFor="amount" className="font-semibold">
              Amount
            </label>
            <Input
              type="number"
              id="amount"
              className="max-w-[350px]"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          {/* Date Picker */}
          <div className="flex justify-between items-center">
            <label className="font-semibold">Date</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-[350px] justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-5 w-5" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Category Dropdown with Search + Custom Input */}
          <div className="flex justify-between items-center">
            <label htmlFor="category" className="font-semibold">
              Category
            </label>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-[350px] justify-between font-normal"
                >
                  {category || "Select or enter category"}
                  <ChevronDown className="h-5 w-5" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[350px] p-0">
                <Command>
                  <CommandInput
                    placeholder="Search or enter category..."
                    value={category}
                    onValueChange={setCategory} // Ensures input is properly controlled
                  />
                  <CommandList className=" p-1">
                    {categories.map((item) => (
                      <CommandItem
                        key={item}
                        className="cursor-pointer"
                        onSelect={() => {
                          setCategory(item);
                          setOpen(false); // Closes the dropdown after selection
                        }}
                      >
                        {item}
                      </CommandItem>
                    ))}
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          {/* Description Input */}
          <div className="flex justify-between items-center">
            <label htmlFor="description" className="font-semibold">
              Description
            </label>
            <Input
              type="text"
              id="description"
              className="max-w-[350px]"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Submit & Cancel Buttons */}
          <div className="w-full h-fit flex gap-2 justify-end">
            <Button
              className="bg-zinc-100 text-zinc-900 hover:bg-zinc-200 px-8"
              type="button"
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button type="submit" className="px-8" disabled={isLoading}>
              {isLoading ? (
                <Spinner isWhite={true} height={12} width={12} />
              ) : (
                "Update"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditExpense;
