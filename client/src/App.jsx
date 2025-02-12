import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AddExpense from "./pages/AddExpense";
import AppLayout from "./AppLayout";
import { Toaster } from "./components/ui/toaster";
import EditExpense from "./pages/EditExpense";

function App() {
  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Layout */}
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add-expense" element={<AddExpense />} />
          <Route path="/edit-expense/:id" element={<EditExpense />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
