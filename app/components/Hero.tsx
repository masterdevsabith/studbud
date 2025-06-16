'use client';

import Image from 'next/image';

export default function HeroSection() {
  return (
    <section className="flex flex-col-reverse md:flex-row items-center justify-between px-8 py-20 bg-white">
      <div className="md:w-1/2 space-y-6">
        <h1 className="text-4xl md:text-5xl font-extrabold text-black leading-tight">
          Find the right course<br />for you
        </h1>
        <p className="text-gray-600 text-lg">
          Get personalized learning recommendations based on your goals, experience level, and learning style.<br />
          Start your journey today!
        </p>
        <div className="flex space-x-6 pt-4">
          <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition">
            Get our course
          </button>
          <button className="text-gray-800 font-medium hover:underline">
            View our blog
          </button>
        </div>
      </div>
      <div className="md:w-1/2 mb-10 md:mb-0 flex justify-center">
        <Image
          src="/assets/Allura Online Study.png"
          alt="Hero Illustration"
          width={500}
          height={500}
          className="max-w-full h-auto"
          priority
        />
      </div>
    </section>
  );
}
