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
  });

  return (
    <section className="min-h-dvh flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Login
        </h1>
        <form className="space-y-4" onChange={handleChange}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Name
            </label>
            <div className="flex items-center border rounded-xl px-3 py-2 focus-within:ring-2 ring-sky-500">
              <User className="w-5 h-5 text-gray-400 mr-2" />
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your name"
                className="w-full bg-transparent outline-none"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="flex items-center border rounded-xl px-3 py-2 focus-within:ring-2 ring-sky-500">
              <Lock className="w-5 h-5 text-gray-400 mr-2" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                className="w-full bg-transparent outline-none"
              />
            </div>
          </div>
          <button
            type="submit"
            onClick={handleLogin}
            className="w-full bg-sky-500 hover:bg-sky-600 text-white py-3 rounded-xl font-semibold transition-all duration-300"
          >
            Login
          </button>
          <p className="text-center">
            Already have an accounts{" "}
            <Link href="/auth/sigup" className="text-sky-500">
              signup
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
}
