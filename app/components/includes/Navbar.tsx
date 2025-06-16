"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full flex items-center justify-between px-10 py-4 fixed">
      <div className="text-lg font-bold text-gray-800">LOGO.</div>

      <div className="hidden md:flex space-x-8 text-gray-700 font-medium">
        <Link href="#">Home</Link>
        <Link href="#">About</Link>
        <Link href="#">Membership</Link>
        <Link href="#">Donate</Link>
      </div>

      <div className="flex items-center space-x-4">
        <Link
          href="#"
          className="text-sm font-medium text-gray-700 hover:underline"
        >
          <button className="text-[1rem]">Sign Up</button>
        </Link>
        <Link href="#">
          <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-10 py-2 rounded-md shadow-sm transition cursor-pointer">
            Login
          </button>
        </Link>
      </div>
    </nav>
  );
}
