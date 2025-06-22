import React from "react";

type RoleCardProps = {
  emoji: string;
  title: string;
  features: string[];
};

const RoleCard: React.FC<RoleCardProps> = ({ emoji, title, features }) => {
  return (
    <div className="bg-gradient-to-l from-sky-400 to-sky-500 hover:from-sky-500 hover:to-sky-600 rounded-2xl p-6 shadow-md text-center space-y-4">
      <div className="text-5xl">{emoji}</div>
      <h3 className="text-xl font-black text-white">{title}</h3>
      <ul className="text-left space-y-2 text-gray-700">
        {features.map((item, idx) => (
          <li key={idx} className="flex items-start text-white">
            <span className="text-white mr-2">✓</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RoleCard;
