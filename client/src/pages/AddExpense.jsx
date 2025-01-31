"use client";

import { useState } from "react";
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
// import { useNavigate } from "react-router-dom";

const categories = ["Food", "Transport", "Shopping", "Entertainment", "Other"];

function AddExpense() {
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // const navigate = useNavigate();

  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // **Frontend Validation**
    if (!amount || !date || !category || !description) {
      toast({
        title: "Missing Fields",
        description: "Please fill in all fields before submitting.",
      });
      return;
    }

    setIsLoading(true);
    try {
      await axios.post(
        "http://localhost:5000/api/expenses",
        {
          category,
          amount,
          date: date ? format(date, "yyyy-MM-dd") : null, // Format for backend
          description,
        },
        { withCredentials: true }
      );
      // navigate("/dashboard");
    } catch (error) {
      toast({
        title: "Error!!",
        description: "Failed to add expense. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setAmount("");
    setDate(null);
    setCategory("");
    setDescription("");
  };

  return (
    <div className="flex flex-col h-screen p-8">
      <h1 className="text-3xl font-bold mb-4">Add Expense</h1>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 w-[600px] shadow-xl p-8"
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
            Add {isLoading && <Spinner isWhite={true} height={12} width={12} />}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default AddExpense;
