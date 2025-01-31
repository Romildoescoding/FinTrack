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
  //Loading state to display the loader in the Signin button
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password },
        { withCredentials: true }
      );
      setIsLoading(false);
      //After signing in, we go to the dashboard.
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-zinc-100">
      <Card className="w-[80vw] max-w-[400px] bg-zinc-50 py-6 rounded-md text-zinc-900 shadow-md">
        <CardHeader className="flex flex-col items-center">
          <img src="../logo.avif" alt="fintrack_logo" className=" h-10 w-10" />
          <CardTitle className="text-center text-lg font-bold">
            Sign in to FinTrack
          </CardTitle>
          <p className="text-center text-sm text-zinc-500">
            Welcome Back! Sign in to continue
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
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
