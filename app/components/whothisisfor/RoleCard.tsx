
import React from 'react';

type RoleCardProps = {
  emoji: string;
  title: string;
  features: string[];
};

const RoleCard: React.FC<RoleCardProps> = ({ emoji, title, features }) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-md text-center space-y-4">
      <div className="text-5xl">{emoji}</div>
      <h3 className="text-xl font-semibold">{title}</h3>
      <ul className="text-left space-y-2 text-gray-700">
        {features.map((item, idx) => (
          <li key={idx} className="flex items-start">
            <span className="text-green-500 mr-2">✓</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RoleCard;
