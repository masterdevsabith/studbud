"use client";

import React from "react";
import Image from "next/image";

const SeeItInAction = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-r from-white to-blue-50">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div className="w-full aspect-video rounded-2xl overflow-hidden shadow-lg border border-gray-200">
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/WZ8g6deOyAk?si=pyacVqEajwsh1rMK"
            title="English Lesson Video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

        {/* Right: Text + Icons */}
        <div>
          <h2 className="text-3xl font-bold flex items-center gap-2 mb-4">
            <span>🎥</span>
            See It In Action
          </h2>
          <p className="text-gray-600 mb-6">
            Watch how students, teachers, and administrators use our platform to
            streamline their daily workflows and improve learning outcomes.
          </p>
          <ul className="space-y-3 mb-6 text-gray-700">
            <li className="flex items-center gap-2">
              <span>✨</span>
              <span>Intuitive dashboard design</span>
            </li>
            <li className="flex items-center gap-2">
              <span>🚀</span>
              <span>Lightning-fast performance</span>
            </li>
            <li className="flex items-center gap-2">
              <span>🔄</span>
              <span>Real-time synchronization</span>
            </li>
            <li className="flex items-center gap-2">
              <span>📱</span>
              <span>Mobile-first responsive design</span>
            </li>
          </ul>
          <button className="bg-gradient-to-r from-sky-500 to-sky-600 text-white py-2 px-6 rounded-full font-semibold hover:scale-105 transition-transform">
            🎮 Try Live Demo
          </button>
        </div>
      </div>
    </section>
  );
};

export default SeeItInAction;
