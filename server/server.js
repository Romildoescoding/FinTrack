import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.js";
import expenseRoutes from "./routes/expense.js";

dotenv.config();
const app = express();

app.use(
  cors({
    credentials: true,
    origin: "https://fin-track-theta-sandy.vercel.app",
  })
);
app.use(express.json());
app.use(cookieParser());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("DB Connected ✅"));

app.use("/api/auth", authRoutes);
app.use("/api/expenses", expenseRoutes);

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);
