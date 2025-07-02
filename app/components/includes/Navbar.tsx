"use client";

import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed z-50 top-6 md:left-1/2 lg:left-1/2 transform lg:-translate-x-1/2 md:-translate-x-1/2 px-4 py-2 rounded-4xl lg:bg-white/5 md:bg-white/5 bg-clip-padding backdrop-filter lg:backdrop-blur-sm md:backdrop-blur-sm bg-opacity-0 lg:border md:border border-neutral-500 max-w-4xl">
      <nav className="flex items-center justify-between">
        <ul className="hidden md:flex items-center gap-10 text-neutral-400 text-base">
          <li className="border-b-2 border-emerald-300">Home</li>
          <li>About</li>
          <li>Work</li>
          <li>Blog</li>
          <li>More</li>
          <button className="px-4 py-1.5 rounded-4xl bg-white/5 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-0 border-2 border-neutral-700 text-white hover:bg-white/10 transition">
            Book a call
          </button>
        </ul>

        <div className="md:hidden fixed right-4">
          {menuOpen ? (
            <X
              className="text-white cursor-pointer"
              size={28}
              onClick={() => setMenuOpen(false)}
            />
          ) : (
            <Menu
              className="text-white cursor-pointer"
              size={28}
              onClick={() => setMenuOpen(true)}
            />
          )}
        </div>
      </nav>

      {menuOpen && (
        <div className="mt-4 md:hidden fixed right-4 flex flex-col items-center gap-6 text-neutral-300 text-base transition-all duration-300 bg-white/5 px-6 py-6 rounded-md backdrop-blur-xl">
          <li className="list-none border-b-2 border-emerald-300">Home</li>
          <li className="list-none">About</li>
          <li className="list-none">Work</li>
          <li className="list-none">Blog</li>
          <li className="list-none">More</li>
          <button className="px-4 py-1.5 rounded-4xl bg-white/5 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-0 border-2 border-neutral-700 text-white hover:bg-white/10 transition">
            Book a call
          </button>
        </div>
      )}
    </header>
  );
}
