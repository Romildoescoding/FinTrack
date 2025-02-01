import express from "express";
import Expense from "../models/Expense.js";
import authenticateToken from "../middleware/auth.js";
import { format } from "date-fns";

const router = express.Router();

const categories = [
  "Food",
  "Transport",
  "Shopping",
  "Entertainment",
  "Bills",
  "Groceries",
  "Health",
  "Education",
  "Travel",
  "Other",
];

function getRandomDate(start, end) {
  return format(
    new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime())
    ),
    "yyyy-MM-dd"
  );
}

function generateRandomExpenses(count = 50) {
  const expenses = [];
  const startDate = new Date("2024-06-30"); // Adjusted from June 31 to June 30
  const endDate = new Date("2025-01-31");

  for (let i = 0; i < count; i++) {
    expenses.push({
      category: categories[Math.floor(Math.random() * categories.length)],
      amount: Math.floor(Math.random() * 9000) + 1000,
      date: getRandomDate(startDate, endDate),
      description: `Random expense #${i + 1}`,
    });
  }
  return expenses;
}

//Generate sample datasets
// router.post("/", authenticateToken, async (req, res) => {
//   console.log(req.body);

//   const expenses = generateRandomExpenses(55);
//   for (let expense of expenses) {
//     const expense1 = await Expense.create({ ...expense, user: req.user.id });
//     // const expense = await Expense.create({ ...req.body, user: req.user.id });
//   }
//   res.json({ status: "true", data: { ...expenses[0], user: req.user.id } });
// });

router.post("/", authenticateToken, async (req, res) => {
  const expense = await Expense.create({ ...req.body, user: req.user.id });
  res.json(expense);
});

router.get("/", authenticateToken, async (req, res) => {
  const { last, page = 1 } = req.query;

  // Using req.user to filter expenses by logged-in user
  const query = { user: req.user.id };

  // Calculate the date range based on the "last" parameter (7, 30, or 90 days)
  let startDate = null;
  if (last) {
    const daysAgo = parseInt(last, 10);
    startDate = new Date();
    startDate.setDate(startDate.getDate() - daysAgo); // Calculate start date based on the "last" parameter
  }

  if (startDate) {
    query.date = { $gte: startDate };
  }

  // Mongoose projection to fetch only the required fields (amount, category, date)
  const expenses = await Expense.find(query)
    .select("amount category date description") // Select only these fields
    .limit(10)
    .skip((page - 1) * 10);

  res.json(expenses);
});

router.delete("/:id", authenticateToken, async (req, res) => {
  await Expense.findByIdAndDelete(req.params.id);
  res.status(200).json({ status: "success", message: "Expense deleted" });
});

router.patch("/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const updatedExpense = await Expense.findByIdAndUpdate(
      id,
      { $set: req.body }, // Update only the provided fields
      { new: true } // Return the updated document
    );

    if (!updatedExpense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    res.json(updatedExpense);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
