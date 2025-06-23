import React from "react";

type StatCardProps = {
  icon: string;
  percentage: string;
  title: string;
  description: string;
};

const StatCard: React.FC<StatCardProps> = ({
  icon,
  percentage,
  title,
  description,
}) => {
  return (
    <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 text-center text-white transition-all duration-300 hover:border-1 hover:border-sky-400 hover:shadow-md hover:shadow-sky-800 hover:scale-105">
      <div className="text-4xl mb-4">{icon}</div>
      <p className="text-yellow-400 text-2xl font-bold mb-1">{percentage}</p>
      <h3 className="font-semibold text-lg mb-1">{title}</h3>
      <p className="text-sm text-gray-200">{description}</p>
    </div>
  );
};

export default StatCard;

// bg - white / 5;
