"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full flex items-center justify-between px-10 py-4 fixed bg-white/50 backdrop-blur-2xl z-50">
      <div className="text-lg font-bold text-gray-800">LOGO.</div>

      <div className="hidden md:flex space-x-8 text-gray-700 font-medium">
        <Link href="#" className="text-sky-500">
          Home
        </Link>
        <Link href="#" className="hover:text-sky-500">
          About
        </Link>
        <Link href="#" className="hover:text-sky-500">
          Membership
        </Link>
        <Link href="#" className="hover:text-sky-500">
          Donate
        </Link>
      </div>

      <div className="flex items-center space-x-4">
        {/* <Link
          href="#"
          className="text-sm font-medium text-gray-700 hover:underline"
        >
          <button className="text-[1rem]">Sign Up</button>
        </Link> */}
        <Link href="/add-school">
          <button className="bg-sky-500 hover:bg-sky-600 text-white font-semibold px-10 py-2 rounded-md shadow-sm transition cursor-pointer">
            Add your school
          </button>
        </Link>
      </div>
    </nav>
  );
}
