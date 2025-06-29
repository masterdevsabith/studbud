"use client";

import { User, Lock, Mail, BookOpen } from "lucide-react";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    classname: "",
  });

  const [subdomain, setSubdomain] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const hostname = window.location.hostname;
      const parts = hostname.split(".");
      if (hostname.includes("localhost")) {
        // optionally get subdomain from pathname for localhost dev
        const localParts = window.location.pathname.split("/");
        const maybeSub = localParts.includes("s")
          ? localParts[localParts.indexOf("s") + 1]
          : null;
        setSubdomain(maybeSub || null);
      } else if (parts.length >= 3) {
        setSubdomain(parts[0]); // subdomain.domain.com
      }
    }
  }, []);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignup = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${
          process.env.APP_BASE_URL ||
          "https://studbud-backend-server.onrender.com"
        }/api/v1/user/createUser`,
        formData
      );

      if (subdomain) {
        router.push(`/s/${subdomain}/auth/login`);
      } else {
        router.push(`/auth/login`);
      }
    } catch (error) {
      console.error("Signup failed", error);
    }
  };

  return (
    <section className="min-h-dvh bg-white flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-2xl border border-gray-100">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Create Account ✨
        </h1>
        <form onSubmit={handleSignup} className="space-y-6">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <div className="flex items-center border rounded-xl px-3 py-3 bg-gray-50 focus-within:ring-2 ring-sky-500">
              <User className="w-5 h-5 text-gray-400 mr-3" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                className="w-full bg-transparent outline-none text-gray-800"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <div className="flex items-center border rounded-xl px-3 py-3 bg-gray-50 focus-within:ring-2 ring-sky-500">
              <Mail className="w-5 h-5 text-gray-400 mr-3" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email address"
                className="w-full bg-transparent outline-none text-gray-800"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="flex items-center border rounded-xl px-3 py-3 bg-gray-50 focus-within:ring-2 ring-sky-500">
              <Lock className="w-5 h-5 text-gray-400 mr-3" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a password"
                className="w-full bg-transparent outline-none text-gray-800"
              />
            </div>
          </div>

          {/* Class */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Class (Number)
            </label>
            <div className="flex items-center border rounded-xl px-3 py-3 bg-gray-50 focus-within:ring-2 ring-sky-500">
              <BookOpen className="w-5 h-5 text-gray-400 mr-3" />
              <input
                type="number"
                name="classname"
                value={formData.classname}
                onChange={handleChange}
                placeholder="Eg: 10"
                className="w-full bg-transparent outline-none text-gray-800"
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-sky-500 hover:bg-sky-600 text-white py-3 rounded-xl font-semibold transition-all duration-300 shadow-md"
          >
            Sign Up
          </button>

          {/* Login link */}
          <p className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              href={subdomain ? `/s/${subdomain}/auth/login` : "/auth/login"}
              className="text-sky-500 font-medium hover:underline"
            >
              Login here
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
}
