// app/components/WhySchoolsChooseUs.tsx
"use client";

import StatCard from "./StatCard";

const WhySchoolsChooseUs = () => {
  const stats = [
    {
      icon: "📈",
      percentage: "30%",
      title: "Faster Assignment Turn-ins",
      description:
        "Students submit homework quicker with our streamlined system",
    },
    {
      icon: "📢",
      percentage: "100%",
      title: "Centralized Communication",
      description: "All school communications in one unified platform",
    },
    {
      icon: "🧠",
      percentage: "45%",
      title: "Boosted Study Performance",
      description: "Smart flashcards and study tools improve learning outcomes",
    },
    {
      icon: "💼",
      percentage: "85%",
      title: "Admin Peace of Mind",
      description: "Principals love our comprehensive dashboard and analytics",
    },
  ];

  return (
    <section className="bg-gradient-to-b from-[#0D0D0D] to-gray-900 py-20 px-4">
      <div className="max-w-6xl mx-auto text-center text-white mb-12">
        <h2 className="text-3xl font-bold flex items-center justify-center gap-2 mb-2 text-white">
          🎯 Why Schools Choose Us
        </h2>
        <p className="text-gray-200">
          Real results that matter to students, teachers, and administrators
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {stats.map((stat, index) => (
          <StatCard
            key={index}
            icon={stat.icon}
            percentage={stat.percentage}
            title={stat.title}
            description={stat.description}
          />
        ))}
      </div>
    </section>
  );
};

export default WhySchoolsChooseUs;
