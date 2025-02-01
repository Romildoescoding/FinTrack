import express from "express";
import Expense from "../models/Expense.js";
import authenticateToken from "../middleware/auth.js";

const router = express.Router();

router.post("/", authenticateToken, async (req, res) => {
  const expense = await Expense.create({ ...req.body, user: req.user.id });
  res.status(200).json(expense);
});

// Fetch all expenses using pagination
router.get("/", authenticateToken, async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const parsedPage = parseInt(page, 10) || 1;
  const parsedLimit = parseInt(limit, 10) || 10;

  // Filter expenses by logged-in user only
  const query = { user: req.user.id };

  try {
    // Get total count of expenses for pagination
    const totalCount = await Expense.countDocuments(query);

    // Fetch expenses with pagination
    const expenses = await Expense.find(query)
      .select("amount category date description")
      .limit(parsedLimit)
      .skip((parsedPage - 1) * parsedLimit)
      .sort({ date: -1 });

    res.json({
      expenses,
      totalCount, // Send the total number of expenses to the frontend
    });
  } catch (error) {
    console.error("Error fetching expenses:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/expense/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const query = { _id: id };
    console.log(query);

    const expense = await Expense.findOne(query).select(
      "amount category date description"
    );

    console.log(expense);

    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    res.status(200).json(expense);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
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

router.get("/insights", authenticateToken, async (req, res) => {
  try {
    const { last, page = 1 } = req.query;
    const query = { user: req.user.id };
    console.log("Query is---> ", query);

    const endDate = new Date();
    let startDate = null;

    if (last) {
      const daysAgo = parseInt(last, 10);
      startDate = new Date();
      startDate.setDate(endDate.getDate() - daysAgo);
    }

    if (startDate) {
      query.date = { $gte: startDate, $lte: endDate };
    }

    const expenses = await Expense.find(query).select(
      "amount category date description"
    );

    // Calculate total expenses
    const totalExpenses = expenses.reduce(
      (sum, item) => sum + Number(item.amount),
      0
    );

    // Calculate top spending category
    const categoryMap = {};
    expenses.forEach((item) => {
      categoryMap[item.category] =
        (categoryMap[item.category] || 0) + Number(item.amount);
    });

    const topSpend = Object.entries(categoryMap).reduce(
      (max, curr) => (curr[1] > max[1] ? curr : max),
      ["N/A", 0]
    )[0];

    // **Fix: Define lastMonthStart and lastMonthEnd**
    const lastMonthStart = new Date();
    lastMonthStart.setMonth(lastMonthStart.getMonth() - 1);
    lastMonthStart.setDate(1); // Set to the first day of last month

    const lastMonthEnd = new Date();
    lastMonthEnd.setMonth(lastMonthEnd.getMonth() - 1);
    lastMonthEnd.setDate(
      new Date(
        lastMonthEnd.getFullYear(),
        lastMonthEnd.getMonth() + 1,
        0
      ).getDate()
    ); // Set to the last day of last month

    // Fetch last month's total expenses
    const lastMonthExpenses = await Expense.find({
      user: req.user._id,
      date: { $gte: lastMonthStart, $lte: lastMonthEnd },
    });

    const lastMonthTotal = lastMonthExpenses.reduce(
      (sum, item) => sum + Number(item.amount),
      0
    );

    // Calculate growth rate
    const growthRate =
      lastMonthTotal > 0
        ? (((totalExpenses - lastMonthTotal) / lastMonthTotal) * 100).toFixed(2)
        : "N/A";

    res.json({ expenses, totalExpenses, topSpend, growthRate });
  } catch (error) {
    console.error("Error fetching insights:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
