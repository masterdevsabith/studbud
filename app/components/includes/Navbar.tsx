'use client';

import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="w-full flex items-center justify-between px-8 py-4 bg-white shadow-sm">
      <div className="text-lg font-bold text-gray-800">LOGO.</div>

      <div className="hidden md:flex space-x-8 text-gray-700 font-medium">
        <Link href="#">Nav1</Link>
        <Link href="#">Nav2</Link>
        <Link href="#">Nav3</Link>
        <Link href="#">Nav4</Link>
      </div>

      <div className="flex items-center space-x-4">
        <Link href="#" className="text-sm font-medium text-gray-700 hover:underline">Sign Up</Link>
        <Link href="#">
          <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-4 py-2 rounded-md shadow-sm transition">
            Login
          </button>
        </Link>
      </div>
    </nav>
  );
}
