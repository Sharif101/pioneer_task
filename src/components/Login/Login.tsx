"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Checkbox } from "../ui/checkbox";
import loginPic from "../../asstes/image.png";
import Image from "next/image";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Basic validation
    if (!email || !password) {
      toast.error("Please fill in all fields.");
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch(`${API_URL}/api/auth/login/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Invalid credentials!");
        setIsLoading(false);
        return;
      }

      toast.success("Login successful!");
      console.log({ data });
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex">
      {/* Left Side - Image */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#E2ECF8] items-center justify-center relative">
        <Image
          src={loginPic}
          alt="Registration illustration"
          fill
          className="object-contain"
          priority
        />
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 bg-white flex items-center justify-center p-8">
        <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-gray-900">
              Log in to your account
            </h1>
            <p className="text-gray-600">
              Start managing your tasks efficiently
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-700 font-medium">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-gray-300 rounded-sm"
            />
          </div>

          <div className="space-y-2 relative">
            <Label htmlFor="password" className="text-gray-700 font-medium">
              Password
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border-gray-300 rounded-sm pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="remember"
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(checked as boolean)}
              />
              <Label
                htmlFor="remember"
                className="text-gray-600 font-normal cursor-pointer"
              >
                Remember me
              </Label>
            </div>
            <Link
              href="#"
              className="text-blue-600 hover:underline text-sm font-medium"
            >
              Forgot your password?
            </Link>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg h-10"
          >
            {isLoading ? "Logging in..." : "Log in"}
          </Button>

          <p className="text-center text-gray-600 text-sm">
            Don{"'"}t have an account?{" "}
            <Link
              href="/registerform"
              className="text-blue-600 hover:underline font-medium"
            >
              Register now
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
