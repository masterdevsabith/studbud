"use client";

import Image from "next/image";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const baseUrl =
  process.env.APP_BASE_URL || "https://studbud-backend-server.onrender.com";

export default function RegisterSchool() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subdomain: "",
    phonenumber: "",
    designation: "",
    capacity: "",
  });
  const router = useRouter();
  const handleChange = (e: any) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${
          process.env.APP_BASE_URL ||
          "https://studbud-backend-server.onrender.com"
        }/api/v1/create/newSubdomain`,
        formData
      );
      if (response.status === 200) {
        router.push(`/add-school/join/${response.data[0]?.subdomain}`);
        console.log("Redirecting........");
      }
      console.log(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <section className="min-h-screen w-full flex flex-col md:flex-row">
      <div className="md:w-1/2 w-full flex items-center justify-center p-8 md:p-20">
        <div className="max-w-md w-full space-y-6">
          <div>
            <h1 className="text-4xl font-bold text-gray-800">
              Add Your School
            </h1>
            <p className="text-gray-600 mt-2">
              Join our platform and connect your school with the future of
              education.
            </p>
          </div>

          <form className="space-y-4" onChange={handleChange}>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter Your Full Name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
            />
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter Your Email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
            />

            <div className="flex items-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus-within:ring-2 focus-within:ring-sky-400">
              <span className="text-gray-500 mr-2">+91</span>
              <input
                type="tel"
                name="phonenumber"
                value={formData.phonenumber}
                onChange={handleChange}
                placeholder="Phone number"
                className="w-full outline-none"
              />
            </div>
            <input
              type="text"
              name="subdomain"
              value={formData.subdomain}
              onChange={handleChange}
              placeholder="Subdomain"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
            />

            <select
              name="designation"
              value={formData.designation}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
            >
              <option value="">What describes you?</option>
              <option>Teacher</option>
              <option>Manager</option>
              <option>Principal</option>
              <option>Management</option>
              <option>Others</option>
            </select>

            <select
              name="capacity"
              value={formData.capacity}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
            >
              <option value="">Student Strength</option>
              <option value="500 - 1000">500 - 1000</option>
              <option value="1000 - 1500">1000 - 1500</option>
              <option value="1500 - 2000">1500 - 2000</option>
              <option value="2000+">2000+</option>
            </select>

            <button
              type="submit"
              onClick={handleSubmit}
              className="w-full bg-sky-500 hover:bg-sky-600 text-white font-semibold py-2 rounded-lg shadow-lg transition duration-300"
            >
              Add School
            </button>
          </form>
        </div>
      </div>

      {/* Right Image Section */}
      <div className="md:w-1/2 w-full h-64 md:h-auto relative">
        <Image
          src="/assets/add-school-bg.jpg"
          alt="School illustration"
          fill
          className="object-cover"
        />
      </div>
    </section>
  );
}
