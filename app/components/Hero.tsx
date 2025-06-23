"use client";

import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="flex items-center justify-center bg-[#0D0D0D] h-dvh px-8">
      <div className="flex items-center justify-between gap-20">
        <div className="">
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight pb-4">
            Find the right <span className="text-sky-500">course</span>
            <br />
            for you
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl">
            Get personalized learning recommendations based on your goals,
            experience level, and learning style. Start your journey today!
          </p>
          <div className="flex space-x-6 pt-4">
            <button className="bg-sky-500 hover:bg-sky-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition">
              Try demo
            </button>
            <button className="text-gray-200 font-medium hover:bg-white hover:text-black transition-all duration-300 border-1 rounded-md p-2">
              View our blog
            </button>
          </div>
        </div>
        <div className="hidden lg:block md:block">
          <Image
            src="/assets/Exams-bro.png"
            alt="Hero Illustration"
            width={500}
            height={500}
            className="max-w-full h-auto"
            priority
          />
        </div>
      </div>
    </section>
  );
}
