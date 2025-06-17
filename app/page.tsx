"use client";

import Hero from "./components/Hero";
import Navbar from "./components/includes/Navbar";
import {BentoGridDemo} from "./components/ui/bento"
export default function HomePage() {
  return (
    <main>
      <Navbar />
      <Hero />
      <BentoGridDemo/>
    </main>
  );
}
