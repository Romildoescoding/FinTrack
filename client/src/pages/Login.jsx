import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Spinner from "@/components/custom/Spinner";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Function to validate email format
  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    // Reset errors
    setErrors({});

    let newErrors = {};

    // Form validation for the Login fields...
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!isValidEmail(email)) {
      newErrors.email = "Invalid email format";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setIsLoading(true);
      await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password },
        { withCredentials: true }
      );
      setIsLoading(false);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed", error);
      setIsLoading(false);
      setErrors({ general: "Invalid email or password" });
    }
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-zinc-100">
      <Card className="w-[80vw] max-w-[400px] bg-zinc-50 py-6 rounded-md text-zinc-900 shadow-md">
        <CardHeader className="flex flex-col items-center">
          <img src="../logo.avif" alt="fintrack_logo" className="h-10 w-10" />
          <CardTitle className="text-center text-lg font-bold">
            Sign in to FinTrack
          </CardTitle>
          <p className="text-center text-sm text-zinc-500">
            Welcome Back! Sign in to continue
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            {errors.general && (
              <p className="text-red-500 text-xs text-center">
                {errors.general}
              </p>
            )}
            <div>
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={errors.email ? "border-red-500" : ""}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>
            <div>
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={errors.password ? "border-red-500" : ""}
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>

            <Button type="submit" className="w-full">
              Login {isLoading && <Spinner isWhite={true} />}
            </Button>
          </form>
          <div className="text-center text-xs text-zinc-500 mt-4 flex gap-1 justify-center">
            {"Don't have an account?"}
            <Link to="/register" className="font-medium text-blue-600">
              Register
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
