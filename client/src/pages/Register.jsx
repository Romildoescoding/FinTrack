import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Spinner from "@/components/custom/Spinner";
import backendUrl from "@/services/backendUrl";

function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrors({});

    const newErrors = {};

    if (!firstName.trim()) newErrors.firstName = "First Name is required";
    if (!lastName.trim()) newErrors.lastName = "Last Name is required";

    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Confirm Password is required";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setIsLoading(true);
      await axios.post(
        `${backendUrl}/api/auth/register`,
        {
          firstName,
          lastName,
          email,
          password,
        },
        { withCredentials: true }
      );
      setIsLoading(false);
      navigate("/dashboard");
    } catch (error) {
      setIsLoading(false);

      if (error.response && error.response.data.errors) {
        setErrors(error.response.data.errors);
      } else {
        console.error("Registration failed", error);
      }
    }
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-zinc-100">
      <Card className="w-[80vw] max-w-[400px] bg-zinc-50 py-6 rounded-md text-zinc-900 shadow-md">
        <CardHeader className="flex flex-col items-center">
          <img src="../logo.avif" alt="fintrack_logo" className=" h-10 w-10" />
          <CardTitle className="text-center text-lg font-bold">
            Register to FinTrack
          </CardTitle>

          <p className="text-center text-sm text-zinc-500">
            Hey there! Register to get started
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRegister} className="space-y-4">
            <Input
              type="text"
              placeholder="First Name"
              onChange={(e) => setFirstName(e.target.value)}
              className={errors.firstName ? "border-red-500" : ""}
            />
            {errors.firstName && (
              <p className="text-red-500 text-xs">{errors.firstName}</p>
            )}

            <Input
              type="text"
              placeholder="Last Name"
              onChange={(e) => setLastName(e.target.value)}
              className={errors.lastName ? "border-red-500" : ""}
            />
            {errors.lastName && (
              <p className="text-red-500 text-xs">{errors.lastName}</p>
            )}

            <Input
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              className={errors.email ? "border-red-500" : ""}
            />
            {errors.email && (
              <p className="text-red-500 text-xs">{errors.email}</p>
            )}

            <Input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              className={errors.password ? "border-red-500" : ""}
            />
            {errors.password && (
              <p className="text-red-500 text-xs">{errors.password}</p>
            )}

            <Input
              type="password"
              placeholder="Confirm Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={errors.confirmPassword ? "border-red-500" : ""}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs">{errors.confirmPassword}</p>
            )}

            <Button type="submit" className="w-full">
              Register {isLoading && <Spinner isWhite={true} />}
            </Button>
          </form>
          <div className="text-center text-xs text-zinc-500 mt-4">
            Already have an account?{" "}
            <Link to="/login" className="font-medium text-blue-600">
              Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Register;
