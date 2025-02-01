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
import backendUrl from "@/services/backendUrl";

const categories = [
  "Food",
  "Transport",
  "Shopping",
  "Entertainment",
  "Health",
  "Other",
];

function AddExpense() {
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!amount || !date || !category || !description) {
      toast({
        title: "Missing Fields",
        description: "Please fill in all fields before submitting.",
      });
      return;
    }

    setIsLoading(true);
    try {
      const res = await axios.post(
        `${backendUrl}/api/expenses`,
        {
          category,
          amount,
          date: date ? format(date, "yyyy-MM-dd") : null,
          description,
        },
        { withCredentials: true }
      );

      if (res.status >= 200 && res.status < 300) {
        toast({
          title: "Expense Addition Successful.",
          description: "Your expense has been added.",
        });

        handleCancel();
      } else {
        toast({
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with adding the expense.",
        });
      }
    } catch (error) {
      toast({
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with adding the expense.",
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
    <div className="flex flex-col h-fit p-4 px-2 md:p-8 items-center">
      <h1 className="text-3xl w-[350px] sm:w-[800px] font-bold mb-4">
        Add Expense
      </h1>
      <div className="w-[350px] sm:w-[800px]">
        <form
          onSubmit={handleSubmit}
          className="space-y-4 w-[350px] sm:w-[600px] shadow-xl p-8"
        >
          <div className="flex justify-between items-center">
            <label htmlFor="amount" className="font-semibold">
              Amount
            </label>
            <Input
              type="number"
              id="amount"
              className="max-w-[190px] sm:max-w-[350px]"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          <div className="flex justify-between items-center">
            <label className="font-semibold">Date</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-[190px] sm:w-[350px] justify-start text-left font-normal",
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

          <div className="flex justify-between items-center">
            <label htmlFor="category" className="font-semibold">
              Category
            </label>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-[190px] sm:w-[350px] justify-between font-normal"
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
                    onValueChange={setCategory}
                  />
                  <CommandList className=" p-1">
                    {categories.map((item) => (
                      <CommandItem
                        key={item}
                        className="cursor-pointer"
                        onSelect={() => {
                          setCategory(item);
                          setOpen(false);
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

          <div className="flex justify-between items-center">
            <label htmlFor="description" className="font-semibold">
              Description
            </label>
            <Input
              type="text"
              id="description"
              className="max-w-[190px] sm:max-w-[350px]"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="w-full h-fit flex gap-2 justify-end">
            <Button
              className="bg-zinc-100 text-zinc-900 hover:bg-zinc-200 px-8"
              type="button"
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button type="submit" className="px-8" disabled={isLoading}>
              Add{" "}
              {isLoading && <Spinner isWhite={true} height={12} width={12} />}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddExpense;
