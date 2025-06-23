"use client";

import RoleCard from "./RoleCard";

const WhoThisIsFor = () => {
  const roles = [
    {
      emoji: "🎓",
      title: "Students",
      features: [
        "Never miss a homework deadline again",
        "Connect with classmates instantly",
        "Study smarter with AI-powered flashcards",
      ],
    },
    {
      emoji: "👩‍🏫",
      title: "Teachers",
      features: [
        "Streamline assignment distribution",
        "Track student progress effortlessly",
        "Communicate with parents seamlessly",
      ],
    },
    {
      emoji: "👨‍💼",
      title: "Principals",
      features: [
        "Centralized school management",
        "Real-time performance analytics",
        "Efficient communication channels",
      ],
    },
  ];

  return (
    <section className="text-center py-16 bg-gradient-to-b from-[#0D0D0D] to-gray-900">
      <h2 className="text-3xl font-bold mb-2 text-white">👩‍🏫 Who This Is For</h2>
      <p className="text-gray-200 mb-12">
        Designed for every member of the school community
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
        {roles.map((role, index) => (
          <RoleCard
            key={index}
            emoji={role.emoji}
            title={role.title}
            features={role.features}
          />
        ))}
      </div>
    </section>
  );
};

export default WhoThisIsFor;
