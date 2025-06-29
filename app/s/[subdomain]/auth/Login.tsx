"use client";

import { User, Lock } from "lucide-react";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";

type jwtPayload = {
  exp?: number;
  [key: string]: any;
};

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (e: any) => {
    e.preventDefault();
    const { data } = await axios.post(
      `${
        process.env.APP_BASE_URL ||
        "https://studbud-backend-server.onrender.com"
      }/api/v1/user/loginUser`,
      formData
    );

    const token = data.token;
    localStorage.setItem("token", token);
    if (token) {
      router.push("/dashboard");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const { exp } = jwtDecode<jwtPayload>(token);
        if (exp && Date.now() / 1000 < exp) {
          router.push("/dashboard");
        }
      } catch (e) {
        console.log(e);
      }
    }
  }, []);

  return (
    <section className="min-h-dvh bg-white flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-2xl border border-gray-100">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Welcome Back 👋
        </h1>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <div className="flex items-center border rounded-xl px-3 py-3 focus-within:ring-2 ring-sky-500 bg-gray-50 transition-all">
              <User className="w-5 h-5 text-gray-400 mr-3" />
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full bg-transparent outline-none text-gray-800"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="flex items-center border rounded-xl px-3 py-3 focus-within:ring-2 ring-sky-500 bg-gray-50 transition-all">
              <Lock className="w-5 h-5 text-gray-400 mr-3" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full bg-transparent outline-none text-gray-800"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-sky-500 hover:bg-sky-600 text-white py-3 rounded-xl font-semibold transition-all duration-300 shadow-sm"
          >
            Login
          </button>
          <p className="text-center text-sm text-gray-600">
            Don’t have an account?{" "}
            <Link
              href="/auth/sigup"
              className="text-sky-500 font-medium hover:underline"
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
}
