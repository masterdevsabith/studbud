"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react"; // optional for icon toggle

type FaqItemProps = {
  question: string;
  answer: string;
};

const FaqItem: React.FC<FaqItemProps> = ({ question, answer }) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="bg-white rounded-xl shadow-md px-6 py-4 transition-all duration-300 cursor-pointer border border-gray-200"
      onClick={() => setOpen(!open)}
    >
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-gray-800">{question}</h3>
        {open ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </div>
      <div
        className={`grid transition-all duration-300 overflow-hidden ${
          open
            ? "grid-rows-[1fr] opacity-100 mt-3"
            : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <p className="text-gray-600 text-sm leading-relaxed overflow-hidden">
          {answer}
        </p>
      </div>
    </div>
  );
};

export default FaqItem;
