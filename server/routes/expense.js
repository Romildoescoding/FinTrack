import express from "express";
import Expense from "../models/Expense.js";
import authenticateToken from "../middleware/auth.js";

const router = express.Router();

router.post("/", authenticateToken, async (req, res) => {
  const expense = await Expense.create({ ...req.body, user: req.user.id });
  res.json(expense);
});

router.get("/", authenticateToken, async (req, res) => {
  const { category, startDate, endDate, page = 1 } = req.query;
  const query = { user: req.user.id };
  if (category) query.category = category;
  if (startDate && endDate) query.date = { $gte: startDate, $lte: endDate };

  const expenses = await Expense.find(query)
    .limit(10)
    .skip((page - 1) * 10);
  res.json(expenses);
});

router.delete("/:id", authenticateToken, async (req, res) => {
  await Expense.findByIdAndDelete(req.params.id);
  res.json({ message: "Expense deleted" });
});

export default router;
