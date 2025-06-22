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
    <div className="bg-gradient-to-t from-sky-400 to-sky-500 hover:from-sky-500 hover:to-sky-600  backdrop-blur-md rounded-2xl p-6 text-center text-white transition-transform transform hover:scale-105 hover:shadow-xl duration-300">
      <div className="text-4xl mb-4">{icon}</div>
      <p className="text-yellow-400 text-2xl font-bold mb-1">{percentage}</p>
      <h3 className="font-semibold text-lg mb-1">{title}</h3>
      <p className="text-sm text-gray-200">{description}</p>
    </div>
  );
};

export default StatCard;

// bg - white / 5;
