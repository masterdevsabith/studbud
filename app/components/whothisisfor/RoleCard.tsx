import React from "react";

type RoleCardProps = {
  emoji: string;
  title: string;
  features: string[];
};

const RoleCard: React.FC<RoleCardProps> = ({ emoji, title, features }) => {
  return (
    <div
      className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl p-6 shadow-lg text-center space-y-4 flex flex-col items-center hover:border-1 hover:border-sky-400 transition-all duration-400 hover:shadow-md hover:shadow-sky-800
  "
    >
      <div className="p-2 bg-white rounded-full w-25 h-25 flex items-center justify-center">
        <div className="text-5xl">{emoji}</div>
      </div>
      <h3 className="text-xl font-black text-white">{title}</h3>
      <ul className="text-left space-y-2 text-white">
        {features.map((item, idx) => (
          <li key={idx} className="flex items-start">
            <span className="mr-2">✓</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RoleCard;
